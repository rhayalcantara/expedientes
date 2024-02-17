import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TableResponse } from 'src/app/Helpers/Interfaces';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { DatosServiceService } from 'src/app/Services/datos-service.service';
import { SelecionSucursalProcesoComponent } from '../selecion-sucursal-proceso/selecion-sucursal-proceso.component';
import { SelecionSupervisorComponent } from '../selecion-supervisor/selecion-supervisor.component';

@Component({
  selector: 'app-form-agenda',
  templateUrl: './form-agenda.component.html',
  styleUrls: ['./form-agenda.component.css']
})
export class FormAgendaComponent {
  formGroup:FormGroup = new FormGroup({})
  camposdetalle: string[] = ['Sucursal','Proceso','Fecha Agenda','Fecha Realizada'];
  tituloslocaldetalle: string[]= ['Sucursal','Proceso','Fecha Agenda','Fecha Realizada'];
  term: string='';
  config: any;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb: FormBuilder,
    private toastr: MatDialog,

    private dialogre:MatDialogRef<FormAgendaComponent>,
    private Dat:DatosServiceService,
    private ServiceComunicacion:ComunicacionService,) 
    {
      this.formGroup=this.fb.group({});
    }


actualizaelidtable($event: string) {
  this.config.id=$event
}
paginacambio($event: number) {
  this.config.actualpage = $event
}
opcion($event: TableResponse) {
  throw new Error('Method not implemented.');
}
productdatos:[]=[];
agregar() {
  const  dialogRef = this.toastr.open(SelecionSucursalProcesoComponent,{
    width: '900px',data:{}
      })
}
selecionarSupervisor() {
  const  dialogRef = this.toastr.open(SelecionSupervisorComponent,{
    width: '900px',data:{}
      })
}

onChange($event: Event) {
throw new Error('Method not implemented.');
}

selecionarcurso() {
throw new Error('Method not implemented.');
}
selecionaralumno() {
throw new Error('Method not implemented.');
}
cancelar() {
  this.dialogre.close(null)
}
grabar() {
throw new Error('Method not implemented.');
}
buscarmodal() {
throw new Error('Method not implemented.');
}
abrirmodal() {
throw new Error('Method not implemented.');
}



}
