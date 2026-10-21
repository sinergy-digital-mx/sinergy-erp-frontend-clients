import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowLeft, Copy } from 'lucide-angular';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import {
  GuideBlock,
  GuideSection,
  WHATSAPP_GUIDE_INTRO,
  WHATSAPP_GUIDE_SECTIONS,
} from './whatsapp-integration-guide.content';

interface InlineSegment {
  kind: 'text' | 'code' | 'bold' | 'link';
  text: string;
  href?: string;
}

const INLINE_PATTERN = /(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*)/g;

/**
 * Guía para usar WhatsApp desde otro proyecto. El contenido se genera desde
 * EXTERNAL_INTEGRATION_GUIDE.md (backend) con `node scripts/generate-whatsapp-guide.js`.
 */
@Component({
  selector: 'app-whatsapp-integration-guide',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './whatsapp-integration-guide.component.html',
})
export class WhatsappIntegrationGuideComponent {
  readonly ArrowLeft = ArrowLeft;
  readonly Copy = Copy;

  readonly intro: GuideBlock[] = WHATSAPP_GUIDE_INTRO;
  readonly sections: GuideSection[] = WHATSAPP_GUIDE_SECTIONS;
  readonly activeId = signal<string>(WHATSAPP_GUIDE_SECTIONS[0].id);

  private readonly inlineCache = new Map<string, InlineSegment[]>();

  constructor(private interceptor: InterceptorService) {}

  get active(): GuideSection {
    return this.sections.find((s) => s.id === this.activeId()) ?? this.sections[0];
  }

  select(id: string): void {
    this.activeId.set(id);
  }

  /** Convierte `código`, **negritas** y [enlaces](url) en segmentos para la plantilla. */
  inline(text: string): InlineSegment[] {
    const cached = this.inlineCache.get(text);
    if (cached) return cached;

    const segments = text
      .split(INLINE_PATTERN)
      .filter((part) => part !== '')
      .map((part): InlineSegment => {
        if (part.startsWith('`')) return { kind: 'code', text: part.slice(1, -1) };
        if (part.startsWith('**')) return { kind: 'bold', text: part.slice(2, -2) };
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (link) return { kind: 'link', text: link[1], href: link[2] };
        return { kind: 'text', text: part };
      });
    this.inlineCache.set(text, segments);
    return segments;
  }

  async copy(code: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(code);
      this.interceptor.openSnackbar({ type: 'success', title: 'Copiado', message: 'Código copiado al portapapeles' });
    } catch {
      this.interceptor.openSnackbar({ type: 'error', title: 'Error', message: 'No se pudo copiar el código' });
    }
  }
}
