import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-email-html-preview',
  standalone: true,
  template: `
    <iframe
      #frame
      class="preview-frame"
      title="Vista previa del correo"
      sandbox="allow-same-origin"
    ></iframe>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 0;
        height: 100%;
      }
      .preview-frame {
        display: block;
        width: 100%;
        height: 100%;
        min-height: 420px;
        border: 0;
        border-radius: 12px;
        background: #fff;
        color-scheme: light;
      }
    `,
  ],
})
export class EmailHtmlPreviewComponent implements AfterViewInit {
  @ViewChild('frame') private frame?: ElementRef<HTMLIFrameElement>;

  private html = '';
  private lastWritten = '';

  @Input() set srcdoc(value: string | null | undefined) {
    this.html = value || '';
    this.writePreview();
  }

  ngAfterViewInit(): void {
    this.writePreview();
  }

  private writePreview(): void {
    const iframe = this.frame?.nativeElement;
    const doc = iframe?.contentDocument;
    if (!doc || this.html === this.lastWritten) return;
    doc.open();
    doc.write(this.html || '<p></p>');
    doc.close();
    this.lastWritten = this.html;
  }
}
