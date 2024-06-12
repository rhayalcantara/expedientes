import { EventEmitter, Injectable, OnInit, Output } from "@angular/core";
import { DatosServiceService } from "../Services/datos-service.service";
import { IDocumento } from "../Models/expedientes/expedientecliente";
@Injectable({
    providedIn: 'root'
  })
export class Documento implements OnInit{

    rutaapi:string =this.datos.URL+'/api/Documentoes'
    public model:IDocumento=this.inicializamodelo()
    public titulos=
    [{nombrearchiso:'Nombre Archivo'},
    {descripcion:'Descripcion'}]
    public totalregistros:number=0
    public actualpage:number=1
    public pagesize:number=10
    public filtro:string=''
    public arraymodel:IDocumento[]=[]

    constructor(private datos:DatosServiceService){}
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
    inicializamodelo():IDocumento{
        return {
            id: 0,
            nombreinterno: '',
            nombrearchivo: '',
            descripcion: ''
        }
    }
    public get(id:string){
        return this.datos.getbyid<IDocumento>(`${this.rutaapi}/files/${id}`)
    }
}