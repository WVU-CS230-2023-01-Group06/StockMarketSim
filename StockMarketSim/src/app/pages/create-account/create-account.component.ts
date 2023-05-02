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
  //Create an  acoount for a new user
  createAccount() {
    //if the email is blank alert the user
    if (this.email == '') {
      alert('please enter email');
    }
    //if the password is blank alert the user
    if (this.password == '') {
      alert('please enter password');
    }
    //use the createAccount method of the auth service passing in the given email and password
    this.auth.createAccount(this.email, this.password);
  }
}
