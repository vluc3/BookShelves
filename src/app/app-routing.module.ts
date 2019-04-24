import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserSignUpComponent } from './user/component/user-sign-up/user-sign-up.component';
import { UserSignInComponent } from './user/component/user-sign-in/user-sign-in.component';
import { BookListComponent } from './book/component/book-list/book-list.component';
import { BookDetailComponent } from './book/component/book-detail/book-detail.component';

import { AuthenticationGuardService } from './user/service/authentication-guard.service';
import { BookFormComponent } from './book/component/book-form/book-form.component';

const routes: Routes = [

  {path: 'authentication/signup', component: UserSignUpComponent},
  {path: 'authentication/signin', component: UserSignInComponent},
  {path: 'authentication/account', component: UserSignUpComponent},
  {path: 'books', canActivate: [AuthenticationGuardService], component: BookListComponent},
  {path: 'books/add', canActivate: [AuthenticationGuardService], component: BookFormComponent},
  {path: 'books/view/:id', canActivate: [AuthenticationGuardService], component: BookDetailComponent},
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  {path: '**', redirectTo: 'books'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {   
}
