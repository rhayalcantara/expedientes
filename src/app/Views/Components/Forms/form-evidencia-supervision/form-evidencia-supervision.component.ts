import { HttpEventType, HttpProgressEvent } from '@angular/common/http';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ExpedienteCliente } from 'src/app/Controllers/ExpedienteCliente';
import { TableResponse } from 'src/app/Helpers/Interfaces';
import { IDocumento, IDocumentoExpediente, IExpedienteCliente } from 'src/app/Models/expedientes/expedientecliente';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { DatosServiceService } from 'src/app/Services/datos-service.service';
import { VisorpdfComponent } from '../../visorpdf/visorpdf.component';
import { FormSubirArchivoComponent } from '../form-subir-archivo/form-subir-archivo.component';

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
pporcien:number =0;
stilo:string="height:24px;width:1%";
event: HttpProgressEvent = { type: 1, loaded: 0, total: 0 }
files:any[] = [];

  @ViewChild('file', { static: false })
  fileInput!: ElementRef;
 

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
 
  public docu:IDocumento[] = []
  public docux:IDocumento={
    id: 0,
    nombreinterno: '',
    nombrearchivo: '',
    descripcion: ''
  }
  constructor(    
  @Inject(MAT_DIALOG_DATA) public data:any, 
    private fb: FormBuilder,     
    private dialogre:MatDialogRef<FormEvidenciaSupervisionComponent>,
    private Dat:DatosServiceService,
    private ServiceComunicacion:ComunicacionService,
    private toastr: MatDialog) 
  {}
  expedienteClienteForm = new FormGroup({
    observacion: new FormControl(''),
    documentosExpedientes: new FormControl('')
  });
  documentoForm = new FormGroup({
    descripcion: new FormControl('')
  });
  ngOnInit(): void {
   
    this.expedientecliente = this.data.expedientecliente
    // console.log('el expediente que llego',this.expedientecliente.documentosExpedientes)

     this.expedientecliente.documentosExpedientes.map((x:IDocumentoExpediente)=>{ 
      this.docu.push(x.documento)
    });
    this.campos=['nombrearchivo','descripcion'];    
    this.tituloslocal=['Nombre Archivo','Descripcion'];
    //console.log('docu',this.docu)
    this.expedienteClienteForm.controls['observacion'].setValue(this.expedientecliente.observacion)
    this.documentoForm.controls['descripcion'].setValue(this.docux.descripcion)
  
    this.config = {
              id:'',
              itemsPerPage: 10,
              currentPage: 1,
              totalItems: this.expedientecliente.documentosExpedientes.length
            };

  
    
}
agregarDocumento(){
  const dialogRef = this.toastr.open(FormSubirArchivoComponent,{width:"85%" ,height:"40%" ,data:{expedientecliente:this.expedientecliente}});
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    if(result != null){
        this.docu.push(result)
        this.config.totalItems = this.docu.length
      }
    });
}
grabar(){}
  onSubmit(): void {
    // Aquí puedes manejar la presentación de los datos del formulario
    console.log(this.expedienteClienteForm.value);
    this.upload();
  }

  paginacambio(event: number) {
    this.config.actualpage = event
    }
  actualizaelidtable(event: string) {
      this.config.id=event
    }

    opcion(event: TableResponse) {
      this.docux = event.key as IDocumento
      
      this.documentoForm.controls['descripcion'].setValue(this.docux.descripcion)
      this.Dat.getdocumentofile(this.docux.id).subscribe({
        next:(rep:any)=>{
          console.log('descargando',rep)
          this.downloadFile(rep,event.key)
        }
      })
    }
  private downloadFile(data:any,doc:any) {
      const downloadedFile = data;
      console.log(URL.createObjectURL(downloadedFile));
      const dialogRef = this.toastr.open(VisorpdfComponent,{width:"85%" ,height:"70%" ,data:{url:URL.createObjectURL(downloadedFile)}});
     
  }


    upload(){
      console.log(this.fileInput)
      const fileElement = this.fileInput.nativeElement as HTMLInputElement;
      //document.querySelector('input[type="file"]') as HTMLInputElement;
      //
      
      if (fileElement.files 
      && fileElement.files.length > 0 
      && this.documentoForm.controls['descripcion'].value != null) {
        
        for (let index = 0; index < fileElement.files.length; index++){
          const file = fileElement.files[index];  
            
          this.Dat.Uploadfile(file,this.expedientecliente.id.toString(),this.documentoForm.controls['descripcion'].value).subscribe({ next:event =>{
           // console.log('Subiendo',rep.constructor.name,rep);
           console.log('Subiendo',event)
            switch (event.type) {
                case HttpEventType.Response:
                  console.log('Termino',event.body.filePath);
                  /*this.docux.nombrearchivo = event.body.filePath
                  if(this.documentoForm.controls['descripcion'].value != '' 
                  && this.documentoForm.controls['descripcion'].value != null){
                    this.docux.descripcion = this.documentoForm.controls['descripcion'].value
                  }
                  this.docux.nombreinterno = file.name
                  this.docu.push(this.docux)
                  
                  this.expedientecliente.documentosExpedientes.push(
                    {
                      id: 0,
                      documentoid: this.docux.id,
                      expedienteclienteid: this.expedientecliente.id,
                      expedientecliente: this.expedientecliente,
                      documento: this.docux
                    })*/
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
