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
  campos: string[] = [];
  tituloslocal: string[] = [];
  term: string = "";
  totalregistros: number = 0;
  actualpage: number = 1;
  config: any;
  pporcien: number = 0;
  stilo: string = "height:24px;width:1%";
  event: HttpProgressEvent = { type: 1, loaded: 0, total: 0 }
  files: any[] = [];
  @ViewChild('file', { static: false })
  fileInput!: ElementRef;

  expedientecliente: IExpedienteCliente = {
    id: 0,
    clientesecuencial: 0,
    parametro_expedienteid: 0,
    garanteverificado: false,
    agenda_sucursalid: 0,
    verificado: false,
    estadoid: 0,
    observacion: '',
    fecha: new Date(),
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

  public docu: IDocumento[] = []
  public docux: IDocumento = {
    id: 0,
    nombreinterno: '',
    nombrearchivo: '',
    descripcion: ''
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialogre: MatDialogRef<FormEvidenciaSupervisionComponent>,
    private Dat: DatosServiceService,
    private ServiceComunicacion: ComunicacionService,
    private toastr: MatDialog) { }
  expedienteClienteForm = new FormGroup({
    observacion: new FormControl(''),
    documentosExpedientes: new FormControl('')
  });
 
  ngOnInit(): void {
    this.expedientecliente = this.data.expedientecliente
    this.expedientecliente.documentosExpedientes.map((x: IDocumentoExpediente) => {
      this.docu.push(x.documento!)
    });
    this.campos = ['nombrearchivo', 'descripcion'];
    this.tituloslocal = ['Nombre Archivo', 'Descripcion'];

    this.expedienteClienteForm.controls['observacion'].setValue(this.expedientecliente.observacion)
    
    this.config = {
      id: '',
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.expedientecliente.documentosExpedientes.length
    };

  }

  agregarDocumento() {
    const dialogRef = this.toastr.open(FormSubirArchivoComponent, { width: "85%", height: "40%", data: { expedientecliente: this.expedientecliente } });
    dialogRef.afterClosed().subscribe(result => {

      if (result != null) {
        let docexp: IDocumentoExpediente = {
          id: 0,
          documentoid: result.id,
          expedienteclienteid: this.expedientecliente.id          
        }
        this.expedientecliente.documentosExpedientes.push(docexp)
        this.docu.push(result)
        this.config.totalItems = this.docu.length
      }
    });
  }
  grabar() 
  { 
    // verificar que la observacion no este vacia
    if (this.expedienteClienteForm.controls['observacion'].value == "") {
      this.Dat.showMessage("La observacion no puede estar vacia", "Error","error")
      return
    }
    this.expedientecliente.observacion = this.expedienteClienteForm.controls['observacion'].value!
    this.dialogre.close(this.expedientecliente)
  }


  paginacambio(event: number) {
    this.config.actualpage = event
  }
  actualizaelidtable(event: string) {
    this.config.id = event
  }

  opcion(event: TableResponse) {
    this.docux = event.key as IDocumento
    console.log(event.option)
    switch (event.option) {
      case "del":
        // remueve event.key del docux
        this.docu = this.docu.filter((x: IDocumento) => 
          (x.nombreinterno !== this.docux.nombreinterno) &&
          (x.nombrearchivo !== this.docux.nombrearchivo)) 
        this.config.totalItems = this.docu.length        
        break;
      case "edit":
        this.Dat.getdocumentofile(this.docux.id).subscribe({
          next: (rep: any) => {       
            this.downloadFile(rep, event.key)
          }
        })
        break;
      
    }
    
    
  }
  private downloadFile(data: any, doc: any) {
    const downloadedFile = data;
    console.log(URL.createObjectURL(downloadedFile));
    const dialogRef = this.toastr.open(VisorpdfComponent, { width: "85%", height: "70%", data: { url: URL.createObjectURL(downloadedFile) } });

  }

}
