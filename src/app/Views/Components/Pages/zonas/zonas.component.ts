import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Zona } from 'src/app/Controllers/Zona';
import { TableResponse } from 'src/app/Helpers/Interfaces';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { DatosServiceService } from 'src/app/Services/datos-service.service';
import { FormZonasComponent } from '../../Forms/form-zonas/form-zonas.component';
import { FormsModule } from '@angular/forms';
import { TablesComponent } from '../../tables/tables.component';
import { FormSucursalesComponent } from '../../Forms/form-sucursales/form-sucursales';
import { IZonaSucusal } from 'src/app/Models/Zona/izona';

@Component({
  standalone:true,
  imports:[FormsModule,TablesComponent],
  selector: 'app-zonas',
  templateUrl: './zonas.component.html',
  styleUrls: ['./zonas.component.css']
})
export class ZonasComponent implements OnInit {
 
  constructor(
    public zonas:Zona,
    private ServiceComunicacion:ComunicacionService,
    private datos:DatosServiceService,
    private toastr: MatDialog
    ) { 
      // this.zonas.getdatos()
      this.ServiceComunicacion.enviarMensajeObservable.subscribe({next:(mensaje:string)=>{
        //console.log('zonass Construtor: '+mensaje)   
      
      }})
    }
 
  config:any
  public term: string='';
  
  public campos:string[]=[]
  public tituloslocal:string[]=[]


  ngOnInit(): void {
    this.zonas.getdatos()
    this.zonas.TRegistros.subscribe({
     next:(rep:number)=>{
       this.config.totalItems=rep
       this.ServiceComunicacion.enviarMensaje(this.config)
     }
     
    })
    this.config = {
    id:'',
     itemsPerPage: 10,
     currentPage: 1,
     totalItems: this.zonas.totalregistros
   };
    
     
     this.zonas.titulos.map((x:string|any)=>{
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
   
   const handler =  acct[event.option](event.key,this.zonas,this.toastr)
   handler.then((rep:IZonaSucusal)=>{

    if(rep!=null){
      let m:IZonaSucusal = this.zonas.arraymodel.find(x=>x.id==rep.id) as IZonaSucusal
      let m2:IZonaSucusal =this.zonas.arraymodel[this.zonas.arraymodel.indexOf(m)]
      m2 = rep
      
      this.datos.showMessage("Registro Actualizado Correctamente",this.zonas.titulomensage,"sucess")
      this.zonas.filtrar()

    }

      
   },(err:Error)=>{
     this.datos.showMessage("Error: "+err.message,"Error","error")
   })
   }
   
   edita(prod:IZonaSucusal,p:Zona,t:MatDialog):Promise<any> {
    
    const rep =  new Promise ((resolve:any,reject:any)=>{
      // p.getdatos()
      
      p.model = prod // p.arraymodel.find(x=>x.id=prod.id) as IZonaSucusal
      console.log('zonas edit',p.model)

        const  dialogRef = t.open(FormZonasComponent,{
          width: '900px',data:{model:p.model}})
          dialogRef.afterClosed().subscribe((result:IZonaSucusal)=>{
            //console.log('llego del formulario de zonas',result)
            if (result){
              resolve(result);
            }else{
              resolve(null)
            }
            
          });  
    })
    
    return rep

  }
  abrirmodalzona(t:MatDialog,p:Zona){
    const  dialogRef = t.open(FormZonasComponent,{
      width: '900px',data:{model:p.model}})
      dialogRef.afterClosed().subscribe((rep:IZonaSucusal)=>{
        //console.log('llego del formulario de zonas',result)
        this.zonas.arraymodel.push(rep)
        this.datos.showMessage("Registro Insertado Correctamente",this.zonas.titulomensage,"sucess")
      });
  }
  delete(prod:IZonaSucusal,p:Zona,t:MatDialog):Promise<any>{
   return new Promise((resolve,reject)=>{ resolve(prod)}) 
  }

  paginacambio(event:number){
    this.zonas.actualpage = event
    this.zonas.filtrar()
  }
  actualizaelidtable(event:string){
    console.log('se actualizo el config',event)
    this.config.id = event
  }
  filtro(){
    if (this.term!=''){
        
      this.zonas.arraymodel = this.zonas.arraymodel.filter(x=>x.descripcion.includes((this.term.toUpperCase())))
   }else{
     this.zonas.getdatos()
   }
  }
  excel(){}
  pdf(){

  }
  agregar(){
    this.abrirmodalzona(this.toastr,this.zonas)
  }
}
