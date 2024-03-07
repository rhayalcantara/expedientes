import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TablesComponent } from '../../tables/tables.component';
import { TableResponse } from 'src/app/Helpers/Interfaces';

import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { DatosServiceService } from 'src/app/Services/datos-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Proceso } from 'src/app/Controllers/Proceso';
import { FormProcesoComponent } from '../../Forms/form-proceso/form-proceso.component';
import { IProceso, IprocesoDts } from 'src/app/Models/Proceso/Proceso';
import { ModelResponse } from 'src/app/Models/Usuario/modelResponse';

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

  constructor(public procesos:Proceso,
    private ServiceComunicacion:ComunicacionService,
    private datos:DatosServiceService,
    private toastr: MatDialog){
      this.ServiceComunicacion.enviarMensajeObservable.subscribe({next:(mensaje:string)=>{

      }})
    }

    ngOnInit(): void {
      this.procesos.getdatos()
      this.procesos.TRegistros.subscribe({
        next:(rep:number)=>{
          this.config.totalItems=rep
          this.ServiceComunicacion.enviarMensaje(this.config)
        }
      })
      this.config = {
        id:'',
         itemsPerPage: 10,
         currentPage: 1,
         totalItems: this.procesos.totalregistros
       };
        
         
         this.procesos.titulos.map((x:string|any)=>{
           let nx:string = x[Object.keys(x)[0]]
           this.campos.push(...Object.keys(x))
           this.tituloslocal.push(nx)

         })
    }


filtro() {

}
agregar() {
  let model:IprocesoDts=this.procesos.inicializamodelo()
  const  dialogRef = this.toastr.open(FormProcesoComponent,{
    width: '900px',data:{model:model}})
    dialogRef.afterClosed().subscribe((result:IprocesoDts)=>{

      this.procesos.arraymodel.push(result)
      this.datos.showMessage("Registro Insertado Correctamente",this.procesos.titulomensage,"sucess")
    });
}
pdf() {
throw new Error('Method not implemented.');
}
excel() {
throw new Error('Method not implemented.');
}

actualizaelidtable($event: string) {
  this.config.id = $event
}
paginacambio($event: number) {
throw new Error('Method not implemented.');
}
opcion(event:TableResponse){

  
  const acct:any ={
    edit:this.edita,
    del:this.delete
 }   
 
 const handler =  acct[event.option](event.key,this.procesos,this.toastr)
 handler.then((rep:IprocesoDts)=>{

  if(rep!=null){
    let m:IprocesoDts = this.procesos.arraymodel.find(x=>x.id==rep.id) as IprocesoDts
    let m2:IprocesoDts =this.procesos.arraymodel[this.procesos.arraymodel.indexOf(m)]
    m2 = rep
    
    this.datos.showMessage("Registro Actualizado Correctamente",this.procesos.titulomensage,"sucess")
    //this.procesos.filtrar()

  }

    
 },(err:Error)=>{
   this.datos.showMessage("Error: "+err.message,"Error","error")
 })
 }
 
 edita(prod:IprocesoDts,p:Proceso,t:MatDialog):Promise<any> {
  
  const rep =  new Promise ((resolve:any,reject:any)=>{
    // p.getdatos()
    
    p.model = prod // p.arraymodel.find(x=>x.id=prod.id) as IProduct
  
    const  dialogRef = t.open(FormProcesoComponent,{
      width: '900px',data:{model:p.model}})
      dialogRef.afterClosed().subscribe((result:IprocesoDts)=>{

        if (result){
          resolve(result);
        }else{
          resolve(null)
        }
        
      });  

      
  });
  
  return rep

}

delete(prod:IprocesoDts,p:Proceso,t:MatDialog):Promise<any>{
 return new Promise((resolve,reject)=>{ resolve(prod)}) 
}
cancelar() {
throw new Error('Method not implemented.');
}
grabar() {
throw new Error('Method not implemented.');
}


}
