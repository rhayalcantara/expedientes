import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { TablesComponent } from '../../tables/tables.component';
import { TableResponse } from 'src/app/Helpers/Interfaces';
import { Supervisores } from 'src/app/Controllers/Supervisores';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { DatosServiceService } from 'src/app/Services/datos-service.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  standalone:true,
  imports:[//MatDialogModule,
    FormsModule,TablesComponent],
  selector: 'app-proceso-page',
  templateUrl: './proceso-page.component.html',
  styleUrls: ['./proceso-page.component.css']
})
export class ProcesoPageComponent implements OnInit {

  public config: any;
  public campos: string[]=[] ;
  public tituloslocal: string[]=[];
  public term: string="";

  constructor(public supervisores:Supervisores,
    private ServiceComunicacion:ComunicacionService,
    private datos:DatosServiceService,
    private toastr: MatDialog){
      this.ServiceComunicacion.enviarMensajeObservable.subscribe({next:(mensaje:string)=>{
        console.log('Productos Construtor: '+mensaje)   
      }})
    }

    ngOnInit(): void {
      this.supervisores.getdatos()
      this.supervisores.TRegistros.subscribe({
        next:(rep:number)=>{
          this.config.totalItems=rep
          this.ServiceComunicacion.enviarMensaje(this.config)
        }
      })
      this.config = {
        id:'',
         itemsPerPage: 10,
         currentPage: 1,
         totalItems: this.supervisores.totalregistros
       };
        
         
         this.supervisores.titulos.map((x:string|any)=>{
           let nx:string = x[Object.keys(x)[0]]
           this.campos.push(...Object.keys(x))
           this.tituloslocal.push(nx)
           console.log('init',nx)
         })
    }


filtro() {
throw new Error('Method not implemented.');
}
agregar() {
throw new Error('Method not implemented.');
}
pdf() {
throw new Error('Method not implemented.');
}
excel() {
throw new Error('Method not implemented.');
}

actualizaelidtable($event: string) {
throw new Error('Method not implemented.');
}
paginacambio($event: number) {
throw new Error('Method not implemented.');
}
opcion($event: TableResponse) {
throw new Error('Method not implemented.');
}

cancelar() {
throw new Error('Method not implemented.');
}
grabar() {
throw new Error('Method not implemented.');
}


}
