import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { Observable, catchError, tap, throwError } from "rxjs";

import { AuthService } from "./auth.service";
import { ToastService } from "./toast.service";
import { ToastType } from "../models/toast.model";
import { AlertDialogComponent } from "../components/alert-dialog/alert-dialog.component";


@Injectable({ providedIn: "root" })
export class InterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private auth_service: AuthService,
    public dialog: MatDialog,
    private toast: ToastService,
    public route: ActivatedRoute
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = window.localStorage.getItem(this.auth_service.name_token);
    console.log()

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`, // si tu API usa Bearer, usa: `Bearer ${token}`
        },
      });
    }

    return next.handle(request).pipe(
      tap((event: any) => {
        if (event?.body?.errormessage === "Token Not Valid") {
          this.auth_service.logout();
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.auth_service.logout();
        }
        // ✅ RxJS 7+
        return throwError(() => error);
      })
    );
  }

  alertDialog(params: AlertDialog) {
    return new Promise((resolve) => {
      this.dialog
        .open(AlertDialogComponent, {
          panelClass: "alert_dialog",
          data: params,
        })
        .afterClosed()
        .subscribe((res: any) => resolve(res));
    });
  }

  openSnackbar(options: Snackbar) {
    const type = this.mapSnackbarType(options.type);
    this.toast.show(options.message, type, {
      title: options.title,
      duration: options.duration,
    });
  }

  private mapSnackbarType(type: string): ToastType {
    if (type === 'success' || type === 'error' || type === 'warning' || type === 'info' || type === 'highlight') {
      return type;
    }
    return 'info';
  }
}

interface Snackbar {
  title: string;
  message: string;
  type: string;
  duration?: number;
  vertical_position?: MatSnackBarVerticalPosition;
  horizontal_position?: MatSnackBarHorizontalPosition;
}

interface AlertDialog {
  message: string;
  type: "success" | "warning" | "message" | "error";
  title?: string;
  text_accept?: string;
  text_cancel?: string;
}
