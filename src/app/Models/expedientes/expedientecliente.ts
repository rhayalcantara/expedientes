import { ICliente } from "../clientes/cliente"

export interface IExpedienteCliente{
    id:number
    clientesecuencial:number
    parametro_expedienteid:number
    garanteverificado:boolean
    agenda_sucursalid:number
    verificado:boolean
    estadoid:number
    observacion:string
    fecha:Date
    cliente:ICliente
    nombreparametro:string
    documentosExpedientes:IDocumentoExpediente[]
}
export interface IDocumentoExpediente{
    id:number
    documentoid:number
    expedienteclienteid:number
    expedientecliente?:IExpedienteCliente
    documento?:IDocumento
}
export interface IDocumento{
    id:number
    nombreinterno:string
    nombrearchivo:string
    descripcion:string
    //documentoexpedienteclientes:IDocumentoExpediente[]
}

