import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { addDoc, collection, collectionData, doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
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
      updatedAt: new Date(),
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
      updatedAt: new Date(),
    }, { merge: true }));
  }
  
  public getData(): Observable<any> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuário não logado');

    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    return docData(userDocRef);
  }

  // public changeFixedIncome(data: any) {
  //   const user = this.auth.currentUser;
  //   if (!user) throw new Error('Usuário não logado');

  //   console.log(data);

  //   const fixedIncomeDoc = collection(this.firestore, `users/${user.uid}/fixedIncome`);

  //   return from(addDoc(fixedIncomeDoc, {
  //     data,
  //   }));
  // }



  // public changeFixedIncome(data: any) {
  //   const user = this.auth.currentUser;
  //   if (!user) throw new Error('Usuário não logado');

  //   console.log(data);
    
  //   const fixedIncomeDoc = collection(this.firestore, `users/${user.uid}/fixedIncome`);

  //   return from(addDoc(fixedIncomeDoc, {
  //     fixedIncome: data,
  //     createdAt: new Date(),
  //   }));
  // }



  // adiciona uma tabela (colecction)
  // public registerBalance(data: any) {
  //   const user = this.auth.currentUser;
  //   if (!user) throw new Error('Usuário não logado');

  //   const balanceDoc = collection(this.firestore, `users/${user.uid}/balance`);

  //   return from(addDoc(balanceDoc, {
  //     balance: data.balance,
  //   }));
  // }

  // adicionar um linha de tabela (doc)
  // public registerBalance(data: any) {
  //   const user = this.auth.currentUser;
  //   if (!user) throw new Error('Usuário não logado');

  //   const balanceDoc = doc(this.firestore, `users/${user.uid}/balance/balanceInfo`);

  //   return from(setDoc(balanceDoc, {
  //     balance: data.balance,
  //     updateAt: new Date()
  //   }));
  // }
}
