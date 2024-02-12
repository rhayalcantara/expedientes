import { Component, OnInit } from '@angular/core';
import { TablesComponent } from '../../tables/tables.component';
import { FormsModule } from '@angular/forms';
import { IParametro } from 'src/app/Models/Proceso/Proceso';
import { Parametro } from 'src/app/Controllers/Parametro';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { MatDialogRef } from '@angular/material/dialog';
import { TableResponse } from 'src/app/Helpers/Interfaces';

@Component({
  standalone:true,
  imports:[TablesComponent,FormsModule],
  selector: 'app-form-parametro-list',
  templateUrl: './form-parametro-list.component.html',
  styleUrls: ['./form-parametro-list.component.css']
})
export class FormParametroListComponent implements OnInit{
  config:any
    public term: string='';
    public sele:boolean = true
    public campos:string[]=[]
    public tituloslocal:string[]=[]
    public arrayoriginal:IParametro[]=[]
    constructor(
      public sucursal:Parametro,
      private ServiceComunicacion:ComunicacionService,
      private dialogRef: MatDialogRef<FormParametroListComponent>){} 
      
      ngOnInit(): void {
        
        this.sucursal.getdatos()
        this.config = {
          id:'',
           itemsPerPage: 10,
           currentPage: 1,
           totalItems: this.sucursal.totalregistros
         };
         this.sucursal.TRegistros.subscribe({
          next:(rep:number)=>{
            this.config.totalItems=rep
            this.ServiceComunicacion.enviarMensaje(this.config)
          }
          
         })
         this.sucursal.titulos.map((x:string|any)=>{
           let nx:string = x[Object.keys(x)[0]]
           this.campos.push(...Object.keys(x))
           this.tituloslocal.push(nx)
         })


       }
       getdatos() {
      
        if (this.term!=''){
          
           this.sucursal.arraymodel = this.sucursal.arraymodel.filter(x=>x.nombre.includes((this.term.toUpperCase())))
        }else{
          this.sucursal.getdatos()
        }
      }
       opcion(event:TableResponse){
            this.dialogRef.close(event.key)
       }
       
       actualizaelidtable(event:string){
        this.config.id=event
       }
       paginacambio(event:any){}

}
