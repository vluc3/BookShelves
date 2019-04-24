import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { Book } from '../../model/book.model';
import { BookService } from '../../service/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})

export class BookListComponent implements OnInit, OnDestroy {

  books: Book[];
  booksSubscription: Subscription;

  constructor(
    
    private booksService: BookService, 
    private router: Router
  ) {}

  ngOnInit() {

    this.booksSubscription = this.booksService.booksSubject.subscribe(

      (books: Book[]) => {
        this.books = books;
      }
    );

    this.booksService.getBooks();
    this.booksService.emitBooks();
  }

  ngOnDestroy() {

    this.booksSubscription.unsubscribe();
  }

  onAdd() {

    this.router.navigate(['/books', 'add']);
  }

  onView(id: number) {

    this.router.navigate(['/books', 'view', id]);
  }  

  onDelete(book: Book) {

    this.booksService.removeBook(book);
  }
}