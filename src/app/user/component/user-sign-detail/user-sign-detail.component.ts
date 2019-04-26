import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { UserSignTypeEnum } from '../../enum/UserSignTypeEnum';

@Component({
  selector: 'app-user-sign-detail',
  templateUrl: './user-sign-detail.component.html',
  styleUrls: ['./user-sign-detail.component.scss']
})

export class UserSignDetailComponent implements AfterViewInit {
  
  private photo: File;

  @Input() formGroup: FormGroup;
  @Input() userSignType: UserSignTypeEnum;
  @Input() photoURL: string;

  @Output() selectPhotoEvent: EventEmitter<File> = new EventEmitter<File>();

  /**
   * 
   */

  ngAfterViewInit(): void {

    this.setSelectPhotoEvent();
  }

  /**
   * 
   */
   
  private setSelectPhotoEvent() {

    let element: HTMLElement = document.querySelector('#photoURL');

    if (element) {

      element.onchange = (event: any) => {

        this.photo = File = event.target.files[0];
        this.selectPhotoEvent.emit(this.photo);
      }
    }
  }
}
