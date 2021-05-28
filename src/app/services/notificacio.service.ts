import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificacioService {

  constructor(private snackBar: MatSnackBar) { }

  config : MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }


  success(msg) {
    this.config['panelClass'] = ['notificaion', 'success'];
    this.snackBar.open(msg, '', this.config)
  }

  error(msg) {
    this.config['panelClass'] = ['notificaion', 'error'];
    this.snackBar.open(msg, '', this.config)
  }













}
