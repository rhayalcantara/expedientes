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





@NgModule({
  declarations: [
    AppComponent,
    NavmenuComponent,
    
    FormZonasComponent,
    FormsSupervisorComponent
    
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
