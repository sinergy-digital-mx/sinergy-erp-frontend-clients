import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api = environment.api;

  user_info: any;
  name_token = 'token'
  token: string;


  public render_menu: boolean = false;

  constructor(private router: Router, public http: HttpClient, public activated_route: ActivatedRoute) {
    this.BuildTokensToInit();
  }


  BuildTokensToInit() {
    if (localStorage.getItem(this.name_token)) {
      this.user_info = jwtDecode(localStorage.getItem(this.name_token) || '{}');
      this.token = localStorage.getItem(this.name_token) || '';
      this.render_menu = true;
    } else {
      localStorage.removeItem(this.name_token);
    }
  }

  logout() {
    this.token = '';
    localStorage.removeItem(this.name_token);
    location.reload();
  }

  login(data: any): Observable<any> {
    return this.http.post(this.api + '/auth/login', data);
  }

  setPassword(data: any): Observable<any> {
    return this.http.post(this.api + '/auth/user/login', data);
  }

}
