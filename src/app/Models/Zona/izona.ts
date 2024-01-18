import { izonasucursal } from "./izonasucursal"

export interface IZona{
    id:number
    descripcion:string
    
}
export interface IZonaSucusal extends IZona{
    sucursales:izonasucursal[]
}