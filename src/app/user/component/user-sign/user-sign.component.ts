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
  userSignType: UserSignTypeEnum;
  
  photoURL: string;
  errorMessage: string;

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
    this.setUser();
  }

  /**
   * 
   */

  onSubmit() {
    
    let user: User = this.getUser(this.userSignType);
    
    this.authenticationService.sign(this.userSignType, user).then(() => {

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

    if (userSignType == UserSignTypeEnum.Up || userSignType == UserSignTypeEnum.Edit) {

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

    if (this.userSignType == UserSignTypeEnum.Up || this.userSignType == UserSignTypeEnum.Edit) {

      let user: User = this.authenticationService.get();
      
      this.formGroup.controls['email'].setValue(user.email);  
      this.formGroup.controls['displayName'].setValue(user.displayName);
      this.photoURL = user.photoURL;
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
