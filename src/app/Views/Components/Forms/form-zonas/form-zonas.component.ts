import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Zona } from 'src/app/Controllers/Zona';
import { TableResponse } from 'src/app/Helpers/Interfaces';
import { IZona } from 'src/app/Models/Zona/izona';
import { DatosServiceService } from 'src/app/Services/datos-service.service';
import { FormSucursalesComponent } from '../form-sucursales/form-sucursales';

import { ModelResponse } from 'src/app/Models/Usuario/modelResponse';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { Isucursal } from 'src/app/Models/Sucursal/Isucursal';
import { Izona_sucursaldts } from 'src/app/Models/Zona/izonasucursal';

@Component({
  selector: 'app-form-zonas',
  templateUrl: './form-zonas.component.html',
  styleUrls: ['./form-zonas.component.css']
})
export class FormZonasComponent implements  OnInit {
  
  public config: any;  
  public term: string="";
  public sele:boolean=true;
  public campos:string[]=[];
  public camposdetalle:string[]=[];
  public totalregistros: number=0;
  public totalregistrosdetalle: number=0;

  actualpage: number=1;
  tituloslocal: string[]=[];
  tituloslocaldetalle: string[]=[];
  fg:FormGroup = new FormGroup({})
  
  

  product:IZona=this.productdatos.model

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb: FormBuilder,
    private toastr: MatDialog,
    public productdatos:Zona,
    private dialogre:MatDialogRef<FormZonasComponent>,
    private Dat:DatosServiceService,
    private ServiceComunicacion:ComunicacionService,) 
    {
      this.fg=this.fb.group({});
    }


agregar() {
  const  dialogRef = this.toastr.open(FormSucursalesComponent,{
    width: '900px',data:{}
      })
      dialogRef.afterClosed().subscribe((result:Isucursal)=>{
        // verificar si existe en la lista actual
        
        if(this.productdatos.model.zonaSucursales.find(r=>r.nombre.includes(result.nombre))){
          this.Dat.showMessage("Sucursal existe en el listado, Favor Verificar","Existe","error")
        }else{
          
          var nueva:Izona_sucursaldts={
            id: 0,
            zona_id: this.productdatos.model.id,
            sucursal_id: result.secuencial,
            nombre: result.nombre,
            sucursal: {secuencial:result.secuencial,nombre:result.nombre}
          }
          
          // verifica si existe en otra zona
         this.productdatos.verificasucursalasignada(nueva.sucursal_id.toString()).subscribe({
          next:(rep:boolean)=>{
            
            if (rep == false ){
              this.productdatos.model.zonaSucursales.push(nueva)
             }else{              
              this.Dat.showMessage("Sucursal existe en Otra Zona, Favor Verificar","Existe","error")
             }
          },error:(err:Error)=>{
            this.Dat.showMessage("Error:"+err.message,"Error","error")
          }
         }) 
          
        }
      })
}


actualizaelidtable(event: string) {
  this.config.id=event
}

paginacambio(event: number) {
  this.config.actualpage = event
}

opcion(event: TableResponse) {
  
  var elemento:Izona_sucursaldts = event.key as (Izona_sucursaldts)
  this.productdatos.model.zonaSucursales.splice(this.productdatos.model.zonaSucursales.indexOf(elemento),1)
}
  

 get Descripcion(){return this.fg.get('descripcion');}

  ngOnInit(): void {
        
        this.product = this.data.model
    
        this.campos=Object.keys(this.product);
        this.fg= this.Dat.llenarFormGrup(this.product)

        // el detalle 
       // this.getdetalle()
        this.config = {
                  id:'',
                  itemsPerPage: 10,
                  currentPage: 1,
                  totalItems: this.productdatos.model.zonaSucursales.length
                };

        this.productdatos.zs.TRegistros.subscribe({
          next:(rep:number)=>{
            this.config.totalItems=rep
            this.ServiceComunicacion.enviarMensaje(this.config)
          }
          
        })
        this.productdatos.zs.titulos.map((x:string|any)=>{
          let nx:string = x[Object.keys(x)[0]]
          this.camposdetalle.push(...Object.keys(x))
          this.tituloslocaldetalle.push(nx)
        })
        
  }

  // getdetalle(){
  //   this.productdatos.getdetalle(this.product.id.toString())    
  // }

  grabar(){
    this.productdatos.model.descripcion = this.fg.controls["descripcion"].value

    this.productdatos.grabar()

    this.dialogre.close(this.productdatos.model)
    
  }
  
  onChangeProductType(event:any){}
  buscar(){}
  cancelar(){
    this.dialogre.close(null)
  }

}

