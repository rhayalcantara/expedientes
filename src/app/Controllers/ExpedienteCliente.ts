import { Injectable, OnInit } from "@angular/core";
import { DatosServiceService } from "../Services/datos-service.service";
import { ExcelService } from "../Services/excel.service";
import { MatDialog } from "@angular/material/dialog";
import { UtilsService } from "../Helpers/utils.service";
import { IExpedienteCliente } from "../Models/expedientes/expedientecliente";
import { Iagenda_sucursalDts } from "../Models/agenda/agenda";

@Injectable({
    providedIn: 'root'
  })
  export class ExpedienteCliente implements OnInit
  {
    rutaapi:string =this.datos.URL+'/api/agenda'
    titulomensage:string='Agenda'
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
        throw new Error("Method not implemented.");
    }
    
    inicializamodeloExpedienteCliente(): IExpedienteCliente {
       return {
            id: 0,
            numerocliente: 0,
            parametro_expedienteid: 0,
            garanteverificado: false,
            agenda_sucursalid: 0,
            verificado: false,
            estadoid: 0,
            observacion: "",
            fecha: new Date,
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