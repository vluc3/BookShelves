import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { FileService } from 'src/app/core/service/file.service';

import { AuthenticationService } from '../../service/authentication.service';
import { UserSignTypeEnum } from '../../enum/UserSignTypeEnum';

import { User } from '../../model/User.model';

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

  onSubmit(signType: string) {
    
    let userSignType = UserSignTypeEnum[signType];
    let user: User = this.getUser(userSignType);
    
    this.authenticationService.sign(userSignType, user).then(() => {

      this.router.navigate(['/books']);

    }, (error) => {

      this.errorMessage = error;
    });
  }
  
  /**
   * 
   */

  protected getUser(userSignType: UserSignTypeEnum): User {

    let result: User = new User();

    result.email = this.formGroup.get('email').value;
    result.password = this.formGroup.get('password').value;

    if (userSignType == UserSignTypeEnum.Up) {

      result.displayName = this.formGroup.get('displayName').value;

      if (this.photoURL && this.photoURL !== '') {

        result.photoURL = this.photoURL;
      }
    }

    return result;
  }

  /**
   * 
   */

  protected setUser() {

    let user: User = this.authenticationService.get();

    if (user.isAuthenticated) {

      this.formGroup.controls['displayName'].setValue(user.displayName);  
      this.formGroup.controls['email'].setValue(user.email);  
    }

    this.setPhotoURLChangeEvent();
  }    

  /**
   * 
   */
   
  protected setPhotoURLChangeEvent() {

    let photoURLElement: HTMLElement = document.querySelector('#photoURL');

    photoURLElement.onchange = (event: any) => {

      let photo: File = event.target.files[0];
      this.uploadPhoto(photo);
    }
  }

  /**
   * 
   */
   
  protected uploadPhoto(photo: File) {

    this.fileService.upload(photo, UserSignComponent.photoDirectory).then(

      (photoURL: string) => {

        this.photoURL = photoURL;
      }
    );
  }  
}
