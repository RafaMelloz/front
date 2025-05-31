import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth, User, authState, signInWithPopup, signOut, GoogleAuthProvider } from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {
    this.user$ = authState(this.auth); // Observable com o estado do usuário
  }

  // Logar com google
  async loginGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider(); // Provedor do Google
    const cred = await signInWithPopup(this.auth, provider); // Faz o login com o popup do Google
    const user = cred.user; // Usuário logado

    // Cria/atualiza o documento do usuário
    const userRef = doc(this.firestore, `users/${user.uid}`);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,

        balance:0, // Saldo do usuário
        maximumSpending: 0, // Gasto máximo do usuário

        fixedIncome:[], // Renda fixa do usuário
        fixedCosts:[], // Gastos fixos do usuário

        windfall: [], // Ganhos inesperados do usuário
        unexpectedCosts: [], // Gastos inesperados do usuário

        createdAt: new Date()
      });
    }

    return user;
  }

  // Logout
  logout(): Promise<void> {
    return signOut(this.auth);
  }
}
