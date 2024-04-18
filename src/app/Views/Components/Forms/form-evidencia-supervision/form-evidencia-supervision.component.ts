import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ExpedienteCliente } from 'src/app/Controllers/ExpedienteCliente';
import { TableResponse } from 'src/app/Helpers/Interfaces';
import { IExpedienteCliente } from 'src/app/Models/expedientes/expedientecliente';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { DatosServiceService } from 'src/app/Services/datos-service.service';

@Component({
  selector: 'app-form-evidencia-supervision',
  templateUrl: './form-evidencia-supervision.component.html',
  styleUrls: ['./form-evidencia-supervision.component.css']
})
export class FormEvidenciaSupervisionComponent {
campos: string[] =[];
tituloslocal: string[] =[];
term: string="";
totalregistros: number=0;
actualpage: number=1;
config: any;


  expedientecliente:IExpedienteCliente ={
    id: 0,
    clientesecuencial: 0,
    parametro_expedienteid: 0,
    garanteverificado: false,
    agenda_sucursalid: 0,
    verificado: false,
    estadoid: 0,
    observacion: '',
    fecha:  new Date(),
    cliente: {
      secuencial: 0,
      numerocliente: 0,
      nombreunido: '',
      identificacion: '',
      secuencialoficina: 0
    },
    nombreparametro: '',
    documentosExpedientes: []
  } 
  constructor(    
  @Inject(MAT_DIALOG_DATA) public data:any,      
    private dialogre:MatDialogRef<FormEvidenciaSupervisionComponent>,
    private Dat:DatosServiceService,
    private ServiceComunicacion:ComunicacionService,
    private toastr: MatDialog) 
  {}
  expedienteClienteForm = new FormGroup({
    observacion: new FormControl(''),
    documentosExpedientes: new FormControl('')
  });
  onSubmit(): void {
    // Aquí puedes manejar la presentación de los datos del formulario
    console.log(this.expedienteClienteForm.value);
  }
  paginacambio($event: number) {
    throw new Error('Method not implemented.');
    }
    actualizaelidtable($event: string) {
    throw new Error('Method not implemented.');
    }
    opcion($event: TableResponse) {
    throw new Error('Method not implemented.');
    }
}
