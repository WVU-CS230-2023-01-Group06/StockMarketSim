import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent {
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService) {}

  createAccount() {
    if (this.email == '') {
      alert('please enter email');
    }
    if (this.password == '') {
      alert('please enter password');
    }
    this.auth.createAccount(this.email, this.password);
  }
}
