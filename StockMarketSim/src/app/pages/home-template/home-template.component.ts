//authored by J.R. Hauser

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-home-template',
  templateUrl: './home-template.component.html',
  styleUrls: ['./home-template.component.css'],
})
export class HomeTemplateComponent {
  constructor(private auth: AuthService) {}
  //log the user out
  onLogout() {
    //call the auth services sign out method
    this.auth.signOut();
  }
}
