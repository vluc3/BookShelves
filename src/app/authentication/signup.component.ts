import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SignComponent } from './sign.component';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { FileService } from '../service/file.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent extends SignComponent {

  constructor(

    protected formBuilder: FormBuilder,
    protected router: Router,
    protected authenticationService: AuthenticationService,
    private fileService: FileService) {

      super(formBuilder, router, authenticationService);
  }

  protected initFormGroup(): void {

    this.formGroup = this.formBuilder.group({

      displayName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      photoURL: ['', []]
    });
  }

  onSelectPhoto(event: { target: { files: File[]; }; }) {

    this.uploadPhoto(event.target.files[0]);
  }  

  private uploadPhoto(photo: File) {

    this.fileService.upload(photo, SignComponent.photoDirectory).then(

      (photoURL: string) => {

        this.photoURL = photoURL;
      }
    );
  }  
}