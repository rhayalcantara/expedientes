import { EventEmitter, Injectable, OnInit, Output } from "@angular/core";
import { DatosServiceService } from "../Services/datos-service.service";
import { MatDialog } from "@angular/material/dialog";
import { LoadingComponent } from "../Views/Components/loading/loading.component";
import { ModelResponse } from "../Models/Usuario/modelResponse";
import { Observable } from "rxjs/internal/Observable";
import { Izona_sucursal, Izona_sucursaldts } from "../Models/Zona/izonasucursal";


@Injectable({
    providedIn: 'root'
  })
  export class ZonaSucursal implements OnInit{
 
    rutaapi:string =this.datos.URL+'/api/zona_sucursal'
    titulomensage:string='Usuarios'
  
    
    public model:Izona_sucursaldts={
      id: 0,
      zona_id: 0,
      sucursal_id: 0,
      nombre: "",
      sucursal: {
        secuencial: 0,
        nombre: ""
      }
    }

   titulos=[      
      {nombre:'Nombre'}
   ]
   public estado:string='`'
   public totalregistros:number=0
   public actualpage:number=1
   public pagesize:number=10
   public filtro:string=''
   public arraymodel:Izona_sucursal[]=[]
   

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

          console.log('llegaron los datos de zonasucursal',rep)
          //se obtiene los datos y se ponen en los array

          this.totalregistros =  rep.count
          this.pagesize=rep.count
          this.arraymodel=[]          
          this.arraymodel=rep.data                  
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
  
  public Get(id:string):Observable<Izona_sucursaldts>{
    return this.datos.getbyid<Izona_sucursaldts>(this.rutaapi+`/${id}`)
  }


  public insert(obj:Izona_sucursaldts):Observable<Izona_sucursaldts>{  
    console.log('llego a insert en produc',obj)
    return this.datos.insertardatos<Izona_sucursaldts>(this.rutaapi, obj ); 
  }
  
  public Update(obj:Izona_sucursaldts):Observable<Izona_sucursaldts>{
    console.log(this.rutaapi+`/${obj.id}`,obj)
    return this.datos.updatedatos<Izona_sucursaldts>(this.rutaapi+`/${obj.id}`,obj); 
  }
  public del(obj:Izona_sucursaldts):Observable<Izona_sucursaldts>{
    console.log(this.rutaapi+`/${obj.id}`)
    return this.datos.delbyid<Izona_sucursaldts>(this.rutaapi+`/${obj.id}`); 
  }
  }