import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/account/login/login.component';
import { HomeComponentComponent } from './pages/home/home-component/home-component.component';
import { Error404ComponentComponent } from './components/error404/error404/error404-component.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { AlertComponent } from './components/alert/alert-component/alert-component.component';
import { RegisterComponent } from './pages/account/register-component/register-component.component';
import { CommonModule } from '@angular/common';
import { FooterComponentComponent } from './components/footer/footer-component/footer-component.component';
import { NavComponentComponent } from './components/nav/nav-component/nav-component.component';
import { HeaderComponentComponent } from './components/header/header-component/header-component.component';
import { CreateWeddingComponentComponent } from './pages/create-wedding/create-wedding-component/create-wedding-component.component';
import { PinCodeComponentComponent } from './components/pinCode/pin-code-component/pin-code-component.component';
import { ShowWeddingComponentComponent } from './pages/show-weddings/show-wedding-component/show-wedding-component.component';

@NgModule({
  declarations: [   
    AppComponent,
    Error404ComponentComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponentComponent,
    AlertComponent,
    FooterComponentComponent,
    NavComponentComponent,
    HeaderComponentComponent,
    CreateWeddingComponentComponent,
    PinCodeComponentComponent,
    ShowWeddingComponentComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
