import { Component } from '@angular/core';
import { Validators } from '@angular/forms';

import { UserSignComponent } from '../user-sign/user-sign.component';
import { UserSignTypeEnum } from '../../enum/UserSignTypeEnum';

@Component({
  selector: 'app-user-sign-edit',
  templateUrl: './user-sign-edit.component.html',
  styleUrls: ['./user-sign-edit.component.scss']
})

export class UserSignEditComponent extends UserSignComponent {

  ngOnInit() {

    this.userSignType = UserSignTypeEnum.Edit;
    super.ngOnInit();
  }

  /**
   * 
   */
  
  protected initFormGroup(): void {

    this.formGroup = this.formBuilder.group({

      email: ['', []],
      password: ['', []],
      displayName: ['', [Validators.required]],
      photoURL: ['', []]
    });
  }
}