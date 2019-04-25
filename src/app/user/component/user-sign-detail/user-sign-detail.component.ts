import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-sign-detail',
  templateUrl: './user-sign-detail.component.html',
  styleUrls: ['./user-sign-detail.component.scss']
})

export class UserSignDetailComponent {
  
  @Input()
  formGroup: FormGroup;
}
