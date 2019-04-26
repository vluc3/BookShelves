import { Component } from '@angular/core';
import { Validators } from '@angular/forms';

import { UserSignComponent } from '../user-sign/user-sign.component';
import { UserSignTypeEnum } from '../../enum/UserSignTypeEnum';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.scss']
})

export class UserSignUpComponent extends UserSignComponent {

  ngOnInit() {

    this.userSignType = UserSignTypeEnum.Up;
    super.ngOnInit();
  }

  /**
   * 
   */

  protected initFormGroup(): void {

    this.formGroup = this.formBuilder.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      displayName: ['', [Validators.required]],
      photoURL: ['', []]
    });
  }
}