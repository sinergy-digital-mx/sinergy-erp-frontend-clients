import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { EmployeePortalService } from '../../services/employee-portal.service';
import {
  Employee,
  LEAVE_TYPE_OPTIONS,
  LeaveRequest,
  LeaveType,
  getLeaveStatusLabel,
  getLeaveTypeLabel,
  getPaymentFrequencyLabel,
} from '../../../employees/models/employee.model';
import { getInclusiveDays } from '../../../employees/utils/mexican-labor.util';

@Component({
  selector: 'app-employee-portal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-portal.component.html',
  styleUrls: ['./employee-portal.component.scss'],
})
export class EmployeePortalComponent implements OnInit {
  readonly leaveTypeOptions = LEAVE_TYPE_OPTIONS;
  readonly getLeaveTypeLabel = getLeaveTypeLabel;
  readonly getLeaveStatusLabel = getLeaveStatusLabel;
  readonly getPaymentFrequencyLabel = getPaymentFrequencyLabel;

  loading = signal(true);
  employee = signal<Employee | null>(null);
  leaveRequests = signal<LeaveRequest[]>([]);
  submittingLeave = signal(false);
  savingProfile = signal(false);

  leaveForm: FormGroup;
  profileForm: FormGroup;

  private leaveFormValue;
  requestedDays = computed(() => {
    const value = this.leaveFormValue();
    return getInclusiveDays(value?.start_date, value?.end_date);
  });
  availableDays = computed(() => this.employee()?.vacation?.available_days ?? 0);
  exceedsAvailable = computed(() => {
    const value = this.leaveFormValue();
    return value?.type === 'vacation' && this.requestedDays() > this.availableDays();
  });

  constructor(
    private fb: FormBuilder,
    private portalService: EmployeePortalService,
    private interceptor: InterceptorService
  ) {
    this.leaveForm = this.fb.group({
      type: ['vacation' as LeaveType, Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      reason: [''],
    });
    this.leaveFormValue = toSignal(this.leaveForm.valueChanges, {
      initialValue: this.leaveForm.value,
    });

    this.profileForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      current_password: [''],
      new_password: [''],
      confirm_password: [''],
    });
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.loading.set(true);
    this.portalService.getMyProfile().subscribe({
      next: (emp) => {
        this.employee.set(emp);
        this.profileForm.patchValue({
          first_name: emp.first_name ?? '',
          last_name: emp.last_name ?? '',
        });
        this.leaveRequests.set(emp.leave_requests ?? []);
        this.loading.set(false);
        if (!emp.leave_requests) {
          this.loadLeaveRequests();
        }
      },
      error: (error) => {
        this.loading.set(false);
        this.interceptor.openSnackbar({
          type: 'error',
          title: 'Error',
          message: error?.message || 'No se pudo cargar tu información',
        });
      },
    });
  }

  private loadLeaveRequests(): void {
    this.portalService.getMyLeaveRequests().subscribe({
      next: (requests) => this.leaveRequests.set(requests),
      error: () => {},
    });
  }

  fullName(emp: Employee): string {
    const name = `${emp.first_name ?? ''} ${emp.last_name ?? ''}`.trim();
    return name || emp.email || 'Empleado';
  }

  initials(emp: Employee): string {
    const first = emp.first_name?.trim().charAt(0) ?? '';
    const last = emp.last_name?.trim().charAt(0) ?? '';
    return `${first}${last}`.toUpperCase() || emp.email?.charAt(0)?.toUpperCase() || '?';
  }

  submitLeave(): void {
    if (this.leaveForm.invalid) {
      this.leaveForm.markAllAsTouched();
      return;
    }
    const value = this.leaveForm.value;
    if (value.start_date > value.end_date) {
      this.interceptor.openSnackbar({
        type: 'warning',
        title: 'Fechas inválidas',
        message: 'La fecha inicial debe ser anterior o igual a la final',
      });
      return;
    }
    if (this.exceedsAvailable()) {
      this.interceptor.openSnackbar({
        type: 'warning',
        title: 'Sin días suficientes',
        message: `Solo tienes ${this.availableDays()} día(s) de vacaciones disponibles`,
      });
      return;
    }

    this.submittingLeave.set(true);
    this.portalService
      .createMyLeaveRequest({
        type: value.type,
        start_date: value.start_date,
        end_date: value.end_date,
        reason: value.reason || undefined,
      })
      .subscribe({
        next: () => {
          this.submittingLeave.set(false);
          this.interceptor.openSnackbar({
            type: 'success',
            title: 'Éxito',
            message: 'Solicitud enviada. Queda pendiente de aprobación.',
          });
          this.leaveForm.reset({ type: 'vacation' });
          this.loadProfile();
        },
        error: (error) => {
          this.submittingLeave.set(false);
          this.interceptor.openSnackbar({
            type: 'error',
            title: 'Error',
            message: error?.message || 'No se pudo enviar la solicitud',
          });
        },
      });
  }

  cancelLeave(request: LeaveRequest): void {
    this.portalService.cancelMyLeaveRequest(request.id).subscribe({
      next: () => {
        this.interceptor.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Solicitud cancelada',
        });
        this.loadProfile();
      },
      error: (error) => {
        this.interceptor.openSnackbar({
          type: 'error',
          title: 'Error',
          message: error?.message || 'No se pudo cancelar',
        });
      },
    });
  }

  saveProfile(): void {
    if (this.profileForm.get('first_name')?.invalid || this.profileForm.get('last_name')?.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const value = this.profileForm.value;
    const wantsPasswordChange = !!value.new_password;

    if (wantsPasswordChange) {
      if (!value.current_password) {
        this.interceptor.openSnackbar({
          type: 'warning',
          title: 'Contraseña actual',
          message: 'Ingresa tu contraseña actual para cambiarla',
        });
        return;
      }
      if (value.new_password !== value.confirm_password) {
        this.interceptor.openSnackbar({
          type: 'error',
          title: 'Error',
          message: 'Las contraseñas nuevas no coinciden',
        });
        return;
      }
    }

    this.savingProfile.set(true);
    this.portalService
      .updateMyProfile({
        first_name: value.first_name,
        last_name: value.last_name,
        current_password: wantsPasswordChange ? value.current_password : undefined,
        new_password: wantsPasswordChange ? value.new_password : undefined,
      })
      .subscribe({
        next: () => {
          this.savingProfile.set(false);
          this.interceptor.openSnackbar({
            type: 'success',
            title: 'Éxito',
            message: 'Datos actualizados correctamente',
          });
          this.profileForm.patchValue({
            current_password: '',
            new_password: '',
            confirm_password: '',
          });
          this.loadProfile();
        },
        error: (error) => {
          this.savingProfile.set(false);
          this.interceptor.openSnackbar({
            type: 'error',
            title: 'Error',
            message: error?.message || 'No se pudieron actualizar los datos',
          });
        },
      });
  }
}
