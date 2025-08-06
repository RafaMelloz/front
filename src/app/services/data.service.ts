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

  public saveMonthlyData(date: Date, data: any): Observable<void> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuário não logado');

    // Formata o ID do documento como "ANO-MES" (ex: "2025-07")
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const docId = `${year}-${month}`;

    const monthDocRef = doc(this.firestore, `users/${user.uid}/monthlyRecords/${docId}`);

    return from(setDoc(monthDocRef, data, { merge: true }));
  }
  
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

  public getMonthlyData(year: number, month: number): Observable<any> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuário não logado');

    const monthStr = month.toString().padStart(2, '0');
    const docId = `${year}-${monthStr}`;

    const monthDocRef = doc(this.firestore, `users/${user.uid}/monthlyRecords/${docId}`);
    return docData(monthDocRef);
  }

  /**
   * Busca o histórico completo de todos os registros mensais, ordenados do mais recente para o mais antigo.
   */
  public getAllMonthlyRecords(): Observable<any[]> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuário não logado');

    const recordsCollection = collection(this.firestore, `users/${user.uid}/monthlyRecords`);
    // Cria uma query para ordenar os documentos pelo seu ID (que é a data "AAAA-MM") em ordem decrescente
    const q = query(recordsCollection, orderBy('__name__', 'desc'));

    return collectionData(q, { idField: 'monthId' }); // idField adiciona o ID do doc (ex: "2025-07") ao objeto
  }

  /**
   * Função para buscar os dados gerais do usuário (os que não mudam mês a mês)
   */
  public getUserProfile(): Observable<any> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuário não logado');

    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    return docData(userDocRef);
  }
}
