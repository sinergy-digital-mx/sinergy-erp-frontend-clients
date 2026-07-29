import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/** Minimal Google Maps typings used by the address dialog. */
export interface GoogleLatLngLiteral {
  lat: number;
  lng: number;
}

export interface GoogleLatLng {
  lat(): number;
  lng(): number;
}

export interface GoogleMap {
  setCenter(latLng: GoogleLatLngLiteral | GoogleLatLng): void;
  setZoom(zoom: number): void;
  panTo(latLng: GoogleLatLngLiteral | GoogleLatLng): void;
  fitBounds?(bounds: unknown, padding?: number | unknown): void;
}

export interface GoogleMarker {
  setPosition(latLng: GoogleLatLngLiteral | GoogleLatLng): void;
  getPosition(): GoogleLatLng | null | undefined;
  setMap(map: GoogleMap | null): void;
  addListener(eventName: string, handler: () => void): { remove: () => void };
}

export interface GoogleGeocoderResult {
  geometry: { location: GoogleLatLng };
  formatted_address?: string;
}

export interface GoogleGeocoder {
  geocode(
    request: { address?: string; location?: GoogleLatLngLiteral },
    callback: (
      results: GoogleGeocoderResult[] | null,
      status: string
    ) => void
  ): void;
}

export type GoogleMapConstructor = new (
  el: HTMLElement,
  opts: {
    center: GoogleLatLngLiteral;
    zoom: number;
    mapTypeControl?: boolean;
    streetViewControl?: boolean;
    fullscreenControl?: boolean;
    zoomControl?: boolean;
  }
) => GoogleMap;

export type GoogleMarkerConstructor = new (opts: {
  map: GoogleMap;
  position: GoogleLatLngLiteral;
  draggable?: boolean;
  title?: string;
  label?: string | {
    text: string;
    color?: string;
    fontWeight?: string;
    fontSize?: string;
  };
  icon?: unknown;
}) => GoogleMarker;

export type GoogleGeocoderConstructor = new () => GoogleGeocoder;

export interface GoogleMapsModules {
  Map: GoogleMapConstructor;
  Marker: GoogleMarkerConstructor;
  Geocoder: GoogleGeocoderConstructor;
  event: {
    clearInstanceListeners: (instance: object) => void;
    trigger: (instance: object, eventName: string) => void;
  };
}

interface GoogleMapsNamespace {
  Map?: GoogleMapConstructor | object;
  Marker?: GoogleMarkerConstructor | object;
  Geocoder?: GoogleGeocoderConstructor | object;
  event?: GoogleMapsModules['event'];
  importLibrary?: (name: string) => Promise<Record<string, unknown>>;
}

interface GoogleRoot {
  maps: GoogleMapsNamespace;
}

declare global {
  interface Window {
    google?: GoogleRoot;
  }
}

function isConstructor(value: unknown): value is new (...args: never[]) => unknown {
  return typeof value === 'function';
}

@Injectable({ providedIn: 'root' })
export class GoogleMapsLoaderService {
  private scriptPromise: Promise<void> | null = null;
  private modulesPromise: Promise<GoogleMapsModules> | null = null;

  /** Loads the JS API and resolves usable Map / Marker / Geocoder constructors. */
  load(): Promise<GoogleMapsModules> {
    if (this.modulesPromise) {
      return this.modulesPromise;
    }

    this.modulesPromise = this.ensureScript()
      .then(() => this.resolveModules())
      .catch((err) => {
        this.modulesPromise = null;
        throw err;
      });

    return this.modulesPromise;
  }

  private ensureScript(): Promise<void> {
    if (typeof window !== 'undefined' && window.google?.maps) {
      return Promise.resolve();
    }

    if (this.scriptPromise) {
      return this.scriptPromise;
    }

    const key = environment.googleMapsApiKey;
    if (!key) {
      return Promise.reject(new Error('Falta la API key de Google Maps'));
    }

    this.scriptPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>('script[data-google-maps]');
      if (existing) {
        if (window.google?.maps) {
          resolve();
          return;
        }
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', () => {
          this.scriptPromise = null;
          reject(new Error('No se pudo cargar Google Maps'));
        });
        return;
      }

      const script = document.createElement('script');
      // Sin loading=async: Map/Marker/Geocoder quedan listos en onload (classic).
      script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}`;
      script.async = true;
      script.defer = true;
      script.dataset['googleMaps'] = 'true';
      script.onload = () => resolve();
      script.onerror = () => {
        this.scriptPromise = null;
        reject(new Error('No se pudo cargar Google Maps'));
      };
      document.head.appendChild(script);
    });

    return this.scriptPromise;
  }

  private async resolveModules(): Promise<GoogleMapsModules> {
    const maps = window.google?.maps;
    if (!maps) {
      throw new Error('Google Maps no cargó');
    }

    // Prefer importLibrary when Map isn't a real constructor yet (async bootstrap).
    if (!isConstructor(maps.Map) && typeof maps.importLibrary === 'function') {
      const mapsLib = await maps.importLibrary('maps');
      const geocodingLib = await maps.importLibrary('geocoding').catch(() => mapsLib);

      const MapCtor = mapsLib['Map'];
      const MarkerCtor = mapsLib['Marker'] ?? (await maps.importLibrary('marker').catch(() => null))?.['Marker'];
      const GeocoderCtor = geocodingLib['Geocoder'] ?? mapsLib['Geocoder'] ?? maps.Geocoder;

      if (!isConstructor(MapCtor) || !isConstructor(MarkerCtor) || !isConstructor(GeocoderCtor)) {
        throw new Error('Google Maps no expuso Map/Marker/Geocoder');
      }

      return {
        Map: MapCtor as GoogleMapConstructor,
        Marker: MarkerCtor as GoogleMarkerConstructor,
        Geocoder: GeocoderCtor as GoogleGeocoderConstructor,
        event: maps.event!,
      };
    }

    if (!isConstructor(maps.Map) || !isConstructor(maps.Marker) || !isConstructor(maps.Geocoder)) {
      throw new Error('Google Maps no expuso Map/Marker/Geocoder');
    }

    return {
      Map: maps.Map as GoogleMapConstructor,
      Marker: maps.Marker as GoogleMarkerConstructor,
      Geocoder: maps.Geocoder as GoogleGeocoderConstructor,
      event: maps.event!,
    };
  }
}
