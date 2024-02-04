import { Component,Inject, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IProceso } from 'src/app/Models/Proceso/Proceso';
import { Proceso } from 'src/app/Controllers/Proceso';
import { DatosServiceService } from 'src/app/Services/datos-service.service';
import { TablesComponent } from '../../tables/tables.component';
import { TableResponse } from 'src/app/Helpers/Interfaces';

@Component({
  standalone:true,
  imports:[FormsModule,ReactiveFormsModule,CommonModule,JsonPipe,TablesComponent],
  selector: 'app-form-proceso',
  templateUrl: './form-proceso.component.html',
  styleUrls: ['./form-proceso.component.css']
})
export class FormProcesoComponent implements OnInit {
config: any;
actualizaelidtable($event: string) {
throw new Error('Method not implemented.');
}
paginacambio($event: number) {
throw new Error('Method not implemented.');
}
opcion($event: TableResponse) {
throw new Error('Method not implemented.');
}
agregar() {
throw new Error('Method not implemented.');
}
  fg:FormGroup = new FormGroup({})
  product:IProceso=this.productdatos.model

  campos:string[]=[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb: FormBuilder,
  
    public productdatos:Proceso,
    private dialogre:MatDialogRef<FormProcesoComponent>,
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
