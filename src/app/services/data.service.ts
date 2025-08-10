import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { addDoc, collection, collectionData, doc, docData, Firestore, orderBy, query, setDoc } from '@angular/fire/firestore';
import { combineLatest, from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private auth: Auth,
    private firestore: Firestore,
  ) { }

  public changeBalance(data: any) {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuário não logado');

    const balanceDoc = doc(this.firestore, `users/${user.uid}`);
    return from(setDoc(balanceDoc, {
      balance: data.balance,
    }, { merge: true }));
  }

  public changeFixedIncome(data: any[]) {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuário não logado');

    const userDocRef = doc(this.firestore, `users/${user.uid}`);

    return from(setDoc(userDocRef, {
      fixedIncome: data,
    }, { merge: true }));
  }

  public changeWindfall(data: any[]) {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuário não logado');

    const userDocRef = doc(this.firestore, `users/${user.uid}`);

    return from(setDoc(userDocRef, {
      windfall: data,
    }, { merge: true }));
  }

  public changeMaximumSpending(data: any) {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuário não logado');

    const balanceDoc = doc(this.firestore, `users/${user.uid}`);
    return from(setDoc(balanceDoc, {
      maximumSpending: data.maximumSpending,
    }, { merge: true }));
  }

  public changeFixedCosts(data: any[]) {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuário não logado');

    const userDocRef = doc(this.firestore, `users/${user.uid}`);

    return from(setDoc(userDocRef, {
      fixedCosts: data,
    }, { merge: true }));
  }

  public changeUnexpectedCosts(data: any[]) {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuário não logado');
    const userDocRef = doc(this.firestore, `users/${user.uid}`);

    return from(setDoc(userDocRef, {
      unexpectedCosts: data,
    }, { merge: true }));
  }
  
  public getData(): Observable<any> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuário não logado');

    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    return docData(userDocRef);
  }
}
