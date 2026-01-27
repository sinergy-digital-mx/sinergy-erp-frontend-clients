import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_SNACK_BAR_DATA,  MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
    selector: 'app-custom-snackbar',
    templateUrl: './custom-snackbar.component.html',
    styleUrls: ['./custom-snackbar.component.scss'],
    standalone: false
})
export class CustomSnackbarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,public snackBarRef: MatSnackBarRef<CustomSnackbarComponent>) { }

  ngOnInit(): void {
  }

}
