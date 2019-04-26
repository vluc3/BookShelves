import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { UserSignTypeEnum } from '../enum/UserSignTypeEnum';
import { User } from '../model/User.model';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  get(): User {

    let result: User = new User();
    result.assign(firebase.auth().currentUser);
    return result;
  }
  
  /**
   * 
   */
  
  signUp(user: User) {

    return this.sign(UserSignTypeEnum.Up, user);
  }
  
  signIn(user: User) {

    return this.sign(UserSignTypeEnum.In, user);
  }

  signOut() {
    
    this.sign(UserSignTypeEnum.Out);
  } 

  /**
   * 
   */

  sign(userSignType: UserSignTypeEnum, user?: User) {

    let signMethod: Promise<any> = this.getSignMethod(userSignType, user);

    if (userSignType == UserSignTypeEnum.Out) {

      signMethod.then();

    } else {

      return new Promise((resolve, reject) => {

          signMethod.then((data) => {

            resolve();
            
            if (userSignType == UserSignTypeEnum.Up) {

              this.update(user.displayName, user.photoURL, data.user);
            }
          }, (error) => {
            
              reject(error);
            }
          );
        }
      );
    }
  }

  /**
   * 
   */

  async update(displayName: string, photoURL: string, user?: firebase.User): Promise<any> {

    user = (user) ? user : firebase.auth().currentUser;
    
    if (user) {

      try {

        await user.updateProfile({

          displayName: displayName,
          photoURL: photoURL
        });

        console.log("user updated:", user);
      }
      catch (error) {

        console.log("user update error:" + error.message);
      }
    }

    return null;
  }

  /**
   * 
   */

  private getSignMethod(userSignType: UserSignTypeEnum, user: User): Promise<any> {
    
    switch (userSignType) {

      case UserSignTypeEnum.In: {
        
        return firebase.auth().signInWithEmailAndPassword(user.email, user.password);

      } case UserSignTypeEnum.Up: {
      
        return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);

      } case UserSignTypeEnum.Edit: {
      
        return this.update(user.displayName, user.photoURL);

      } case UserSignTypeEnum.Out: {
      
        return firebase.auth().signOut();
      }
    }
  }
}
