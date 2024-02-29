import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Agenda } from 'src/app/Controllers/Agenda';

import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { DatosServiceService } from 'src/app/Services/datos-service.service';
import { SelecionProcesoComponent } from '../selecion-proceso/selecion-proceso.component';
import { IProceso, IprocesoDts } from 'src/app/Models/Proceso/Proceso';
import { Iagenda_sucursalDts } from 'src/app/Models/agenda/agenda';
import { IZonaSucusal } from 'src/app/Models/Zona/izona';
import { CommonModule, JsonPipe } from '@angular/common';
import { TablesComponent } from '../../tables/tables.component';
import { Izona_sucursaldts } from 'src/app/Models/Zona/izonasucursal';

@Component({
  standalone:true,
  imports:[FormsModule,ReactiveFormsModule,CommonModule,JsonPipe,TablesComponent],  
  selector: 'app-selecion-sucursal-proceso',
  templateUrl: './selecion-sucursal-proceso.component.html',
  styleUrls: ['./selecion-sucursal-proceso.component.css']
})
export class SelecionSucursalProcesoComponent implements OnInit{


  formGroup:FormGroup = new FormGroup({})
  public arramodel:Izona_sucursaldts[]=[]
  public campos:string[]=[]
  public model:Iagenda_sucursalDts={
    sucursal: {
      secuencial: 0,
      nombre: ''
    },
    proceso: {
      id: 0,
      descripcion: ''
    },
    sucursal_nombre: '',
    proceso_nombre: '',
    id: 0,
    agenda_id: 0,
    sucursal_id: 0,
    proceso_id: 0,
    fecha: new Date(),
    estatus_id: 1
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb: FormBuilder,
    private toastr: MatDialog,
    public productdatos:Agenda,
    private dialogre:MatDialogRef<SelecionSucursalProcesoComponent>,
    private Dat:DatosServiceService,
    private ServiceComunicacion:ComunicacionService,) 
    {
      this.formGroup=this.fb.group({});
    }
  ngOnInit(): void {
   this.arramodel = this.data.sucursales
   this.model = this.data.model
   this.campos=Object.keys(this.model);
   this.formGroup= this.Dat.llenarFormGrup(this.model)
   //this.formGroup.controls['fecha'].setValue(this.model.fecha) //.toLocaleDateString().padStart(10, '0')
     
  }

  onChange($event:any) {
    console.log('onchange',$event.target.value)
    let ind = $event.target.value;
    let zs:Izona_sucursaldts = this.arramodel.find(x=>x.id==ind) ?? {
      nombre: '',
      sucursal: {
        secuencial: 0,
        nombre: ''
      },
      id: 0,
      zona_id: 0,
      sucursal_id: 0
    }
    //let jsonObj = JSON.parse($event.target.value); // string to "any" object first
    //let izonasucursal:IZonaSucusal = jsonObj as IZonaSucusal

    this.model.sucursal.secuencial = zs.id
    this.model.sucursal.nombre = zs.nombre  
    this.model.sucursal_nombre=zs.nombre
    this.model.sucursal_id= zs.id

    console.log('cambio la sucursal',this.model)
    }
cancelar() {
  this.dialogre.close(null) 
}
grabar() {
  console.log(this.model)
  if (this.model.sucursal_id==0 || 
      this.model.proceso_id==0 
      ){
      this.Dat.showMessage('Tiene que selecionar una sucursal y un proceso para continuar',
                          'Error Grabando',
                          'error') 
        return
     }
     console.log(this.formGroup.controls['fecha'].value)
    this.model.fecha = this.formGroup.controls['fecha'].value  
    this.dialogre.close(this.model)


}

selecionarProceso() {
  const  dialogRef = this.toastr.open(SelecionProcesoComponent,{
    width: '900px',data:{}
      })
      dialogRef.afterClosed().subscribe((result:IprocesoDts)=>{
        console.log('llego del formulario de Proceso',result)
        this.model.proceso = result as IProceso
        this.model.proceso_id= result.id
        this.model.proceso_nombre = this.model.proceso.descripcion
        //this.productdatos.model.sucursalesprocesos.push(result)
        this.formGroup.controls['proceso_nombre'].setValue(result.descripcion)
        
      }); 
}

  

}
