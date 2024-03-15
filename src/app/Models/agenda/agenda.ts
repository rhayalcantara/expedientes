import { IProceso } from "../Proceso/Proceso"
import { Isucursal } from "../Sucursal/Isucursal"
import {  Isupervisordts } from "../Supervisor/Isupervisor"
import { Iestatus } from "../estatus/estatus"
import { IExpedienteCliente } from "../expedientes/expedientecliente"


export interface Iagenda{
    id:number
    supervisor_id:number
    fecha:Date
    estatus_id:number
}

export interface IagendaCreacion {
  id: number;
  supervisor_id: number;
  fecha: Date;
  estatus_id: number;
  sucursalesProcesos: Iagenda_sucursal[];
}

interface SucursalesProceso {
  id: number;
  agenda_id: number;
  sucursal_id: number;
  proceso_id: number;
  fecha: string;
  estatus_id: number;
}
export interface IagendaDts extends Iagenda{
    supervisor:Isupervisordts
    Estatus:Iestatus
    supervisor_nombre:string
    estatus_nombre:string
    sucursalesProcesos:Iagenda_sucursalDts[]
}

export interface Iagenda_sucursal{
    id:number
    agenda_id:number
    sucursal_id:number
    proceso_id:number
    fecha:Date
    estatus_id:number
    expedienteClientes:IExpedienteCliente[]
}

export interface Iagenda_sucursalDts extends Iagenda_sucursal{
    sucursal?:Isucursal
    proceso?:IProceso
    sucursal_nombre:string
    proceso_nombre:string
}

export interface Iagendadetallesuper{
  id:number
  agenda_id:number
  sucursal_id:number
  sucursal:string
  proceso_id:number
  proceso:string
  supervisor:string
}
