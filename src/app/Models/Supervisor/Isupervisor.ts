import { IZonaSucusal } from "../Zona/izona"


export interface supervisor {
    id:number
    codigo:string
    nombre:string
    zona_id:number
}

export interface supervisordts extends supervisor{
    zona:IZonaSucusal
}