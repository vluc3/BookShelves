import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './authentication/signup.component';
import { SigninComponent } from './authentication/signin.component';
import { ListComponent } from './book/list/list.component';
import { DetailComponent } from './book/detail/detail.component';
import { FormComponent } from './book/form/form.component';
import { NavigatorComponent } from './navigator/navigator.component';

@NgModule({
  declarations: [    
    AppComponent,
    SignupComponent,
    SigninComponent,
    ListComponent,
    DetailComponent,
    FormComponent,
    NavigatorComponent
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
