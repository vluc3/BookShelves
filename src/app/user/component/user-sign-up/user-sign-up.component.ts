import { Component } from '@angular/core';

import { UserSignEditComponent } from '../user-sign-edit/user-sign-edit.component';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.scss']
})

export class UserSignUpComponent extends UserSignEditComponent {
}