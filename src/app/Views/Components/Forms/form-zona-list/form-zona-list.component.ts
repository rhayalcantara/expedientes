import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Zona } from 'src/app/Controllers/Zona';
import { TableResponse } from 'src/app/Helpers/Interfaces';
import { IZona, IZonaSucusal } from 'src/app/Models/Zona/izona';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';

@Component({
  selector: 'app-form-zona-list',
  templateUrl: './form-zona-list.component.html',
  styleUrls: ['./form-zona-list.component.css']
})
export class FormZonaListComponent implements OnInit{
campos: string[]=[];
tituloslocal: string[]=[];
config: any;

sele: boolean=true;
term: any;

constructor(
  public zona:Zona,
  private ServiceComunicacion:ComunicacionService,
  private dialogRef: MatDialogRef<FormZonaListComponent>){

}
ngOnInit(): void {
  this.zona.getdatos()
  this.config = {
      id:'',
       itemsPerPage: 10,
       currentPage: 1,
       totalItems: this.zona.totalregistros
     };

  this.zona.TRegistros.subscribe({
   next:(rep:number)=>{
     this.config.totalItems=rep
     this.ServiceComunicacion.enviarMensaje(this.config)
   }
   
  })

   this.zona.titulos.map((x:string|any)=>{
     let nx:string = x[Object.keys(x)[0]]
     this.campos.push(...Object.keys(x))
     this.tituloslocal.push(nx)
   })
   
 }
actualizaelidtable($event: string) {
  this.config.id=$event
}
paginacambio($event: number) {
throw new Error('Method not implemented.');
}
opcion($event: TableResponse) {
  let zona:IZona = $event.key as IZona
  this.zona.getdetalle(zona.id.toString()).then(
    (rep)=>{
      console.log('se envia',this.zona)
    
      this.dialogRef.close(this.zona)
    }
  )

  //IZonaSucusal
}
getdatos() {
throw new Error('Method not implemented.');
}


}
