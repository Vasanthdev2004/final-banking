import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren:()=> import('./layout/layout.module').then(m=> m.LayoutModule),
  },
  {
    path: '',
    loadChildren:()=> import('./registration/registration.module').then(m=> m.RegistrationModule),
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
