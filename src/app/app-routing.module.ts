import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './user/sign/signup.component';
import { SigninComponent } from './user/sign/signin.component';
import { ListComponent } from './book/list/list.component';
import { DetailComponent } from './book/detail/detail.component';

import { AuthenticationGuardService } from './user/service/authentication-guard.service';
import { FormComponent } from './book/form/form.component';

const routes: Routes = [

  {path: 'authentication/signup', component: SignupComponent},
  {path: 'authentication/signin', component: SigninComponent},
  {path: 'books', canActivate: [AuthenticationGuardService], component: ListComponent},
  {path: 'books/add', canActivate: [AuthenticationGuardService], component: FormComponent},
  {path: 'books/view/:id', canActivate: [AuthenticationGuardService], component: DetailComponent},
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  {path: '**', redirectTo: 'books'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {   
}
