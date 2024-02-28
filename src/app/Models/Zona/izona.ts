import { Izona_sucursal, Izona_sucursaldts } from "./izonasucursal"


export interface IZona{
    id:number
    descripcion:string
    
}
export interface IZonaSucusal extends IZona{
    zonaSucursales:Izona_sucursaldts[]
}