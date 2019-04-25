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
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      photoURL: ['', []]
    });

    let photoURLElement: HTMLElement = document.querySelector('#photoURL');

    photoURLElement.onchange = (event: any) => {

      let photo: File = event.target.files[0];
      this.uploadPhoto(photo);
    }
  }
}