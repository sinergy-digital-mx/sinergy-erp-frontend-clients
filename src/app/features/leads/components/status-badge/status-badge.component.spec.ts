import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusBadgeComponent } from './status-badge.component';
import { Lead, CommunicationStatus } from '../../models/lead-group.model';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { vi } from 'vitest';

describe('StatusBadgeComponent', () => {
  let component: StatusBadgeComponent;
  let fixture: ComponentFixture<StatusBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusBadgeComponent, TooltipModule, TagModule],
    }).compileComponents();

    await TestBed.compileComponents();
    fixture = TestBed.createComponent(StatusBadgeComponent);
    component = fixture.componentInstance;
  });

  describe('Status Determination', () => {
    it('should determine NOT_CONTACTED status when email_contacted is false', () => {
      component.lead = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        email_contacted: false,
        first_email_sent_at: null,
        customer_answered: false,
        customer_answered_at: null,
        group_id: null,
      } as Lead;

      component.ngOnInit();

      expect(component.badgeData?.status).toBe(CommunicationStatus.NOT_CONTACTED);
      expect(component.badgeData?.label).toBe('No Contactado');
    });

    it('should determine CONTACTED status when email_contacted is true and customer_answered is false', () => {
      component.lead = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        email_contacted: true,
        first_email_sent_at: '2026-02-10T10:30:00Z',
        customer_answered: false,
        customer_answered_at: null,
        group_id: null,
      } as Lead;

      component.ngOnInit();

      expect(component.badgeData?.status).toBe(CommunicationStatus.CONTACTED);
      expect(component.badgeData?.label).toBe('Contactado');
    });

    it('should determine RESPONDED status when customer_answered is true', () => {
      component.lead = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        email_contacted: true,
        first_email_sent_at: '2026-02-10T10:30:00Z',
        customer_answered: true,
        customer_answered_at: '2026-02-11T14:45:00Z',
        group_id: null,
      } as Lead;

      component.ngOnInit();

      expect(component.badgeData?.status).toBe(CommunicationStatus.RESPONDED);
      expect(component.badgeData?.label).toBe('Respondido');
    });
  });

  describe('Badge Rendering', () => {
    it('should render badge with correct icon for NOT_CONTACTED status', () => {
      component.lead = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        email_contacted: false,
        first_email_sent_at: null,
        customer_answered: false,
        customer_answered_at: null,
        group_id: null,
      } as Lead;

      component.ngOnInit();
      fixture.detectChanges();

      expect(component.badgeData?.icon).toBe('pi-envelope-open');
    });

    it('should render badge with correct icon for CONTACTED status', () => {
      component.lead = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        email_contacted: true,
        first_email_sent_at: '2026-02-10T10:30:00Z',
        customer_answered: false,
        customer_answered_at: null,
        group_id: null,
      } as Lead;

      component.ngOnInit();
      fixture.detectChanges();

      expect(component.badgeData?.icon).toBe('pi-envelope');
    });

    it('should render badge with correct icon for RESPONDED status', () => {
      component.lead = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        email_contacted: true,
        first_email_sent_at: '2026-02-10T10:30:00Z',
        customer_answered: true,
        customer_answered_at: '2026-02-11T14:45:00Z',
        group_id: null,
      } as Lead;

      component.ngOnInit();
      fixture.detectChanges();

      expect(component.badgeData?.icon).toBe('pi-check');
    });

    it('should render badge with correct color for NOT_CONTACTED status', () => {
      component.lead = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        email_contacted: false,
        first_email_sent_at: null,
        customer_answered: false,
        customer_answered_at: null,
        group_id: null,
      } as Lead;

      component.ngOnInit();
      fixture.detectChanges();

      expect(component.badgeData?.color).toBe('#9CA3AF');
    });

    it('should render badge with correct color for CONTACTED status', () => {
      component.lead = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        email_contacted: true,
        first_email_sent_at: '2026-02-10T10:30:00Z',
        customer_answered: false,
        customer_answered_at: null,
        group_id: null,
      } as Lead;

      component.ngOnInit();
      fixture.detectChanges();

      expect(component.badgeData?.color).toBe('#3B82F6');
    });

    it('should render badge with correct color for RESPONDED status', () => {
      component.lead = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        email_contacted: true,
        first_email_sent_at: '2026-02-10T10:30:00Z',
        customer_answered: true,
        customer_answered_at: '2026-02-11T14:45:00Z',
        group_id: null,
      } as Lead;

      component.ngOnInit();
      fixture.detectChanges();

      expect(component.badgeData?.color).toBe('#10B981');
    });
  });

  describe('Tooltip Handling', () => {
    it('should show "Sin contactar" tooltip for NOT_CONTACTED status', () => {
      component.lead = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        email_contacted: false,
        first_email_sent_at: null,
        customer_answered: false,
        customer_answered_at: null,
        group_id: null,
      } as Lead;

      component.ngOnInit();

      expect(component.badgeData?.tooltip).toBe('Sin contactar');
    });

    it('should show formatted date in tooltip for CONTACTED status', () => {
      component.lead = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        email_contacted: true,
        first_email_sent_at: '2026-02-10T10:30:00Z',
        customer_answered: false,
        customer_answered_at: null,
        group_id: null,
      } as Lead;

      component.ngOnInit();

      expect(component.badgeData?.tooltip).toContain('Contactado:');
      expect(component.badgeData?.tooltip).toContain('10/02/2026');
    });

    it('should show formatted date in tooltip for RESPONDED status', () => {
      component.lead = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        email_contacted: true,
        first_email_sent_at: '2026-02-10T10:30:00Z',
        customer_answered: true,
        customer_answered_at: '2026-02-11T14:45:00Z',
        group_id: null,
      } as Lead;

      component.ngOnInit();

      expect(component.badgeData?.tooltip).toContain('Respondido:');
      expect(component.badgeData?.tooltip).toContain('11/02/2026');
    });

    it('should show "Fecha no disponible" when first_email_sent_at is null for CONTACTED status', () => {
      component.lead = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        email_contacted: true,
        first_email_sent_at: null,
        customer_answered: false,
        customer_answered_at: null,
        group_id: null,
      } as Lead;

      component.ngOnInit();

      expect(component.badgeData?.tooltip).toBe('Fecha no disponible');
    });

    it('should show "Fecha no disponible" when customer_answered_at is null for RESPONDED status', () => {
      component.lead = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        email_contacted: true,
        first_email_sent_at: '2026-02-10T10:30:00Z',
        customer_answered: true,
        customer_answered_at: null,
        group_id: null,
      } as Lead;

      component.ngOnInit();

      expect(component.badgeData?.tooltip).toBe('Fecha no disponible');
    });
  });

  describe('Badge Click Handling', () => {
    it('should emit statusFilterChange event when badge is clicked', () => {
      const emitSpy = vi.spyOn(component.statusFilterChange, 'emit');

      component.lead = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        email_contacted: false,
        first_email_sent_at: null,
        customer_answered: false,
        customer_answered_at: null,
        group_id: null,
      } as Lead;

      component.ngOnInit();
      component.onBadgeClick();

      expect(emitSpy).toHaveBeenCalledWith(CommunicationStatus.NOT_CONTACTED);
    });

    it('should emit correct status when CONTACTED badge is clicked', () => {
      const emitSpy = vi.spyOn(component.statusFilterChange, 'emit');

      component.lead = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        email_contacted: true,
        first_email_sent_at: '2026-02-10T10:30:00Z',
        customer_answered: false,
        customer_answered_at: null,
        group_id: null,
      } as Lead;

      component.ngOnInit();
      component.onBadgeClick();

      expect(emitSpy).toHaveBeenCalledWith(CommunicationStatus.CONTACTED);
    });
  });

  describe('Active Filter Styling', () => {
    it('should apply active filter styling when isFilterActive is true', () => {
      component.lead = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        email_contacted: false,
        first_email_sent_at: null,
        customer_answered: false,
        customer_answered_at: null,
        group_id: null,
      } as Lead;

      component.isFilterActive = true;
      component.ngOnInit();
      fixture.detectChanges();

      expect(component.getBorderStyle()).toBe('2px solid');
    });

    it('should not apply active filter styling when isFilterActive is false', () => {
      component.lead = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        email_contacted: false,
        first_email_sent_at: null,
        customer_answered: false,
        customer_answered_at: null,
        group_id: null,
      } as Lead;

      component.isFilterActive = false;
      component.ngOnInit();
      fixture.detectChanges();

      expect(component.getBorderStyle()).toBe('1px solid');
    });
  });

  describe('Date Formatting', () => {
    it('should format date correctly in dd/MM/yyyy HH:mm format', () => {
      component.lead = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        email_contacted: true,
        first_email_sent_at: '2026-02-10T10:30:00Z',
        customer_answered: false,
        customer_answered_at: null,
        group_id: null,
      } as Lead;

      component.ngOnInit();

      // The tooltip should contain the formatted date
      expect(component.badgeData?.tooltip).toMatch(/\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/);
    });
  });
});
