import { Component } from '@angular/core';
import { TableResponse } from 'src/app/Helpers/Interfaces';
import { TablesComponent } from '../../tables/tables.component';
import { FormsModule } from '@angular/forms';
import { Supervisores } from 'src/app/Controllers/Supervisores';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  standalone:true,
  imports:[TablesComponent,FormsModule],  
  selector: 'app-selecion-supervisor',
  templateUrl: './selecion-supervisor.component.html',
  styleUrls: ['./selecion-supervisor.component.css']
})
export class SelecionSupervisorComponent {
  config:any
  public term: string='';
  public sele:boolean = true
  public campos:string[]=[]
  public tituloslocal:string[]=[]

   constructor(
      public supervisor:Supervisores,
      private ServiceComunicacion:ComunicacionService,
      private dialogRef: MatDialogRef<SelecionSupervisorComponent>){

        
   }
ngOnInit(): void {
        
    this.supervisor.getdatos()
    this.config = {
      id:'',
       itemsPerPage: 10,
       currentPage: 1,
       totalItems: this.supervisor.totalregistros
     };
     this.supervisor.TRegistros.subscribe({
      next:(rep:number)=>{
        this.config.totalItems=rep
        this.ServiceComunicacion.enviarMensaje(this.config)
      }
      
     })
     this.supervisor.titulos.map((x:string|any)=>{
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
    this.supervisor.arraymodel = this.supervisor.arraymodel.filter(
      x=>x.nombre.includes(this.term.toUpperCase()) 
    )
  }else{
    this.supervisor.getdatos()
  }

 }


}
