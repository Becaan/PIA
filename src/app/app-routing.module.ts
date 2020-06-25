import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterPoljoprivrednikComponent } from './register-poljoprivrednik/register-poljoprivrednik.component';
import { RegisterPreduzeceComponent } from './register-preduzece/register-preduzece.component';
import { PoljoprivrednikComponent } from './poljoprivrednik/poljoprivrednik.component';
import { DodajRasadnikComponent } from './dodaj-rasadnik/dodaj-rasadnik.component';
import { AuthGuard } from './auth-guard';
import { PreduzeceComponent } from './preduzece/preduzece.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  { path:'', component:LoginComponent},
  { path:'register', component:RegisterComponent},
  { path:'register/poljoprivrednik', component:RegisterPoljoprivrednikComponent},
  { path:'register/preduzece', component:RegisterPreduzeceComponent},
  { path:'poljoprivrednik', component:PoljoprivrednikComponent, canActivate:[AuthGuard]},
  { path:'poljoprivrednik/dodajRasadnik', component:DodajRasadnikComponent, canActivate:[AuthGuard]},
  { path:'/preduzece', component:PreduzeceComponent, canActivate:[AuthGuard]},
  { path:'/admin', component:AdminComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule], 
  providers: [AuthGuard]
})
export class AppRoutingModule { }
