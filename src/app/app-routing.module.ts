import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './components/carrito/carrito.component';
import { ComprasComponent } from './components/compras/compras.component';
import { HomeComponent } from './components/home/home.component';
import { PaguinaErroneaComponent } from './components/paguina-erronea/paguina-erronea.component';
import { UserLoginComponent } from './components/user-login/user-login.component';

const routes: Routes = [ 
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: UserLoginComponent },
  { path: 'home', component: HomeComponent},
  { path:'carrito',component: CarritoComponent},
  { path:'compras',component:ComprasComponent},
  { path: '**', component: PaguinaErroneaComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
