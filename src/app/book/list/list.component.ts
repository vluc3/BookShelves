import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/Book.model';
import { BookService } from 'src/app/service/book.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit, OnDestroy {

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