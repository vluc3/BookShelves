import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})

export class NavigatorComponent implements OnInit {

  isAuthenticated: boolean;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {

    firebase.auth().onAuthStateChanged(
      (user) => {
        this.isAuthenticated = user != null;
      }
    );
  }

  onSignOut() {

    this.authenticationService.signOut();
  }
}

