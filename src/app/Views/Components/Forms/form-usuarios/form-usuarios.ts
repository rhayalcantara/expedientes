import { Component, OnInit } from '@angular/core';
import { TablesComponent } from '../../tables/tables.component';
import { Usuario } from 'src/app/Controllers/Usuario';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { TableResponse } from 'src/app/Helpers/Interfaces';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
    standalone:true,
    imports:[TablesComponent,FormsModule],
    selector: 'app-form-usuarios',
    templateUrl: './form-usuarios.html',
    styleUrls: ['./form-usuarios.css']
  })

  export class FormUsuariosComponent implements OnInit{
    getdatos() {
        throw new Error('Method not implemented.');
    }

    config:any
    public term: string='';
    public sele:boolean = true
    public campos:string[]=[]
    public tituloslocal:string[]=[]

     constructor(
        public usuario:Usuario,
        private ServiceComunicacion:ComunicacionService,
        private dialogRef: MatDialogRef<FormUsuariosComponent>){

     }
     ngOnInit(): void {
        this.usuario.getdatos()
        this.config = {
            id:'',
             itemsPerPage: 10,
             currentPage: 1,
             totalItems: this.usuario.totalregistros
           };

        this.usuario.TRegistros.subscribe({
         next:(rep:number)=>{
           this.config.totalItems=rep
           this.ServiceComunicacion.enviarMensaje(this.config)
         }
         
        })
    
         this.usuario.titulos.map((x:string|any)=>{
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