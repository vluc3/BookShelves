import { Component } from '@angular/core';
import { Validators } from '@angular/forms';

import { SignComponent } from './sign.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent extends SignComponent {

  protected initFormGroup(): void {

    this.formGroup = this.formBuilder.group({
      
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }
}