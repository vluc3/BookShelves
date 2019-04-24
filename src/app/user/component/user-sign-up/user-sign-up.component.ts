import { Component } from '@angular/core';
import { Validators } from '@angular/forms';

import { UserSignComponent } from '../user-sign/user-sign.component';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.scss']
})

export class UserSignUpComponent extends UserSignComponent {

  protected initFormGroup(): void {

    this.formGroup = this.formBuilder.group({

      displayName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      photoURL: ['', []]
    });
  }

  /**
   * 
   */

  onSelectPhoto(event: { target: { files: File[]; }; }) {

    this.uploadPhoto(event.target.files[0]);
  }  

  /**
   * 
   */

  private uploadPhoto(photo: File) {

    this.fileService.upload(photo, UserSignComponent.photoDirectory).then(

      (photoURL: string) => {

        this.photoURL = photoURL;
      }
    );
  }  
}