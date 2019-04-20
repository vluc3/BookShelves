import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Book } from 'src/app/model/Book.model';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

export class DetailComponent implements OnInit {

  book: Book;

  constructor(
    
    private route: ActivatedRoute, 
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit() {

    this.book = new Book();
    const id = this.route.snapshot.params['id'];

    this.bookService.getBook(+id).then(
      (book: Book) => {
        this.book = book;
      }
    );
  }

  onBack() {

    this.router.navigate(['/books']);
  }
}