import * as firebase from 'firebase';

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  title = 'Book Shelves';

  constructor() {

    var config = {
      
      apiKey: "AIzaSyAs3ccf0eqHy3TeTt50d5L6X62XNVB3Yes",
      authDomain: "bookshelves-7a5c0.firebaseapp.com",
      databaseURL: "https://bookshelves-7a5c0.firebaseio.com",
      projectId: "bookshelves-7a5c0",
      storageBucket: "bookshelves-7a5c0.appspot.com",
      messagingSenderId: "467682786015"
    };
    
    firebase.initializeApp(config);    
  }
}
