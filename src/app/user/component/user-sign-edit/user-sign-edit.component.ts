import { Component } from '@angular/core';
import { Validators } from '@angular/forms';

import { UserSignComponent } from '../user-sign/user-sign.component';

@Component({
  selector: 'app-user-sign-edit',
  templateUrl: './user-sign-edit.component.html',
  styleUrls: ['./user-sign-edit.component.scss']
})

export class UserSignEditComponent extends UserSignComponent {
  
  protected initFormGroup(): void {

    this.formGroup = this.formBuilder.group({

      displayName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      photoURL: ['', []]
    });

    this.setUser();
  }
}