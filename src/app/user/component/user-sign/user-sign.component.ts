import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { FileService } from 'src/app/core/service/file.service';

import { AuthenticationService } from '../../service/authentication.service';
import { AuthenticationSignEnum } from '../../enum/authenticationSignEnum';

import { User } from '../../model/user.model';

@Component({})
export abstract class UserSignComponent implements OnInit {

  static photoDirectory: string = "images/users";

  formGroup: FormGroup;
  errorMessage: string;

  photoURL: string;

  /**
   * 
   */

  constructor(

    protected formBuilder: FormBuilder,
    protected router: Router,
    protected fileService: FileService,
    protected authenticationService: AuthenticationService

  ) {}

  protected abstract initFormGroup(): void;

  /**
   * 
   */

  ngOnInit() {

    this.initFormGroup();
  }

  /**
   * 
   */

  onSubmit(authenticationSignType: string) {
    
    let authenticationSign = AuthenticationSignEnum[authenticationSignType];
    let user: User = new User();

    user.email = this.formGroup.get('email').value;
    user.password = this.formGroup.get('password').value;

    if (authenticationSign == AuthenticationSignEnum.Up) {

      user.displayName = this.formGroup.get('displayName').value;

      if (this.photoURL && this.photoURL !== '') {

        user.photoURL = this.photoURL;
      }
    }

    let signMethod = this.getSignMethod(authenticationSign, user);
    
    signMethod.then(
      () => {
        this.router.navigate(['/books']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
  
  /**
   * 
   */

  protected getSignMethod(
    
    authenticationSign: AuthenticationSignEnum, 
    user?: User

  ): Promise<any> {
    
    switch (authenticationSign) {

      case AuthenticationSignEnum.Up: {

        return this.authenticationService.signUp(user);

      } case AuthenticationSignEnum.In: {

        return this.authenticationService.signIn(user);
      }
    }
  }
}
