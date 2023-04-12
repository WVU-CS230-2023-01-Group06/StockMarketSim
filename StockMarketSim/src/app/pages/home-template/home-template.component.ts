import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signOut } from "firebase/auth";
@Component({
  selector: 'app-home-template',
  templateUrl: './home-template.component.html',
  styleUrls: ['./home-template.component.css']
})
export class HomeTemplateComponent {

  constructor(private router: Router) {};
  onLogout(){
    const auth = getAuth();
  signOut(auth).then(() => {
  this.router.navigate(['/']);
}).catch((error) => {
  console.log("something broke you can't logout");
});
  }
}
