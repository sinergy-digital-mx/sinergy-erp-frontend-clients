import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';
import { CustomerGroupDropdownComponent } from './customer-group-dropdown.component';
import { CustomerGroupFetchService } from '../../services/customer-group-fetch.service';
import { CustomerGroup } from '../../models/customer-group.model';

describe('CustomerGroupDropdownComponent', () => {
  let component: CustomerGroupDropdownComponent;
  let fixture: ComponentFixture<CustomerGroupDropdownComponent>;
  let mockGroupFetchService: { fetchGroups: ReturnType<typeof vi.fn> };

  const mockGroups: CustomerGroup[] = [
    { id: '1', name: 'Enterprise' },
    { id: '2', name: 'SMEs' }
  ];

  beforeEach(async () => {
    mockGroupFetchService = {
      fetchGroups: vi.fn().mockReturnValue(of(mockGroups))
    };

    await TestBed.configureTestingModule({
      imports: [CustomerGroupDropdownComponent],
      providers: [
        { provide: CustomerGroupFetchService, useValue: mockGroupFetchService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerGroupDropdownComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load groups on init', () => {
    component.ngOnInit();
    expect(mockGroupFetchService.fetchGroups).toHaveBeenCalled();
    expect(component.groups).toEqual(mockGroups);
    expect(component.selectConfig.data).toEqual([
      { id: '1', name: 'Enterprise' },
      { id: '2', name: 'SMEs' }
    ]);
  });

  it('should emit group selection', () => {
    component.ngOnInit();
    const emitted: { groupId: string | null; groupName: string | null }[] = [];
    component.groupSelect.subscribe((event) => emitted.push(event));

    component.onGroupChange({ value: '1' });

    expect(emitted[0]).toEqual({ groupId: '1', groupName: 'Enterprise' });
  });

  it('should emit null for empty selection', () => {
    component.ngOnInit();
    const emitted: { groupId: string | null; groupName: string | null }[] = [];
    component.groupSelect.subscribe((event) => emitted.push(event));

    component.onGroupChange({ value: null });

    expect(emitted[0]).toEqual({ groupId: null, groupName: null });
  });

  it('should handle fetch error', () => {
    const error = {
      type: 'network' as const,
      message: 'No se puede conectar',
      retryable: true
    };
    mockGroupFetchService.fetchGroups.mockReturnValue(throwError(() => error));

    component.ngOnInit();

    expect(component.groupsError).toEqual(error);
    expect(component.isLoadingGroups).toBe(false);
  });
});
