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
},
{ path:'supervisores', 
loadComponent:()=> import('./Views/Components/Pages/supervisores-page/supervisores-page.component')
.then((m)=> m.SupervisoresPageComponent),
 canActivate: [AuthGuard]
},
{ path:'Procesos', 
loadComponent:()=> import('./Views/Components/Pages/proceso-page/proceso-page.component')
.then((m)=> m.ProcesoPageComponent),
 canActivate: [AuthGuard]
} ,
{ path:'Parametro', 
loadComponent:()=> import('./Views/Components/Pages/parametro-page/parametro-page.component')
.then((m)=> m.ParametroPageComponent),
 canActivate: [AuthGuard]
} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 