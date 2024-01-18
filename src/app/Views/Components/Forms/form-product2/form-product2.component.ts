import { CommonModule, JsonPipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/Controllers/Product';

import { IProduct } from 'src/app/Models/Product/IProduct';


import { DatosServiceService } from 'src/app/Services/datos-service.service';

@Component({
  standalone:true,
  imports:[FormsModule,ReactiveFormsModule,CommonModule,JsonPipe],
  selector: 'app-form-product2',
  templateUrl: './form-product2.component.html',
  styleUrls: ['./form-product2.component.css']
})
export class FormProduct2Component implements OnInit {
  
  fg:FormGroup = new FormGroup({})

  product:IProduct=this.productdatos.model

  campos:string[]=[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb: FormBuilder,
  
    public productdatos:Product,
    private dialogre:MatDialogRef<FormProduct2Component>,
    private Dat:DatosServiceService) {
    this.fg=this.fb.group({});
   }

   get nombre(){return this.fg.get('nombre');}
   get tproducto(){
    let objeto= this.fg.get('product_typeid')
    if(objeto?.value == 'Selecione un Tipo'||
       objeto?.value ==''
    ){
      objeto.setErrors({
        notUnique: true
      })
    }
    return this.fg.get('product_typeid')
  }
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
