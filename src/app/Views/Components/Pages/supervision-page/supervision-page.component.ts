import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablesComponent } from '../../tables/tables.component';
import { Agenda } from 'src/app/Controllers/Agenda';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { DatosServiceService } from 'src/app/Services/datos-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Supervisores } from 'src/app/Controllers/Supervisores';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { TableResponse } from 'src/app/Helpers/Interfaces';
import { FormExpedienteClienteComponent } from '../../Forms/form-expediente-cliente/form-expediente-cliente.component';

@Component({
  standalone:true,
  imports:[FormsModule,TablesComponent
          ,ReactiveFormsModule,CommonModule ],
  selector: 'app-supervision-page',
  templateUrl: './supervision-page.component.html',
  styleUrls: ['./supervision-page.component.css']
})
export class SupervisionPageComponent {
selec: boolean=true;
actualizaelidtable($event: string) {
  this.config.id = $event
}
paginacambio($event: number) {
  this.producto.actualpage = $event
}



  config:any
  term: string='';

  public campos:string[]=["id","sucursal","proceso"]
  public tituloslocal:string[]=["ID","Sucursal","Proceso"]

  constructor(
    public  producto:Agenda,
    private ServiceComunicacion:ComunicacionService,
    // private datos:DatosServiceService,
    private toastr: MatDialog,
    public superv:Supervisores
    ) { 
      this.ServiceComunicacion.enviarMensajeObservable.subscribe({next:(mensaje:string)=>{    
      }})
    }
    ngOnInit(): void {
      this.superv.gettodos()
      this.producto.TRegistros.subscribe({
        next:(rep:number)=>{
          console.log('tregistros',rep)
          this.config.totalItems=rep
          this.ServiceComunicacion.enviarMensaje(this.config)
        }})

      this.config = {
      id:'',
       itemsPerPage: 10,
       currentPage: 1,
       totalItems: this.producto.totalregistros
     };
      
         
       
     }
     onChange($event: any) {
      
      let id=$event.target.value
      this.producto.getdetallesupervisor(id)      
      }
      opcion($event: TableResponse) {
        //llamar a FormExpedienteClienteComponent
        const dialogRef = this.toastr.open(FormExpedienteClienteComponent, {
          width: '100vw',
          data: { model: $event.key }
        });
          dialogRef.afterClosed().subscribe((result)=>{

            console.log(result)
          });   
      }      
  filtro() {
  throw new Error('Method not implemented.');
  }

  pdf() {
  throw new Error('Method not implemented.');
  }
  excel() {
  throw new Error('Method not implemented.');
  }

}
