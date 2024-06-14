import { HttpEventType, HttpProgressEvent } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDocumento, IExpedienteCliente } from 'src/app/Models/expedientes/expedientecliente';
import { DatosServiceService } from 'src/app/Services/datos-service.service';

@Component({
  selector: 'app-form-subir-archivo',
  templateUrl: './form-subir-archivo.component.html',
  styleUrls: ['./form-subir-archivo.component.css']
})
export class FormSubirArchivoComponent implements OnInit{
  pporcien:number =0;
  stilo:string="height:24px;width:1%";
  event: HttpProgressEvent = { type: 1, loaded: 0, total: 0 }
  files:any[] = [];
  @ViewChild('file', { static: false })
  fileInput!: ElementRef;
  documentoForm = new FormGroup({
    descripcion: new FormControl('')
  });
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
      private dialogre:MatDialogRef<FormSubirArchivoComponent>,
      private Dat:DatosServiceService,
      ) 
    {}
  ngOnInit(): void {
    this.expedientecliente = this.data.expedientecliente;
  }
  onSubmit(){
    this.upload();
  }
  upload(){
  
    const fileElement = this.fileInput.nativeElement as HTMLInputElement;
    
    if (fileElement.files 
    && fileElement.files.length > 0 
    && this.documentoForm.controls['descripcion'].value != null) {
      
      for (let index = 0; index < fileElement.files.length; index++){
        const file = fileElement.files[index];  
          
        this.Dat.Uploadfile(file,
            this.expedientecliente.id.toString(),
            this.documentoForm.controls['descripcion'].value)
            .subscribe({ next:event =>{
                  
          switch (event.type) {
              case HttpEventType.Response:
                console.log('Termino',event.body.filePath);
                this.Dat.showMessage('Archivo subido correctamente','Correcto','success')
                let d1:IDocumento={
                  id: 0,
                  nombreinterno: event.body.filePath,
                  nombrearchivo: file.name,
                  descripcion: this.documentoForm.controls['descripcion'].value!,
                }
                this.dialogre.close(d1)
                return
              case HttpEventType.UploadProgress:
                
                this.pporcien = Math.round(100 * event.loaded / (event.total ?? 1))
                this.stilo=`background-color: #4CAF50!important;height:24px;width:${this.pporcien }%`
                console.log('Subiendo',event,this.pporcien);
                return

          }

        },error:(err:Error)=>{
          this.Dat.showMessage('Error al subir archivo:'+err.message,'Error','error')
        }});
      }   
    }else{
      this.Dat.showMessage('Debe seleccionar un archivo y descripción','Verificar','error')
    }
  }
}
