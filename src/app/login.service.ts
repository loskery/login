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
        httpHeader.set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post<any>(this._url, user, { headers: httpHeader })
            .pipe(
                catchError(this.errorHandler),
                tap(res => {
                    res.setHeader('Access-Control-Expose-Headers', 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization');
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, OPTIONS, PUT, PATCH, DELETE');
                    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization');
                    res.setHeader('Access-Control-Allow-Credentials', true);
                    this.ketQua = res.status
                })
            )
    }
    errorHandler(error: HttpErrorResponse) {
        return throwError(this.ketQua = error.status || "Server error")

    }
}
