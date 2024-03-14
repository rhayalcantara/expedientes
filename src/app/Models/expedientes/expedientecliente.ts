export interface IExpedienteCliente{
    id:number
    numerocliente:number
    parametro_expedienteid:number
    garanteverificado:boolean
    agenda_sucursalid:number
    verificado:boolean
    estadoid:number
    observacion:string
    fecha:Date
    documentosExpedientes:IDocumentoExpediente[]
}
export interface IDocumentoExpediente{
    id:number
    documentoid:number
    expedienteclienteid:number
    expedientecliente:IExpedienteCliente
    documento:IDocumento
}
export interface IDocumento{
    id:number
    nombreinterno:string
    nombrearchivo:string
    descripcion:string
    documentoexpedienteclientes:IDocumentoExpediente[]
}