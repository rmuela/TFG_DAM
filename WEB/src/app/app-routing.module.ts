import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404ComponentComponent } from './components/error404/error404/error404-component.component';
import { PinCodeComponentComponent } from './components/pinCode/pin-code-component/pin-code-component.component';
import { AuthGuard } from './helpers/auth.guard';
import { LoginComponent } from './pages/account/login/login.component';
import { RegisterComponent } from './pages/account/register-component/register-component.component';
import { CreateWeddingComponentComponent } from './pages/create-wedding/create-wedding-component/create-wedding-component.component';
import { HomeComponentComponent } from './pages/home/home-component/home-component.component';
import { ShowWeddingComponentComponent } from './pages/show-weddings/show-wedding-component/show-wedding-component.component';


const routes: Routes = [
  
  
  {
    path: '',
    component: LoginComponent,canActivate: [AuthGuard],
  },
  {
    path: 'sign-in',
    component: RegisterComponent,canActivate: [AuthGuard],
  }, 
  {
    path: 'home',
    component: HomeComponentComponent, canActivate: [AuthGuard],
  },
  {
    path: 'home/create-wedding',
    component: CreateWeddingComponentComponent, canActivate: [AuthGuard],
  },
  {
    path: 'home/verify-pinCode',
    component: PinCodeComponentComponent, canActivate: [AuthGuard],
  },
  {
    path: 'home/show-weddings',
    component: ShowWeddingComponentComponent, canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: Error404ComponentComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
