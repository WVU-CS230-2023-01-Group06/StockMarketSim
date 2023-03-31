import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

//TODO: ADD USERNAME?
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      () => {
        localStorage.setItem('token', 'true');
        this.router.navigate(['Homepage']);
      },
      (err) => {
        alert("Couldn't log in");
        this.router.navigate(['/']);
      }
    );
  }

  createAccount(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      () => {
        const auth = getAuth();
        const db = getDatabase();
        const user = auth.currentUser;
        if (!user) {
          throw new Error('how the fuck');
        } else {
          let uid = user.uid;
          const userBalanceListRef = ref(db, 'usersBalance/' + uid);
          set(userBalanceListRef, {
            balance: 10000,
          });
        }
        alert('Registered');
        this.router.navigate(['/']);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/CreateAccount']);
      }
    );
  }

  signOut() {
    this.fireauth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
