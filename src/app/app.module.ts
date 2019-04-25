import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserSignUpComponent } from './user/component/user-sign-up/user-sign-up.component';
import { UserSignInComponent } from './user/component/user-sign-in/user-sign-in.component';
import { UserSignEditComponent } from './user/component/user-sign-edit/user-sign-edit.component';
import { UserSignDetailComponent } from './user/component/user-sign-detail/user-sign-detail.component';
import { BookListComponent } from './book/component/book-list/book-list.component';
import { BookViewComponent } from './book/component/book-view/book-view.component';
import { BookFormComponent } from './book/component/book-form/book-form.component';
import { NavigatorComponent } from './navigator/navigator.component';

@NgModule({
  declarations: [    
    AppComponent,
    UserSignUpComponent,
    UserSignInComponent,
    UserSignEditComponent,
    UserSignDetailComponent,
    BookListComponent,
    BookViewComponent,
    BookFormComponent,
    NavigatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
