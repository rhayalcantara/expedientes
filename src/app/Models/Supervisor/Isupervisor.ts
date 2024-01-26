import { IZonaSucusal } from "../Zona/izona"
import { Zonadts } from "../Zona/izonasucursal"


export interface Isupervisor {
    id:number
    codigo:string
    nombre:string
    zona_id:number
}

export interface Isupervisordts extends Isupervisor{
    zona:IZonaSucusal
}

export interface ISupervisorsDTS extends Isupervisor
{
    zonadts: Zonadts; 
    nombrezona:string; 
}