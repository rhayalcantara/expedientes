import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { DatosServiceService } from 'src/app/Services/datos-service.service';

@Component({
  selector: 'app-form-expediente-cliente',
  templateUrl: './form-expediente-cliente.component.html',
  styleUrls: ['./form-expediente-cliente.component.css']
})
export class FormExpedienteClienteComponent {
  formGroup: FormGroup


  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb: FormBuilder,
    private toastr: MatDialog,        
    private dialogre:MatDialogRef<FormExpedienteClienteComponent>,
    private Dat:DatosServiceService,
    private ServiceComunicacion:ComunicacionService,) 
    {
      this.formGroup=this.fb.group({});
    }

}
