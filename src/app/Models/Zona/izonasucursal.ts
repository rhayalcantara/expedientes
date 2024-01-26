import { Sucursal } from "src/app/Controllers/Sucursal";
import { Isucursal } from "../Sucursal/Isucursal";

export interface izonasucursal extends izs{
    nombre:string
    sucursal: Isucursal
}

export interface izs{
    id	:number
    zona_id:number
    sucursal_id:number
}

  export interface Zonadts {
    zs: izonasucursal[];
    id: number;
    descripcion: string;
  }