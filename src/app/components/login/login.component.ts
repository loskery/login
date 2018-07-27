import { Component, OnInit } from '@angular/core';
import { TaiKhoan } from '../../models/taiKhoan';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'form-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  account = new TaiKhoan();
  topicHasError = true;
  submitted = false;
  errorMsg = '';

  constructor(private _loginService: LoginService, private router: Router) { }
  onSubmit() {
    this.submitted = true;
    this._loginService.checkLogin(this.account)
      .subscribe(
        data => {
          if (data.Success) {
            if (data.Success) {
              this.router.navigate(['admin'])
              this._loginService.setLoggedIn(true)
              console.log('Login Thành Công')
            } else {
              window.alert(data.message)
            }
          }
        })
  }
}
