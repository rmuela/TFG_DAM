import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404ComponentComponent } from './components/error404-component/error404-component.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
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
