import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { TaiKhoan } from '../app/taiKhoan';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    ketQua: any;
    _url = 'http://servervienkhcn/qnuadmin/oauth2/token';
    constructor(private _http: HttpClient) { }

    checkLogin(user: TaiKhoan) {
        let httpHeader = new HttpHeaders();
        return this._http.post<any>(this._url, user, { headers: httpHeader })
            .pipe(
                catchError(this.errorHandler),
                tap(res => this.ketQua = res.status)
            )
    }
    errorHandler(error: HttpErrorResponse) {
        return throwError(this.ketQua = error.status || "Server error")

    }
}
