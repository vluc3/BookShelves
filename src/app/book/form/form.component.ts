import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BookService } from 'src/app/service/book.service';
import { Book } from 'src/app/model/Book.model';
import { FileService } from 'src/app/service/file.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {

  formGroup: FormGroup;
  
  imageUrl: string;
  imageUploading = false;
  imageUploaded = false;

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

  onUploadImage(image: File) {

    this.imageUploading = true;

    this.fileService.upload(image).then(

      (imageUrl: string) => {
        this.imageUrl = imageUrl;
        this.imageUploading = false;
        this.imageUploaded = true;
      }
    );
  }  
  
  onSave() {

    let book = new Book();
    book.title = this.formGroup.get('title').value;
    book.author = this.formGroup.get('author').value;
    book.synopsis = this.formGroup.get('synopsis').value;

    if (this.imageUrl && this.imageUrl !== '') {

      book.imageUrl = this.imageUrl;
    }

    this.bookService.addBook(book);
    this.router.navigate(['/books']);
  }

  onSelectImage(event: { target: { files: File[]; }; }) {

    this.onUploadImage(event.target.files[0]);
  }  
}

