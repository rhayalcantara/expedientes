import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Agenda } from 'src/app/Controllers/Agenda';
import { MiObjeto } from 'src/app/Helpers/Interfaces';
import { Iagenda_sucursalDts, Iagendadetallesuper } from 'src/app/Models/agenda/agenda';
import { IExpedienteCliente } from 'src/app/Models/expedientes/expedientecliente';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { DatosServiceService } from 'src/app/Services/datos-service.service';
import { FormEvidenciaSupervisionComponent } from '../form-evidencia-supervision/form-evidencia-supervision.component';

@Component({
  selector: 'app-form-expediente-cliente',
  templateUrl: './form-expediente-cliente.component.html',
  styleUrls: ['./form-expediente-cliente.component.css']
})
export class FormExpedienteClienteComponent implements OnInit {
  formGroup: FormGroup
  
  model:Iagendadetallesuper={
    id: 0,
    agenda_id: 0,
    sucursal_id: 0,
    sucursal: '',
    proceso_id: 0,
    proceso: '',
    supervisor: '',
    cantidaddeclientes: 0
  }

auto: string="80%";



 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb: FormBuilder,
    public agenda:Agenda,
    private toastr: MatDialog,        
    private dialogre:MatDialogRef<FormExpedienteClienteComponent>,
    private Dat:DatosServiceService,
    private ServiceComunicacion:ComunicacionService,
    ) 
    {
      this.formGroup=this.fb.group({});
    }
  ngOnInit(): void {
    //console.log('llego la data',this.data)
    this.model = this.data.model
    this.agenda.campos=[]
    this.agenda.fields=[]
    this.agenda.TRegistros.subscribe({
      next:(rep:number)=>{
        this.auto=this.agenda.ancho
      }       
     })
    this.agenda.getagendasucursa(this.model.id)
    //console.log(this.auto,this.agenda.ancho)
    this.formGroup= this.Dat.llenarFormGrup(this.model)
     
  }
  generaexpedientecliente() {
    if (this.formGroup.controls['cantidaddeclientes'].value==0){
      this.Dat.showMessage('Debe ingresar la cantidad de clientes a generar', 'Generar expediente cliente', 'error')
      return
    }
    this.agenda.generarexpedientecliente(this.formGroup.controls['cantidaddeclientes'].value)
  }
  opcion(_t63: any,arg1: string) {
    throw new Error('Method not implemented.');
  }

  incluirEvidencia(arg0: string,campo: MiObjeto,d: string) {
    let id = arg0.split(',')[1]
    //encontar el expedientecliente 
    let x:IExpedienteCliente | undefined = this.agenda.modeloagendasucursal.expedienteClientes.find(x=>x.id==+id)
    // llama a FormEvidenciaSupervisionComponent
    const  dialogRef = this.toastr.open(FormEvidenciaSupervisionComponent,{
      width: '900px',data:{expedientecliente:x,nombrecampo:d}})   
    dialogRef.afterClosed().subscribe((result)=>{
      //actualiza los datos del expedientecliente
      if (result!=null) {
        x=result
      }
        
      
    })

  }
  cambiarestado(arg0: string,campo:MiObjeto,d:string) {
        this.auto = this.agenda.ancho
       // let estado = arg0.split(',')[0]
        let id = arg0.split(',')[1]
        //encontar el expedientecliente 
        let x:IExpedienteCliente | undefined = this.agenda.modeloagendasucursal.expedienteClientes.find(x=>x.id==+id)
        console.log({"id":id,"x":x,"d":d}) 
        if (x!=undefined){
          x.verificado = !x.verificado
          campo[d]= x.verificado.toString()+","+id
        }
        
    }
  cancelar() {

    this.dialogre.close()
    }
    grabar() {
    throw new Error('Method not implemented.');
    }
}
