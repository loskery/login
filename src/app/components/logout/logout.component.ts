import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.logOut().subscribe(data => {
      // if (data.success) {
      this.router.navigate([''])
      this.loginService.setLoggedIn(false)
      // } else {
      //   window.alert('Some problem')
      // }
    })
  }
  logOut() {
    return this.http.get('')
  }
}
