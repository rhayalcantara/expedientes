import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TablesComponent } from '../../tables/tables.component';
import { Agenda } from 'src/app/Controllers/Agenda';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { DatosServiceService } from 'src/app/Services/datos-service.service';
import { MatDialog } from '@angular/material/dialog';
import { TableResponse } from 'src/app/Helpers/Interfaces';
import { IagendaDts } from 'src/app/Models/agenda/agenda';
import { FormProduct2Component } from '../../Forms/form-product2/form-product2.component';
import { FormAgendaComponent } from '../../Forms/form-agenda/form-agenda.component';

@Component({
  standalone:true,
  imports:[FormsModule,TablesComponent],
  selector: 'app-agenda-page',
  templateUrl: './agenda-page.component.html',
  styleUrls: ['./agenda-page.component.css']
})
export class AgendaPageComponent implements OnInit {
  config:any
  public term: string='';
  
  public campos:string[]=[]
  public tituloslocal:string[]=[]

  constructor(
    public producto:Agenda,
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
       
     }
     opcion(event:TableResponse){
      console.log(event)
      
      const acct:any ={
        edit:this.edita,
        del:this.delete
     }   
     
     const handler =  acct[event.option](event.key,this.producto,this.toastr)
     handler.then((rep:IagendaDts)=>{
  
      if(rep!=null){
        let m:IagendaDts = this.producto.arraymodel.find(x=>x.id==rep.id) as IagendaDts
        let m2:IagendaDts =this.producto.arraymodel[this.producto.arraymodel.indexOf(m)]
        m2 = rep
        
        this.datos.showMessage("Registro Actualizado Correctamente",this.producto.titulomensage,"sucess")
        
  
      }
  
        
     },(err:Error)=>{
       this.datos.showMessage("Error: "+err.message,"Error","error")
     })
     }
     
     edita(prod:IagendaDts,p:Agenda,t:MatDialog):Promise<any> {
      
      const rep =  new Promise ((resolve:any,reject:any)=>{
        // p.getdatos()
        
        p.model = prod // p.arraymodel.find(x=>x.id=prod.id) as IProduct
        console.log('producto edit',p.model)
  
          const  dialogRef = t.open(FormAgendaComponent,{
            width: '900px',data:{model:p.model}})
            dialogRef.afterClosed().subscribe((result:IagendaDts)=>{
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
    
    delete(prod:IagendaDts,p:Agenda,t:MatDialog):Promise<any>{
     return new Promise((resolve,reject)=>{ resolve(prod)}) 
    }
  
    paginacambio(event:number){
      this.producto.actualpage = event
      
    }
    actualizaelidtable(event:string){
      console.log('se actualizo el config',event)
      this.config.id = event
    }
filtro() {
throw new Error('Method not implemented.');
}

agregar() {
  const  dialogRef = this.toastr.open(FormAgendaComponent,{
    width: '900px',data:{}})
    dialogRef.afterClosed().subscribe((result:IagendaDts)=>{
      //console.log('llego del formulario de producto',result)
      
      
    });  
}
pdf() {
throw new Error('Method not implemented.');
}
excel() {
throw new Error('Method not implemented.');
}

}
