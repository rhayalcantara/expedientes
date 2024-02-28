import { Sucursal } from "src/app/Controllers/Sucursal";
import { Isucursal } from "../Sucursal/Isucursal";

export interface Izona_sucursaldts extends Izona_sucursal{
    nombre:string
    sucursal: Isucursal
}

export interface Izona_sucursal{
    id	:number
    zona_id:number
    sucursal_id:number
    
}

  