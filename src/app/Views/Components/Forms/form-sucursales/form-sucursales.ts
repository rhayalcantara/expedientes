import { Component, OnInit } from '@angular/core';
import { TablesComponent } from '../../tables/tables.component';
import { Sucursal } from 'src/app/Controllers/Sucursal';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { TableResponse } from 'src/app/Helpers/Interfaces';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Isucursal } from 'src/app/Models/Sucursal/Isucursal';

@Component({
    standalone:true,
    imports:[TablesComponent,FormsModule],
    selector: 'app-form-sucursales',
    templateUrl: './form-sucursales.html',
    styleUrls: ['./form-sucursales.css']
  })

  export class FormSucursalesComponent implements OnInit{
    getdatos() {
      
      if (this.term!=''){
        
         this.sucursal.arraymodel = this.sucursal.arraymodel.filter(x=>x.nombre.includes((this.term.toUpperCase())))
      }else{
        this.sucursal.getdatos()
      }
    }

    config:any
    public term: string='';
    public sele:boolean = true
    public campos:string[]=[]
    public tituloslocal:string[]=[]
    public arrayoriginal:Isucursal[]=[]

     constructor(
        public sucursal:Sucursal,
        private ServiceComunicacion:ComunicacionService,
        private dialogRef: MatDialogRef<FormSucursalesComponent>){

     }
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

       opcion(event:TableResponse){
            this.dialogRef.close(event.key)
       }
       
       actualizaelidtable(event:string){
        this.config.id=event
       }
       paginacambio(event:any){}
  }