import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TableResponse } from 'src/app/Helpers/Interfaces';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { DatosServiceService } from 'src/app/Services/datos-service.service';
import { SelecionSucursalProcesoComponent } from '../selecion-sucursal-proceso/selecion-sucursal-proceso.component';
import { SelecionSupervisorComponent } from '../selecion-supervisor/selecion-supervisor.component';
import { Agenda } from 'src/app/Controllers/Agenda';
import { Isupervisor, Isupervisordts } from 'src/app/Models/Supervisor/Isupervisor';
import {  Iagenda_sucursalDts } from 'src/app/Models/agenda/agenda';
import { Supervisores } from 'src/app/Controllers/Supervisores';
import { TablesComponent } from '../../tables/tables.component';

@Component({
  standalone:true,
  imports:[FormsModule,ReactiveFormsModule,CommonModule,JsonPipe,TablesComponent],
  selector: 'app-form-agenda',
  templateUrl: './form-agenda.component.html',
  styleUrls: ['./form-agenda.component.css']
})
export class FormAgendaComponent implements OnInit {
  public formGroup:FormGroup
  arraydatos:Iagenda_sucursalDts[]=[]
  campos:string[]=[]
  camposdetalle: string[] = []
  tituloslocaldetalle: string[]= []
  term: string='';
  config: any;
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb: FormBuilder,
    private toastr: MatDialog,
    public productdatos:Agenda,
    public sup:Supervisores,
    private dialogre:MatDialogRef<FormAgendaComponent>,
    private Dat:DatosServiceService,
    private ServiceComunicacion:ComunicacionService,) 
    {
      this.formGroup=this.fb.group({});
    }
    ngOnInit(): void {
      console.log('llego al formulario',this.data.model)
      this.productdatos.modelo = this.data.model
      this.arraydatos = this.productdatos.modelo.sucursalesProcesos

      console.log('detalle oninit',this.data.model.sucursalesProcesos)

      this.campos=Object.keys(this.productdatos.modelo);
      this.formGroup= this.Dat.llenarFormGrup(this.productdatos.modelo)
      //this.formGroup.controls['fecha'].setValue(this.productdatos.modelo.fecha.toLocaleDateString().padStart(10, '0'))
      
      this.productdatos.TRegistros.subscribe({
       next:(rep:number)=>{
         this.config.totalItems=rep
         this.ServiceComunicacion.enviarMensaje(this.config)
       }       
      })

      this.config = {
      id:'',
       itemsPerPage: 10,
       currentPage: 1,
       totalItems: this.productdatos.totalregistros
     };
      
       
       this.productdatos.tiulosdetalle.map((x:string|any)=>{
         let nx:string = x[Object.keys(x)[0]]
         this.camposdetalle.push(...Object.keys(x))
         this.tituloslocaldetalle.push(nx)
       })
       
     }

actualizaelidtable($event: string) {
  this.config.id=$event
}
paginacambio($event: number) {
  this.config.actualpage = $event
}

opcion(event: TableResponse) {
  console.log(event)
  var elemento:Iagenda_sucursalDts = event.key as (Iagenda_sucursalDts)
  this.productdatos.modelo.sucursalesProcesos.splice(this.productdatos.modelo.sucursalesProcesos.indexOf(elemento),1)

}

agregar() {
  if(this.productdatos.modelo.supervisor.id==0){
    this.Dat.showMessage("Selecione un supervisdor Primero","Selecion","Info")
    return
  }
  let    model:Iagenda_sucursalDts={
    sucursal: {
      secuencial: 0,
      nombre: ''
    },
    proceso: {
      id: 0,
      descripcion: '',
      proceso_Parametros:[]
    },
    sucursal_nombre: '',
    proceso_nombre: '',
    id: 0,
    agenda_id: 0,
    sucursal_id: 0,
    proceso_id: 0,
    fecha: new Date(),
    estatus_id: 1,
    expedienteClientes: []
  }
  
  const  dialogRef = this.toastr.open(SelecionSucursalProcesoComponent,{
    width: '900px',data:{sucursales:this.productdatos.modelo.supervisor.zona.zonaSucursales,
                        model:model
                        }
      })
      dialogRef.afterClosed().subscribe((result:Iagenda_sucursalDts)=>{
        console.log('llego del formulario de producto',result)
        this.arraydatos.push(result)
        //this.productdatos.modelo.sucursalesProcesos.push(result)
        
      }); 
}
selecionarSupervisor() {
  const  dialogRef = this.toastr.open(SelecionSupervisorComponent,{
    width: '900px',data:{}
      })
      dialogRef.afterClosed().subscribe((result:Isupervisordts)=>{
        //console.log('llego del formulario de producto',result)
        this.productdatos.modelo.supervisor=result  
        this.productdatos.modelo.supervisor_id=result.id
        this.productdatos.modelo.supervisor_nombre=result.nombre
        this.formGroup.controls['supervisor_nombre'].setValue(result.nombre)
        
      }); 
}


cancelar() {
  this.dialogre.close(null)
}
grabar() {

  this.productdatos.grabar().then((rep)=>{
    if (rep){

      this.Dat.showMessage('Registro Grabado','Grabando','success')
      this.dialogre.close(this.productdatos.model)
    }
  })
}




}
