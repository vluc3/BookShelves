import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Book } from '../../model/book.model';
import { BookService } from '../../service/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})

export class BookDetailComponent implements OnInit {

  book: Book;

  constructor(
    
    private route: ActivatedRoute, 
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit() {

    this.book = new Book();
    let id: number = this.route.snapshot.params['id'];

    this.bookService.getBook(id).then((book: Book) => {

      this.book = book;
    });
  }

  onBack() {

    this.router.navigate(['/books']);
  }
}