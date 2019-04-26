import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { UserSignTypeEnum } from '../../enum/UserSignTypeEnum';

@Component({
  selector: 'app-user-sign-detail',
  templateUrl: './user-sign-detail.component.html',
  styleUrls: ['./user-sign-detail.component.scss']
})

export class UserSignDetailComponent implements AfterViewInit {
  
  @Input() formGroup: FormGroup;
  @Input() userSignType: UserSignTypeEnum;
  @Input() photoURL: string;

  @Output() selectPhotoEvent: EventEmitter<File> = new EventEmitter<File>();

  /**
   * 
   */

  ngAfterViewInit(): void {

    this.setPhotoChangeEvent();
  }

  /**
   * 
   */
   
  private setPhotoChangeEvent() {

    let element: HTMLElement = document.querySelector('#photoURL');

    if (element) {

      element.onchange = (event: any) => {

        let photo: File = event.target.files[0];
        this.selectPhotoEvent.emit(photo);
      }
    }
  }
}
