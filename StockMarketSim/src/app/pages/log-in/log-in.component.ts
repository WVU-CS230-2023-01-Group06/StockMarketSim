// Authored by J.R. Hauser
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent {
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService) {}

  //log the user in
  login() {
    //if the email is blank alert the user
    if (this.email == '') {
      alert('please enter email');
    }
    //if the password is blank alert the user
    if (this.password == '') {
      alert('please enter password');
    }
    //use the login method of the auth service
    this.auth.login(this.email, this.password);
  }
}
