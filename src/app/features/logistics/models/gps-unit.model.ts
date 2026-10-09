export interface GpsUnit {
  uid: string;
  name: string;
  imei?: string | null;
  has_position?: boolean;
  latitude?: number | null;
  longitude?: number | null;
  address?: string | null;
  speed?: number | null;
  speed_measure?: string | null;
  heading?: number | null;
  ignition?: string | null;
  engine_status?: string | null;
  odometer?: number | null;
  reported_at?: string | null;
  driver_name?: string | null;
  truck_id?: string | null;
  truck_name?: string | null;
  truck_placa?: string | null;
  active_shipping_id?: string | null;
  active_shipping_status?: string | null;
}

export interface GpsPositionsResponse {
  ok: boolean;
  configured: boolean;
  message?: string | null;
  units: GpsUnit[];
}

export interface GpsCatalogUnit {
  uid: string;
  name: string;
  imei?: string | null;
  has_position?: boolean;
}

export interface GpsCatalogResponse {
  ok: boolean;
  configured: boolean;
  message?: string | null;
  units: GpsCatalogUnit[];
}
