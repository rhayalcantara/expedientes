import { IProceso } from "../Proceso/Proceso"
import { Isucursal } from "../Sucursal/Isucursal"
import { Isupervisor } from "../Supervisor/Isupervisor"


export interface Iagenda{
    id:number
    supervisor_id:number
    fecha:Date
}

export interface IagendaDts extends Iagenda{
    supervisor:Isupervisor
    supervisor_nombre:string
    sucursalesprocesos:Iagenda_sucursalDts[]
}

export interface Iagenda_sucursal{
    id:number
    agenda_id:number
    sucursal_id:number
    proceso_id:number
    fecha:Date
}

export interface Iagenda_sucursalDts extends Iagenda_sucursal{
    sucursal:Isucursal
    proceso:IProceso
    sucursal_nombre:string
    proceso_nombre:string
}