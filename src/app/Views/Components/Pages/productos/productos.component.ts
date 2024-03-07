import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { TablesComponent } from '../../tables/tables.component';
import { Product } from 'src/app/Controllers/Product';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { DatosServiceService } from 'src/app/Services/datos-service.service';
import { TableResponse } from 'src/app/Helpers/Interfaces';
import { IProduct } from 'src/app/Models/Product/IProduct';
import { FormProduct2Component } from '../../Forms/form-product2/form-product2.component';
import { FormUsuariosComponent } from '../../Forms/form-usuarios/form-usuarios';

@Component({
  standalone:true,
  imports:[//MatDialogModule,
    FormsModule,TablesComponent],
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
 
  constructor(
    public producto:Product,
    private ServiceComunicacion:ComunicacionService,
    private datos:DatosServiceService,
    private toastr: MatDialog
    ) { 
      // this.producto.getdatos()
      this.ServiceComunicacion.enviarMensajeObservable.subscribe({next:(mensaje:string)=>{
 
      
      }})
    }
 
  config:any
  public term: string='';
  
  public campos:string[]=[]
  public tituloslocal:string[]=[]


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

    
    const acct:any ={
      edit:this.edita,
      del:this.delete
   }   
   
   const handler =  acct[event.option](event.key,this.producto,this.toastr)
   handler.then((rep:IProduct)=>{

    if(rep!=null){

      let m:IProduct = this.producto.arraymodel.find(x=>x.id==rep.id) as IProduct
      let m2:IProduct =this.producto.arraymodel[this.producto.arraymodel.indexOf(m)]
      m2 = rep
      
      this.datos.showMessage("Registro Actualizado Correctamente",this.producto.titulomensage,"sucess")
      this.producto.filtrar()

    }

      
   },(err:Error)=>{
     this.datos.showMessage("Error: "+err.message,"Error","error")
   })
   }
   
   edita(prod:IProduct,p:Product,t:MatDialog):Promise<any> {
    
    const rep =  new Promise ((resolve:any,reject:any)=>{
      // p.getdatos()
      
      p.model = prod // p.arraymodel.find(x=>x.id=prod.id) as IProduct
  

        const  dialogRef = t.open(FormProduct2Component,{
          width: '900px',data:{model:p.model}})
          dialogRef.afterClosed().subscribe((result:IProduct)=>{

            if (result){
              resolve(result);
            }else{
              resolve(null)
            }
            
          });  
    })
    
    return rep

  }
  
  delete(prod:IProduct,p:Product,t:MatDialog):Promise<any>{
   return new Promise((resolve,reject)=>{ 
    resolve(prod)
  }) 
  }

  paginacambio(event:number){
    this.producto.actualpage = event
    this.producto.filtrar()
  }
  actualizaelidtable(event:string){

    this.config.id = event
  }
  filtro(){
      this.producto.filtro = this.term
      this.producto.getdatos()
  }
  excel(){}
  pdf(){
    const  dialogRef = this.toastr.open(FormUsuariosComponent,{
      width: '900px',data:{}
        })
        dialogRef.afterClosed().subscribe((result:any)=>{

        })
        
  }
  agregar(){
    const  dialogRef = this.toastr.open(FormProduct2Component,{
      width: '900px',data:{model:this.producto.model}})
      dialogRef.afterClosed().subscribe((result:IProduct)=>{

        this.producto.arraymodel.push(result)
        this.datos.showMessage("Registro Insertado Correctamente",this.producto.titulomensage,"sucess")
      });
  }
}
