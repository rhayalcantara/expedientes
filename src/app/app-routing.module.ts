import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Services/auth-guard.service';
import { HomeComponent } from './Views/Components/Pages/home/home.component';

const routes: Routes = [
  {
    path:'login',
    loadChildren: ()=> 
    import ('loginapp/ComponentLogin').then((m)=>m.ShowmoduleModule)
  },
  { path: 'Home',       component:  HomeComponent,            pathMatch: 'full' , canActivate: [AuthGuard] },  
  { path:'TProducto', 
  loadComponent:()=> import('./Views/Components/Pages/productos/productos.component')
  .then((m)=> m.ProductosComponent),
   canActivate: [AuthGuard]
},
{ path:'zona', 
loadComponent:()=> import('./Views/Components/Pages/zonas/zonas.component')
.then((m)=> m.ZonasComponent),
 canActivate: [AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 