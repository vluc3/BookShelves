import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

import { AuthenticationService } from '../service/authentication.service';
import { User } from '../model/User.model';

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
        
        this.user.assignFirebaseUser(user);
      }
    );
  }

  onSignOut() {

    this.authenticationService.signOut();
  }


}

