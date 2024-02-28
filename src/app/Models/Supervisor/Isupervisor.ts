import { IZonaSucusal } from "../Zona/izona"



export interface Isupervisor {
    id:number
    codigo:string
    nombre:string
    zona_id:number
}

export interface Isupervisordts extends Isupervisor{
    nombrezona:string
    zona:IZonaSucusal
}

