import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

import { AuthenticationService } from '../user/service/authentication.service';
import { User } from '../user/model/User.model';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})

export class NavigatorComponent implements OnInit {

  user: User = new User();

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {

    firebase.auth().onAuthStateChanged(

      (user: firebase.User) => {
        
        this.user.assign(user);
      }
    );
  }

  onSignOut() {

    this.authenticationService.signOut();
  }


}

