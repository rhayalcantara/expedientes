import { NonNullableFormBuilder } from "@angular/forms"

export interface Proceso{
    id:number
    descripcion:string
}
export interface ProcesoParametro{
    id:number
    proceso_id:number
    producto_id:number
    parametro_id:number
}

export interface Parametro{
    id:number
    nombre:string
    sg:boolean
}