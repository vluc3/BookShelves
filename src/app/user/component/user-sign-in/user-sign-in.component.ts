import { Component } from '@angular/core';
import { Validators } from '@angular/forms';

import { UserSignComponent } from '../user-sign/user-sign.component';

@Component({
  selector: 'app-user-sign-in',
  templateUrl: './user-sign-in.component.html',
  styleUrls: ['./user-sign-in.component.scss']
})

export class UserSignInComponent extends UserSignComponent {

  protected initFormGroup(): void {

    this.formGroup = this.formBuilder.group({
      
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }
}