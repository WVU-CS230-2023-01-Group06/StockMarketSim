// Authored by J.R. Hauser

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //Default balance for new users
  static DEFAULTBALANCE = 10000;

  //Initialize angular fire auth and router
  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  //Login in user takes a string for the email, and string for the password returns nothing
  login(email: string, password: string) {
    //Use the AngularFireAuth class from the constructor
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      () => {
        localStorage.setItem('token', 'true');
        //Navigate to the homepage
        this.router.navigate(['Homepage']);
      },
      (err) => {
        alert("Couldn't log in");
        this.router.navigate(['/']);
      }
    );
  }
  //create an account takes a string for the email, and string for the password returns nothing
  createAccount(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      () => {
        //initialize database and auth from firebase
        const auth = getAuth();
        const db = getDatabase();
        const user = auth.currentUser;
        //Im pretty sure this code will never execute
        if (!user) {
          this.router.navigate(['CreateAccount']);
          throw new Error("sorry there's a problem");
        } else {
          let uid = user.uid;
          //Get reference for userBalance section of the database
          const userBalanceListRef = ref(db, 'usersBalance/' + uid);
          //Set the new user's balance to default
          set(userBalanceListRef, {
            balance: AuthService.DEFAULTBALANCE,
          });
        }
        //alert user and navigate them to login page
        alert('Registered');
        this.router.navigate(['/']);
      },
      (err) => {
        //alert the error message and reload the page
        alert(err.message);
        this.router.navigate(['/CreateAccount']);
      }
    );
  }
  //Sign user out
  signOut() {
    this.fireauth.signOut().then(
      () => {
        localStorage.removeItem('token');
        //navigate to the login page
        this.router.navigate(['']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
