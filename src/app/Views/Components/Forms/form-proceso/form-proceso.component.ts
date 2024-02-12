import { Component,Inject, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {  IProceso, IprocesoDts, IprocesoparametroDts } from 'src/app/Models/Proceso/Proceso';
import { DatosServiceService } from 'src/app/Services/datos-service.service';
import { TablesComponent } from '../../tables/tables.component';
import { TableResponse } from 'src/app/Helpers/Interfaces';
import { FormParametroListComponent } from '../form-parametro-list/form-parametro-list.component';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import {  ProcesoParametros } from 'src/app/Controllers/ProcesoParametro';
import { FormProductoParametroComponent } from '../form-producto-parametro/form-producto-parametro.component';

@Component({
  standalone:true,
  imports:[FormsModule,ReactiveFormsModule,CommonModule,JsonPipe,TablesComponent],
  selector: 'app-form-proceso',
  templateUrl: './form-proceso.component.html',
  styleUrls: ['./form-proceso.component.css']
})
export class FormProcesoComponent implements OnInit {
  config: any;
  fg:FormGroup = new FormGroup({})
  product:IprocesoDts=this.productdatos.model

  campos:string[]=[];
  public camposdetalle: string[]=[];
  public tituloslocaldetalle: string[]=[];
  public arraydatos:IprocesoparametroDts[]=[]
  public totalregistros: number=0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb: FormBuilder,
    private toastr: MatDialog,
    public productdatos:ProcesoParametros,
    private dialogre:MatDialogRef<FormProcesoComponent>,
    private Dat:DatosServiceService,
    private ServiceComunicacion:ComunicacionService) {
    this.fg=this.fb.group({});
   }

   get nombre(){return this.fg.get('nombre');}

  ngOnInit(): void {
    console.log('formulario',this.data.model)
    this.product = this.data.model 
    this.productdatos.model = this.data.model

    //enc
    this.campos=Object.keys(this.product);
    this.fg= this.Dat.llenarFormGrup(this.product)
 
    //detalle
    
    this.productdatos.titulodetalle.map((x:string|any)=>{
      let nx:string = x[Object.keys(x)[0]]      
      this.camposdetalle.push(...Object.keys(x))      
      this.tituloslocaldetalle.push(nx)
    }) 
    console.log(this.productdatos.model)
    this.config = {
              id:'',
              itemsPerPage: 10,
              currentPage: 1,
              totalItems: this.productdatos.model.proceso_Parametros.length
            };

    this.productdatos.TRegistros.subscribe({
      next:(rep:number)=>{
        this.config.totalItems=rep
        this.ServiceComunicacion.enviarMensaje(this.config)
      }
      
    })
   
  }

  grabar(){
    this.productdatos.model.descripcion = this.fg.controls['descripcion'].value
    console.log('se envio a grabar',this.productdatos)

    this.productdatos.grabar().then(e=>{
      if(e==true){
        
        this.Dat.showMessage('Registro Grabado','Proceso','sucess')
      }else{
        this.Dat.showMessage('Error Grabando '+this.productdatos.error,'Proceso','error')
      }
    })

    this.dialogre.close(this.productdatos.model)
    
  }
  agregar() {
    let procpara:IprocesoparametroDts={
      id: 0,
      proceso: {
        id: this.productdatos.model.id,
        descripcion: this.productdatos.model.descripcion
      },
      producto: {
        id: 0,
        nombre: ''
      },
      parametro: {
        id: 0,
        nombre: '',
        sg: false
      },
      proceso_nombre: this.productdatos.model.descripcion,
      producto_nombre: '',
      parametro_nombre: '',
      proceso_id: this.productdatos.model.id,
      productos_id: 0,
      parametro_expediente_id: 0
    }
    const  dialogRef = this.toastr.open(FormProductoParametroComponent,{
      width: '900px',data:{procpara:procpara}
        })
        
        dialogRef.afterClosed().subscribe((result:IprocesoparametroDts)=>{
          // verificar si existe en la lista actual
          
          if(this.productdatos.arraymodel.find(r=>r.productos_id===result.productos_id && r.parametro_expediente_id===result.parametro_expediente_id)){
            this.Dat.showMessage("Producto-Parametro existe en el listado, Favor Verificar","Existe","error")
          }else{
            
            this.productdatos.model.proceso_Parametros.push(result)
            console.log(this.productdatos)
          }
        })
        
  }
  actualizaelidtable($event: string) {
    
    this.config.id = $event
    console.log('se actualizo',this.config)
    }
    paginacambio($event: number) {
      this.config.actualpage = $event
    }
    opcion($event: TableResponse) {
      console.log($event)
  var elemento:IprocesoparametroDts = $event.key as (IprocesoparametroDts)
  this.productdatos.model.proceso_Parametros.splice(this.productdatos.model.proceso_Parametros.indexOf(elemento),1)

    }
  onChangeProductType(event:any){}
  buscar(){}
  cancelar(){
    this.dialogre.close(null)
  }
}
