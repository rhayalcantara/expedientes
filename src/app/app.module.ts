import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavmenuComponent } from './Views/Components/navmenu/navmenu.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DatosServiceService } from './Services/datos-service.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablesComponent } from './Views/Components/tables/tables.component';
import { ExcelService } from './Services/excel.service';
import { MatDialogModule } from '@angular/material/dialog';
import { TokenInterceptorService } from './Services/token-interceptor.service';
import { ErrorInterceptorService } from './Services/error-interceptor.service';

import { FormZonasComponent } from './Views/Components/Forms/form-zonas/form-zonas.component';

import { FormsSupervisorComponent } from './Views/Components/Forms/forms-supervisor/forms-supervisor.component';
import { FormZonaListComponent } from './Views/Components/Forms/form-zona-list/form-zona-list.component';
import { ProcesoPageComponent } from './Views/Components/Pages/proceso-page/proceso-page.component';
import { FormProcesoComponent } from './Views/Components/Forms/form-proceso/form-proceso.component';
import { FormParametroComponent } from './Views/Components/Forms/form-parametro/form-parametro.component';
import { ParametroPageComponent } from './Views/Components/Pages/parametro-page/parametro-page.component';
import { FormParametroListComponent } from './Views/Components/Forms/form-parametro-list/form-parametro-list.component';
import { FormProductoParametroComponent } from './Views/Components/Forms/form-producto-parametro/form-producto-parametro.component';
import { AgendaPageComponent } from './Views/Components/Pages/agenda-page/agenda-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavmenuComponent,
    
    FormZonasComponent,
        
         FormsSupervisorComponent,
                  FormZonaListComponent,
                  AgendaPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    TablesComponent,
  ],
  providers: [DatosServiceService,ExcelService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
