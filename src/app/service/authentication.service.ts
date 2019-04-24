import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { AuthenticationSignEnum } from '../enum/AuthenticationSignEnum';
import { User } from '../model/User.model';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  
  signUp(user: User) {

    return this.sign(AuthenticationSignEnum.Up, user);
  }
  
  signIn(user: User) {

    return this.sign(AuthenticationSignEnum.In, user);
  }

  signOut() {
    
    this.sign(AuthenticationSignEnum.Out);
  } 

  private sign(authenticationSign: AuthenticationSignEnum, user?: User) {

    let signMethod: Promise<any> = this.getSignMethod(authenticationSign, user);

    if (authenticationSign == AuthenticationSignEnum.Out) {

      signMethod.then();

    } else {

      return new Promise(
        (resolve, reject) => {
          signMethod.then(
            (data) => {
              resolve();
              
              if (authenticationSign == AuthenticationSignEnum.Up) {

                this.update(user.displayName, user.photoURL, data.user);
              }
            },
            (error) => {
              reject(error);
            }
          );
        }
      );
    }
  }

  private update(displayName: string, photoURL: string, user?: firebase.User) {

    user = (user == undefined) ? user : firebase.auth().currentUser;
    
    if (user != null) {

      user.updateProfile({

        displayName: displayName,
        photoURL: photoURL

      }).then(function() {

        console.log("user updated:", user);

      }).catch(function(error) {

        console.log("user update error:" + error.message);
      });
    }
  }
  
  private getSignMethod(authenticationSign: AuthenticationSignEnum, user: User): Promise<any> {
    
    switch (authenticationSign) {

      case AuthenticationSignEnum.Up: return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
      case AuthenticationSignEnum.In: return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
      case AuthenticationSignEnum.Out: return firebase.auth().signOut();
    }
  }
}
