import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Zona } from 'src/app/Controllers/Zona';
import { TableResponse } from 'src/app/Helpers/Interfaces';
import { IZona } from 'src/app/Models/Zona/izona';
import { DatosServiceService } from 'src/app/Services/datos-service.service';
import { FormSucursalesComponent } from '../form-sucursales/form-sucursales';
import { izonasucursal } from 'src/app/Models/Zona/izonasucursal';
import { ZonaSucursal } from 'src/app/Controllers/ZonaSucursal';
import { ModelResponse } from 'src/app/Models/Usuario/modelResponse';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { Isucursal } from 'src/app/Models/Sucursal/Isucursal';

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
    private ServiceComunicacion:ComunicacionService,) {
    this.fg=this.fb.group({});
   }


agregar() {
  const  dialogRef = this.toastr.open(FormSucursalesComponent,{
    width: '900px',data:{}
      })
      dialogRef.afterClosed().subscribe((result:Isucursal)=>{
        // verificar si existe en la lista actual
        
        if(this.productdatos.zs.arraymodel.find(r=>r.nombre.includes(result.nombre))){
          this.Dat.showMessage("Sucursal existe en el listado, Favor Verificar","Existe","error")
        }else{

          var nueva:izonasucursal={
            id:0,
            zona_id:this.productdatos.model.id,
            sucursal_id:result.secuencial,
            nombre:result.nombre
          }
          console.log(nueva)
          // verifica si existe en otra zona
         if( !this.productdatos.zs.verificasucursalasignada(nueva.id.toString())){
          this.productdatos.zs.arraymodel.push(nueva)
         }else{
          console.log("Sucursal existe en Otra Zona, Favor Verificar")
          this.Dat.showMessage("Sucursal existe en Otra Zona, Favor Verificar","Existe","error")
         }
          
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
  console.log(event)
  var elemento:izonasucursal = event.key as (izonasucursal)
  this.productdatos.zs.arraymodel.splice(this.productdatos.zs.arraymodel.indexOf(elemento),1)
}
  

 get Descripcion(){return this.fg.get('descripcion');}

  ngOnInit(): void {
        console.log('formulario',this.data.model)
        this.product = this.data.model
    
        this.campos=Object.keys(this.product);
        this.fg= this.Dat.llenarFormGrup(this.product)

        // el detalle 
        this.getdetalle()
        this.config = {
                  id:'',
                  itemsPerPage: 10,
                  currentPage: 1,
                  totalItems: this.productdatos.zs.totalregistros
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

  getdetalle(){
    this.productdatos.getdetalle(this.product.id.toString())    
  }

  grabar(){
    this.productdatos.model = this.fg.value

    this.productdatos.grabar()

    this.dialogre.close(this.productdatos.model)
    
  }
  
  onChangeProductType(event:any){}
  buscar(){}
  cancelar(){
    this.dialogre.close(null)
  }

}

