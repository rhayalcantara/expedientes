import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TablesComponent } from '../../tables/tables.component';
import { Parametro } from 'src/app/Controllers/Parametro';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { DatosServiceService } from 'src/app/Services/datos-service.service';
import { MatDialog } from '@angular/material/dialog';
import { TableResponse } from 'src/app/Helpers/Interfaces';
import { IParametro } from 'src/app/Models/Proceso/Proceso';
import { FormParametroComponent } from '../../Forms/form-parametro/form-parametro.component';

@Component({
  standalone:true,
  imports:[//MatDialogModule,
    FormsModule,TablesComponent],
  selector: 'app-parametro-page',
  templateUrl: './parametro-page.component.html',
  styleUrls: ['./parametro-page.component.css']
})
export class ParametroPageComponent implements OnInit {
public campos: string[]=[];
public tituloslocal: string[]=[];
config: any;
public term: string='';

constructor(
  public producto:Parametro,
  private ServiceComunicacion:ComunicacionService,
  private datos:DatosServiceService,
  private toastr: MatDialog
  ) { 
    // this.producto.getdatos()
    this.ServiceComunicacion.enviarMensajeObservable.subscribe({next:(mensaje:string)=>{
      console.log('Productos Construtor: '+mensaje)   
    
    }})
  }

ngOnInit(): void {
  this.producto.getdatos()
  this.producto.TRegistros.subscribe({
   next:(rep:number)=>{
     this.config.totalItems=rep
     this.ServiceComunicacion.enviarMensaje(this.config)
   }
   
  })

  this.config = {
  id:'',
   itemsPerPage: 10,
   currentPage: 1,
   totalItems: this.producto.totalregistros
 };
  
   
   this.producto.titulos.map((x:string|any)=>{
     let nx:string = x[Object.keys(x)[0]]
     this.campos.push(...Object.keys(x))
     this.tituloslocal.push(nx)
   })
   console.log(this.campos)
 }
actualizaelidtable($event: string) {
  
  this.config.id = event
}
paginacambio($event: number) {
  this.producto.actualpage =  $event 
}
opcion(event:TableResponse){
  console.log(event)
  
  const acct:any ={
    edit:this.edita,
    del:this.delete
 }   
 
 const handler =  acct[event.option](event.key,this.producto,this.toastr)
 handler.then((rep:IParametro)=>{

  if(rep!=null){
    let m:IParametro = this.producto.arraymodel.find(x=>x.id==rep.id) as IParametro
    let m2:IParametro =this.producto.arraymodel[this.producto.arraymodel.indexOf(m)]
    m2 = rep
    
    this.datos.showMessage("Registro Actualizado Correctamente",this.producto.titulomensage,"sucess")
    //this.producto.filtrar()

  }

    
 },(err:Error)=>{
   this.datos.showMessage("Error: "+err.message,"Error","error")
 })
 }
 
 edita(prod:IParametro,p:Parametro,t:MatDialog):Promise<any> {
  
  const rep =  new Promise ((resolve:any,reject:any)=>{
    // p.getdatos()
    
    p.model = prod // p.arraymodel.find(x=>x.id=prod.id) as IParametro
    console.log('producto edit',p.model)

      const  dialogRef = t.open(FormParametroComponent,{
        width: '900px',data:{model:p.model}})
        
        dialogRef.afterClosed().subscribe((result:IParametro)=>{
          //console.log('llego del formulario de producto',result)
          if (result){
            resolve(result);
          }else{
            resolve(null)
          }
          
        });  
  })
  
  return rep

}

delete(prod:IParametro,p:Parametro,t:MatDialog):Promise<any>{
 return new Promise((resolve,reject)=>{ resolve(prod)}) 
}


filtro() {
throw new Error('Method not implemented.');
}

agregar() {

  let n:IParametro={
    id:0,
    nombre:'',
    sg:false
  
  }
  
  const  dialogRef = this.toastr.open(FormParametroComponent,{
    width: '900px',data:{model:n}})
    dialogRef.afterClosed().subscribe((result:IParametro)=>{
      //console.log('llego del formulario de producto',result)
      this.producto.arraymodel.push(result)
      this.datos.showMessage("Registro Insertado Correctamente",this.producto.titulomensage,"sucess")
    });
}
pdf() {
throw new Error('Method not implemented.');
}
excel() {
throw new Error('Method not implemented.');
}

}
