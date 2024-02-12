import { EventEmitter, Injectable, OnInit, Output } from "@angular/core";
import { Isucursal } from "../Models/Sucursal/Isucursal";
import { izonasucursal, izs } from "../Models/Zona/izonasucursal";
import { DatosServiceService } from "../Services/datos-service.service";
import { MatDialog } from "@angular/material/dialog";
import { LoadingComponent } from "../Views/Components/loading/loading.component";
import { ModelResponse } from "../Models/Usuario/modelResponse";
import { Observable } from "rxjs/internal/Observable";
import { IZonaSucusal } from "../Models/Zona/izona";
import { Sucursal } from "./Sucursal";
import { ResourceLoader } from "@angular/compiler";
import { IProceso, IProcesoParametro, IprocesoDts, IprocesoparametroDts } from "../Models/Proceso/Proceso";


@Injectable({
    providedIn: 'root'
  })
  export class ProcesoParametros implements OnInit{
  
    rutaapi:string =this.datos.URL+'/api/procesoes'
    titulomensage:string='Proceso'
  
    
    public model:IprocesoDts={
        id: 0,
        descripcion: '',
        proceso_Parametros: []
    }

    public titulos=[{descripcion:'Nombre'}]
    public titulodetalle=[
      {producto_nombre:'Producto'},
      {parametro_nombre:'Parametro'}
                         ]
    public estado:string='`'
    public totalregistros:number=0
    public actualpage:number=1
    public pagesize:number=10
    public filtro:string=''
    public arraymodel:IprocesoparametroDts[]=[]
    public anterior:IprocesoparametroDts[]=[]
    public dd:IProcesoParametro[]=[]
    public error:string=''
   @Output() TRegistros = new EventEmitter<number>();
   
   constructor(
    private datos:DatosServiceService,
    private toastr: MatDialog
                    
   ){}
      ngOnInit(): void {
        this.filtro=""
        this.estado=""
        this.actualpage=1
        this.pagesize=10
        
    }
  public  getdatos(id:string):Promise<any>{
      
        const dialogRef = this.toastr.open(LoadingComponent, {
         width: '340px',
         height: '180px', 
       }); 
      
      
       const rep = new Promise((resolve:any,reject:any)=>{
       this.Gets(id).subscribe(
        {next:(rep:ModelResponse)=>
          {

          console.log('llegaron los datos de Proceso Parametro',rep)
          //se obtiene los datos y se ponen en los array

          this.dd = rep.data

          this.totalregistros =  rep.count
          this.pagesize=rep.count
          this.arraymodel=[]
          this.anterior =[]
          this.arraymodel=rep.data    
          this.anterior.push(...rep.data)
          console.log('datos',this.arraymodel)     
          this.TRegistros.emit(this.totalregistros) 
    
          dialogRef.close()  
          resolve(true);
          
          
         },error:(err:Error)=>{
          reject(true)
         }
      }) 
      })
      return rep
    }
  public verificasucursalasignada(id:string):Observable<boolean>{
    console.log(this.rutaapi+`/sucursal/${id}`)
    return this.datos.getbyid<boolean>(this.rutaapi+`/sucursal/${id}`)
  }
  public Gets(id:string):Observable<ModelResponse> {      
      return this.datos.getdatos<ModelResponse>(this.rutaapi+`/zona/${id}`)
  }
  
  public Get(id:string):Observable<izonasucursal>{
    return this.datos.getbyid<izonasucursal>(this.rutaapi+`/${id}`)
  }
  public GetCount():Observable<number>{
  
  return this.datos.getdatoscount(this.rutaapi+`/count`)
  }

  public insert(obj:IprocesoDts):Observable<IprocesoDts>{  
    console.log('llego a insert en produc',obj)

    return this.datos.insertardatos<IprocesoDts>(this.rutaapi, obj ); 
  }
  
  public Update(obj:IprocesoDts):Observable<IprocesoDts>{
    console.log(this.rutaapi+`/${obj.id}`,obj)
    return this.datos.updatedatos<IprocesoDts>(this.rutaapi+`/${obj.id}`,obj); 
  }
  public del(obj:IprocesoDts):Observable<IprocesoDts>{
    console.log(this.rutaapi+`/${obj.id}`)
    return this.datos.delbyid<IprocesoDts>(this.rutaapi+`/${obj.id}`); 
  }
  public grabar():Promise<any>{

    
    const repuesta = new Promise((resolve:any,reject:any)=>{
      if(this.model.id==0){
        //insertar
        console.log('se envia a insertar',this.model)
        this.insert(this.model).subscribe({
          next:(rep:IprocesoDts)=>{
            console.log('inserto:',rep)
            this.model.id = rep.id
            
            resolve(true);
          },error:(err:Error)=>{
            this.error=err.message
            reject(true)
          }

        })
      }else{
        //update
        console.log('se envia a update',this.model)
        this.Update(this.model).subscribe({
          next:(rep:IprocesoDts)=>{
            resolve(true)
          },error:(err:Error)=>{
            this.error=err.message
            reject(true)
          }
        })
      }
    })

      return repuesta


  }
  }