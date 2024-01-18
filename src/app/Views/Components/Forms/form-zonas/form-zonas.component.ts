import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Zona } from 'src/app/Controllers/Zona';
import { IZona } from 'src/app/Models/Zona/izona';
import { DatosServiceService } from 'src/app/Services/datos-service.service';

@Component({
  selector: 'app-form-zonas',
  templateUrl: './form-zonas.component.html',
  styleUrls: ['./form-zonas.component.css']
})
export class FormZonasComponent implements  OnInit {
  
  fg:FormGroup = new FormGroup({})

  product:IZona=this.productdatos.model

  campos:string[]=[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb: FormBuilder,
  
    public productdatos:Zona,
    private dialogre:MatDialogRef<FormZonasComponent>,
    private Dat:DatosServiceService) {
    this.fg=this.fb.group({});
   }

   get Descripcion(){return this.fg.get('descripcion');}
   
  ngOnInit(): void {
    console.log('formulario',this.data.model)
    this.product = this.data.model
 
    this.campos=Object.keys(this.product);
    this.fg= this.Dat.llenarFormGrup(this.product)
  }

  grabar(){
    this.productdatos.model = this.fg.value

    this.productdatos.grabar()

    this.dialogre.close(this.productdatos.model)
    
  }
  
  onChangeProductType(event:any){}
  buscar(){}
  cancelar(){
    this.dialogre.close(null)
  }

}

