import { Component,Inject, OnInit  } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/Controllers/Product';

import { IProduct } from 'src/app/Models/Product/IProduct';


import { DatosServiceService } from 'src/app/Services/datos-service.service';
import { IParametro } from 'src/app/Models/Proceso/Proceso';
import { Parametro } from 'src/app/Controllers/Parametro';


@Component({
  standalone:true,
  imports:[FormsModule,ReactiveFormsModule,CommonModule,JsonPipe],
  selector: 'app-form-parametro',
  templateUrl: './form-parametro.component.html',
  styleUrls: ['./form-parametro.component.css']
})
export class FormParametroComponent implements OnInit  {



  fg:FormGroup = new FormGroup({})

  product:IParametro=this.productdatos.model

  campos:string[]=[];
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb: FormBuilder,
  
    public productdatos:Parametro,
    private dialogre:MatDialogRef<FormParametroComponent>,
    private Dat:DatosServiceService) {
    this.fg=this.fb.group({});
   }

   get nombre(){return this.fg.get('nombre');}

   ngOnInit(): void {
    console.log('formulario',this.data.model)
    this.product = this.data.model
 
    this.campos=Object.keys(this.product);
    this.fg= this.Dat.llenarFormGrup(this.product)
  }

  grabar(){
    this.productdatos.model.id = this.product.id
    this.productdatos.model.nombre = this.fg.controls['nombre'].value
    this.productdatos.model.sg = this.product.sg
    console.log('se envia a grabar ',this.productdatos.model)
    this.productdatos.grabar()

    this.dialogre.close(this.productdatos.model)
    
  }
  
  
  buscar(){}
  cancelar(){
    this.dialogre.close(null)
  }
  excel() {
  throw new Error('Method not implemented.');
  }

}
