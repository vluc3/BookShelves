import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { AuthenticationSignEnum } from '../enum/AuthenticationSignEnum';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  
  signUp(email: string, password: string) {

    return this.sign(AuthenticationSignEnum.Up, email, password);
  }
  
  signIn(email: string, password: string) {

    return this.sign(AuthenticationSignEnum.In, email, password);
  }

  signOut() {
    
    this.sign(AuthenticationSignEnum.Out);
  } 

  private sign(authenticationSign: AuthenticationSignEnum, email?: string, password?: string) {

    let signFunction: Promise<any> = this.getSignMethod(authenticationSign, email, password);
    
    if (authenticationSign == AuthenticationSignEnum.Out) {

      signFunction.then();

    } else {

      return new Promise(
        (resolve, reject) => {
          signFunction.then(
            (data) => {
              resolve();
              console.log("uid: " + data.user.uid + " email: " + data.user.email);
            },
            (error) => {
              reject(error);
            }
          );
        }
      );
    }
  }
  
  private getSignMethod(authenticationSign: AuthenticationSignEnum, email?: string, password?: string): Promise<any> {
    
    switch (authenticationSign) {

      case AuthenticationSignEnum.Up: return firebase.auth().createUserWithEmailAndPassword(email, password);
      case AuthenticationSignEnum.In: return firebase.auth().signInWithEmailAndPassword(email, password);
      case AuthenticationSignEnum.Out: return firebase.auth().signOut();
    }
  }
}
