import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/service/authentication.service';
import { AuthenticationSignEnum } from 'src/app/enum/AuthenticationSignEnum';

@Component({})
export abstract class SignComponent implements OnInit {

  formGroup: FormGroup;
  errorMessage: string;

  constructor(
    protected formBuilder: FormBuilder,
    protected router: Router,
    protected authenticationService: AuthenticationService,
  ) {}

  ngOnInit() {

    this.initFormGroup();
  }

  initFormGroup() {

    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit(authenticationSign: string) {
    
    const email = this.formGroup.get('email').value;
    const password = this.formGroup.get('password').value;
    
    let authenticationSignEnum = AuthenticationSignEnum[authenticationSign];
    let signMethod = this.getSignMethod(authenticationSignEnum, email, password);
    
    signMethod.then(
      () => {
        this.router.navigate(['/books']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
  
  protected getSignMethod(authenticationSign: AuthenticationSignEnum, email?: string, password?: string): Promise<any> {
    
    switch (authenticationSign) {

      case AuthenticationSignEnum.Up: return this.authenticationService.signUp(email, password);
      case AuthenticationSignEnum.In: return this.authenticationService.signIn(email, password);
    }
  }
}
