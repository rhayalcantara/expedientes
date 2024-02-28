import { Component } from '@angular/core';
import { TableResponse } from 'src/app/Helpers/Interfaces';
import { TablesComponent } from '../../tables/tables.component';
import { FormsModule } from '@angular/forms';
import { Proceso } from 'src/app/Controllers/Proceso';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  standalone:true,
  imports:[TablesComponent,FormsModule],  
  selector: 'app-selecion-proceso',
  templateUrl: './selecion-proceso.component.html',
  styleUrls: ['./selecion-proceso.component.css']
})
export class SelecionProcesoComponent {
  config:any
  public term: string='';
  public sele:boolean = true
  public campos:string[]=[]
  public tituloslocal:string[]=[]

   constructor(
      public proceso:Proceso,
      private ServiceComunicacion:ComunicacionService,
      private dialogRef: MatDialogRef<SelecionProcesoComponent>){

        
   }
ngOnInit(): void {
        
    this.proceso.getdatos()
    this.config = {
      id:'',
       itemsPerPage: 10,
       currentPage: 1,
       totalItems: this.proceso.totalregistros
     };
     this.proceso.TRegistros.subscribe({
      next:(rep:number)=>{
        this.config.totalItems=rep
        this.ServiceComunicacion.enviarMensaje(this.config)
      }
      
     })
     this.proceso.titulos.map((x:string|any)=>{
       let nx:string = x[Object.keys(x)[0]]
       this.campos.push(...Object.keys(x))
       this.tituloslocal.push(nx)
     })


   }
paginacambio($event: number) {
throw new Error('Method not implemented.');
}

actualizaelidtable($event: string) {
  this.config.id=$event
}
opcion($event: TableResponse) {
  this.dialogRef.close($event.key)
}

getdatos() {
  if (this.term!=''){
    this.proceso.arraymodel = this.proceso.arraymodel.filter(
      x=>x.descripcion.includes(this.term.toUpperCase()) 
    )
  }else{
    this.proceso.getdatos()
  }

 }

}
