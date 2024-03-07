import { Component, OnInit, ɵɵclassMapInterpolate2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Supervisores } from 'src/app/Controllers/Supervisores';
import { TableResponse } from 'src/app/Helpers/Interfaces';
import {  Isupervisordts } from 'src/app/Models/Supervisor/Isupervisor';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { DatosServiceService } from 'src/app/Services/datos-service.service';
import { FormsSupervisorComponent } from '../../Forms/forms-supervisor/forms-supervisor.component';
import { FormsModule } from '@angular/forms';
import { TablesComponent } from '../../tables/tables.component';
import { IZonaSucusal } from 'src/app/Models/Zona/izona';

@Component({
  standalone:true,
  imports:[//MatDialogModule,
    FormsModule,TablesComponent],
  selector: 'app-supervisores-page',
  templateUrl: './supervisores-page.component.html',
  styleUrls: ['./supervisores-page.component.css']
})
export class SupervisoresPageComponent implements OnInit {

  public config: any;
  public campos: string[]=[] ;
  public tituloslocal: string[]=[];
  public term: string="";

constructor(public supervisores:Supervisores,
    private ServiceComunicacion:ComunicacionService,
    private datos:DatosServiceService,
    private toastr: MatDialog){
      this.ServiceComunicacion.enviarMensajeObservable.subscribe({next:(mensaje:string)=>{
        
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
         
       })
  }

filtro() {
  this.supervisores.filtro = this.term
  this.supervisores.getdatos()
  }

actualizaelidtable(event: string) {
  
  this.config.id = event
}

paginacambio($event: number) {
  this.supervisores.actualpage = $event
  // this.supervisores.filtrar()
}
opcion(event: TableResponse) {
 
    
  const acct:any ={
    edit:this.edita,
    del:this.delete
 }   
 
 const handler =  acct[event.option](event.key,this.supervisores,this.toastr)
 handler.then((rep:Isupervisordts)=>{

  if(rep!=null){
    let m:Isupervisordts | undefined = this.supervisores.arraymodel.find(x=>x.id==rep.id)
    if(m!=undefined){
          let m2:Isupervisordts =this.supervisores.arraymodel[this.supervisores.arraymodel.indexOf(m)]
          m2 = rep
          m2.nombrezona = m2.zona.descripcion
          
    }

    
    
    this.datos.showMessage("Registro Actualizado Correctamente",this.supervisores.titulomensage,"sucess")
    //this.supervisores.filtrar()

  }

    
 },(err:Error)=>{
   this.datos.showMessage("Error: "+err.message,"Error","error")
 })
}
edita(prod:Isupervisordts,p:Supervisores,t:MatDialog):Promise<any> {
    
  const rep =  new Promise ((resolve:any,reject:any)=>{
    // p.getdatos()
    
    p.model = prod // p.arraymodel.find(x=>x.id=prod.id) as IProduct
    
  
    
    
      const  dialogRef = t.open(FormsSupervisorComponent,{
        width: '900px',data:{model:p.model}})
        dialogRef.afterClosed().subscribe((result:Isupervisordts)=>{
          
          if (result){
            resolve(result);
          }else{
            resolve(null)
          }
          
        });  
  })
  
  return rep

}

delete(prod:Isupervisordts,p:Supervisores,t:MatDialog):Promise<any>{
 return new Promise((resolve,reject)=>{ resolve(prod)}) 
}
agregar() {
  this.supervisores.model = this.supervisores.inicializamodelo()
  const  dialogRef = this.toastr.open(FormsSupervisorComponent,{
    width: '900px',data:{model:this.supervisores.model}})
    dialogRef.afterClosed().subscribe((result:Isupervisordts)=>{
      
      this.supervisores.arraymodel.push(result)
      this.datos.showMessage("Registro Insertado Correctamente",this.supervisores.titulomensage,"sucess")
    });
}
pdf() {
throw new Error('Method not implemented.');
}
excel() {
throw new Error('Method not implemented.');
}

}
