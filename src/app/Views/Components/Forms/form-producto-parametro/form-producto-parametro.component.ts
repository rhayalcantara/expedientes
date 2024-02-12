import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DatosServiceService } from 'src/app/Services/datos-service.service';
import { FormProduct2Component } from '../form-product2/form-product2.component';
import { FormProductoListComponent } from '../form-producto_list/form-producto_list';
import { IProduct } from 'src/app/Models/Product/IProduct';
import { IParametro, IprocesoparametroDts } from 'src/app/Models/Proceso/Proceso';
import { FormParametroComponent } from '../form-parametro/form-parametro.component';
import { FormParametroListComponent } from '../form-parametro-list/form-parametro-list.component';
@Component({
  standalone:true,
  imports:[FormsModule,ReactiveFormsModule,CommonModule,],
  selector: 'app-form-producto-parametro',
  templateUrl: './form-producto-parametro.component.html',
  styleUrls: ['./form-producto-parametro.component.css']
})
export class FormProductoParametroComponent implements OnInit{
formGroup: FormGroup = new FormGroup({})
procpara:IprocesoparametroDts={
  id: 0,
  proceso: {
    id: 0,
    descripcion: ''
  },
  producto: {
    id: 0,
    nombre: ''
  },
  parametro: {
    id: 0,
    nombre: '',
    sg: false
  },
  proceso_nombre: '',
  producto_nombre: '',
  parametro_nombre: '',
  proceso_id: 0,
  productos_id: 0,
  parametro_expediente_id: 0
}
public campos:string[]=[];
constructor(
  @Inject(MAT_DIALOG_DATA) public data:any,
  private fb: FormBuilder,
  private toastr: MatDialog,
  private dialogre:MatDialogRef<FormProductoParametroComponent>,
  private Dat:DatosServiceService) {
  this.formGroup=this.fb.group({});
 }
  ngOnInit(): void {
    this.procpara=this.data.procpara    
    this.formGroup= this.Dat.llenarFormGrup(this.procpara)
  }


cancelar() {
  this.dialogre.close(null)
}
grabar() {
  if(this.procpara.productos_id ===0 || this.procpara.parametro_expediente_id=== 0 ){
    this.Dat.showMessage('Favor Selecione el producto y el parametro','Selecion','error')
  }
  this.dialogre.close(this.procpara)
}
buscarParametro() {
  const  dialogRef = this.toastr.open(FormParametroListComponent,{
    width: '900px',data:{}
      })
      dialogRef.afterClosed().subscribe({
        next:(prod:IParametro)=>{
          this.procpara.parametro = prod
          this.procpara.parametro_nombre = prod.nombre
          this.procpara.parametro_expediente_id = prod.id
          this.formGroup.controls['parametro_nombre'].setValue(prod.nombre)
          console.log(this.procpara)
        }
      })
}
buscarProducto() {
  const  dialogRef = this.toastr.open(FormProductoListComponent,{
    width: '900px',data:{}
      })
      dialogRef.afterClosed().subscribe({
        next:(prod:IProduct)=>{
          this.procpara.producto = prod
          this.procpara.producto_nombre = prod.nombre
          this.procpara.productos_id = prod.id
          this.formGroup.controls['producto_nombre'].setValue(prod.nombre)
          console.log(this.procpara)
        }
      })
}

}
