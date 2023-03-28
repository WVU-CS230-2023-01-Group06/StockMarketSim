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

  login() {
    if (this.email == '') {
      alert('please enter email');
    }
    if (this.password == '') {
      alert('please enter password');
    }
    this.auth.login(this.email, this.password);
  }
}
