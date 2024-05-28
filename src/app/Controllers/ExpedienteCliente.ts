import { Injectable, OnInit } from "@angular/core";
import { DatosServiceService } from "../Services/datos-service.service";
import { ExcelService } from "../Services/excel.service";
import { MatDialog } from "@angular/material/dialog";
import { UtilsService } from "../Helpers/utils.service";
import { IExpedienteCliente } from "../Models/expedientes/expedientecliente";
import { Iagenda_sucursalDts } from "../Models/agenda/agenda";
import { ModelResponse } from "../Models/Usuario/modelResponse";

@Injectable({
    providedIn: 'root'
  })
  export class ExpedienteCliente implements OnInit
  {
    rutaapi:string =this.datos.URL+'/api/ExpedienteClientes/'
    titulomensage:string='ExpedienteCliente'
    public modelExpedienteCliente:IExpedienteCliente
    public modelagendasucursal:Iagenda_sucursalDts
    public  titulos=[
        {verificado:'Cliente'},
        {garanteverificado:'Garante'}
    ]
    constructor(
        private datos:DatosServiceService,
        private excel:ExcelService,
        private toastr: MatDialog,  
        private tool:UtilsService               
       ){
        this.modelExpedienteCliente=this.inicializamodeloExpedienteCliente()
        this.modelagendasucursal=this.inicializamodeloagandasucursal()
       }

    ngOnInit(): void {
        //throw new Error("Method not implemented.");
    }
    GenerarCliente(cantcli:number){
        //creaexpediente?agenda_sucursalid=1&cantexp=10
       // this.datos.getdatos<ModelResponse>(this.rutaapi+`creaexpediente?agenda_sucursalid=${this.modelagendasucursal.id}&cantexp=${cantcli}`)
       // .subscribe({next:(res)=>{
    }
    inicializamodeloExpedienteCliente(): IExpedienteCliente {
       return {
            id: 0,
            nombreparametro: "",
            clientesecuencial: 0,
            parametro_expedienteid: 0,
            garanteverificado: false,
            agenda_sucursalid: 0,
            verificado: false,
            estadoid: 0,
            observacion: "",
            fecha: new Date,
            cliente:{
                secuencial: 0,
                numerocliente: 0,
                nombreunido: "",
                identificacion: "",
                secuencialoficina: 0
            },
            documentosExpedientes: []
        }
    }
    inicializamodeloagandasucursal():Iagenda_sucursalDts{
        return {
            sucursal: undefined,
            proceso: undefined,
            sucursal_nombre: "",
            proceso_nombre: "",
            id: 0,
            agenda_id: 0,
            sucursal_id: 0,
            proceso_id: 0,
            fecha: new Date,
            estatus_id: 0,
            expedienteClientes: []
        }
    }
  }