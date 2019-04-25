import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

import { Book } from '../model/Book.model';

@Injectable({
  providedIn: 'root'
})

export class BookService implements OnInit {

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();
  
  ngOnInit() {

    this.getBooks();
  }

  getBooks() {

    firebase.database().ref('/books').on('value', (data: DataSnapshot) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      }
    );
  }

  getBook(id: number) {

    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  addBook(book: Book) {

    this.books.push(book);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book) {

    if (book.photoURL) {

      const refFromURL = firebase.storage().refFromURL(book.photoURL);

      refFromURL.delete().then(
        () => {
          console.log('Photo removed:' + book.photoURL);
        },
        (error) => {
          console.log('Could not remove photo: ' + book.photoURL + ': ' + error.message);
        }
      );
    }
    
    let index = this.findBookIndex(book);
    this.books.splice(index, 1);
    this.saveBooks();
    this.emitBooks();
  }
  
  saveBooks() {
    
    firebase.database().ref('/books').set(this.books);
  }  

  emitBooks() {

    this.booksSubject.next(this.books);
  }

  private findBookIndex(book: Book) {

    return this.books.findIndex(

      (element) => {

        if (element === book) {

          return true;
        }
      }
    );
  }
}