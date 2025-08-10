import { Injectable, signal } from '@angular/core';
import { Auth, User, authState, signInWithPopup, signOut, GoogleAuthProvider } from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // signal para estado do usuário
  user = signal<User | null>(null);

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {
    // Recupera do localStorage ao iniciar
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.user.set(JSON.parse(savedUser));
    }

    // Observa alterações do Firebase Auth
    authState(this.auth).subscribe(user => {
      this.user.set(user);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  async loginGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(this.auth, provider);
    const user = cred.user;

    const userRef = doc(this.firestore, `users/${user.uid}`);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        balance: 0,
        maximumSpending: 0,
        fixedIncome: [],
        fixedCosts: [],
        windfall: [],
        unexpectedCosts: [],
        createdAt: new Date()
      });
    }

    return user;
  }

  logout(): Promise<void> {
    localStorage.removeItem('user');
    return signOut(this.auth);
  }
}
