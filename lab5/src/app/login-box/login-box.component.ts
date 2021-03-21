import { Component, OnInit } from '@angular/core';
import { AppContentService } from '../app-content.service';
@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.css'],
})
export class LoginBoxComponent implements OnInit {
  constructor(private appContentService: AppContentService) {}

  isLogin = (): boolean => this.appContentService.isLogin;

  ngOnInit(): void {}

  userName: string = '';

  name = (e: any) => {
    this.userName = e.target.value;
  };

  onLogin = () => {
    if (this.userName == '') {
      alert('Please Enter a Username Dumb Dumb');
    } else {
      this.appContentService.isLogin = true;
      this.appContentService.userId = this.userName;
    }
  };
}
