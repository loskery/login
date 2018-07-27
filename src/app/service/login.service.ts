import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { TaiKhoan } from '../models/taiKhoan';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
interface myData {
    success: boolean,
    message: string
}
// interface isLoggedIn {
//     status: boolean
// }

// interface logoutStatus {
//     success: boolean
// }
@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private loggedInStatus = false
    _url = 'http://servervienkhcn/qnuadmin/oauth2/token';
    constructor(private _http: HttpClient) { }
    setLoggedIn(value: boolean) {
        this.loggedInStatus = value
    }

    get isLoggedIn() {
        return this.loggedInStatus
    }
    checkLogin(user: TaiKhoan) {
        console.log(user.userName + "---" + user.password)
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

                })
            )
    }
    errorHandler(error: HttpErrorResponse) {
        return throwError(error.status || "Server error")

    }
}
