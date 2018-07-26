import { Component, OnInit } from '@angular/core';
import { TaiKhoan } from '../taiKhoan';
import { LoginService } from '../login.service';

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

  constructor(private _loginService: LoginService) { }

  validateTopic(value) {
    if (value === 'default') {
      this.topicHasError = true;
    } else {
      this.topicHasError = false;
    }
  }

  onSubmit() {
    this.submitted = true;
    this._loginService.checkLogin(this.account)
      .subscribe(
        response => console.log('Success!', response),
        error => this.errorMsg = error.statusText
      )
  }
}
