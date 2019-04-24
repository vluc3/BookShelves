import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BookService } from '../../service/book.service';
import { Book } from '../../model/book.model';
import { FileService } from '../../../core/service/file.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})

export class BookFormComponent implements OnInit {

  static photoDirectory: string = "images/books";

  formGroup: FormGroup;
  
  photoURL: string;
  photoUploading = false;
  photoUploaded = false;

  constructor(
    
    private formBuilder: FormBuilder, 
    private router: Router,
    private fileService: FileService,
    private bookService: BookService
  ) {}
              
  ngOnInit() {

    this.initFormGroup();
  }
  
  initFormGroup() {

    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      synopsis: ''
    });
  }
  
  onSave() {

    let book = new Book();
    book.title = this.formGroup.get('title').value;
    book.author = this.formGroup.get('author').value;
    book.synopsis = this.formGroup.get('synopsis').value;

    if (this.photoURL && this.photoURL !== '') {

      book.photoURL = this.photoURL;
    }

    this.bookService.addBook(book);
    this.router.navigate(['/books']);
  }

  onSelectPhoto(event: { target: { files: File[]; }; }) {

    this.uploadPhoto(event.target.files[0]);
  }  

  private uploadPhoto(photo: File) {

    this.photoUploading = true;

    this.fileService.upload(photo, BookFormComponent.photoDirectory).then(

      (photoURL: string) => {
        
        this.photoURL = photoURL;
        this.photoUploading = false;
        this.photoUploaded = true;
      }
    );
  }  
}

