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
  submitted = false;
  errorMsg = '';
  constructor(private _loginService: LoginService, private router: Router) { }


  onSubmit(event) {
    this.submitted = true;
    event.preventDefault()
    const target = event.target
    this.account.userName = target.querySelector('#userName').value
    this.account.password = target.querySelector('#password').value
    this.router.navigate(['admin'])
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
