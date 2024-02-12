import { NonNullableFormBuilder } from "@angular/forms"
import { IProduct } from "../Product/IProduct"

export interface IProceso{
    id:number
    descripcion:string
}
export interface IprocesoDts extends IProceso{
    proceso_Parametros:IprocesoparametroDts[]
}

export interface IProcesoParametro{
    id:number
    proceso_id:number
    productos_id:number
    parametro_expediente_id:number
}

export interface IprocesoparametroDts extends IProcesoParametro{
    proceso:IProceso
    producto:IProduct
    parametro:IParametro
    proceso_nombre:string
    producto_nombre:string
    parametro_nombre:string
}
export interface IParametro{
    id:number
    nombre:string
    sg:boolean
}