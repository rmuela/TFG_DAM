import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404ComponentComponent } from './components/error404/error404/error404-component.component';
import { AuthGuard } from './helpers/auth.guard';
import { LoginComponent } from './pages/account/login/login.component';
import { RegisterComponent } from './pages/account/register-component/register-component.component';
import { HomeComponentComponent } from './pages/home/home-component/home-component.component';


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
    path: '**',
    component: Error404ComponentComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
