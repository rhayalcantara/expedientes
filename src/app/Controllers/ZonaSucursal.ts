import { EventEmitter, Injectable, OnInit, Output } from "@angular/core";
import { Isucursal } from "../Models/Sucursal/Isucursal";
import { izonasucursal, izs } from "../Models/Zona/izonasucursal";
import { DatosServiceService } from "../Services/datos-service.service";
import { MatDialog } from "@angular/material/dialog";
import { LoadingComponent } from "../Views/Components/loading/loading.component";
import { ModelResponse } from "../Models/Usuario/modelResponse";
import { Observable } from "rxjs/internal/Observable";


@Injectable({
    providedIn: 'root'
  })
  export class ZonaSucursal implements OnInit{
  forEach(arg0: (element: any) => void) {
    throw new Error("Method not implemented.");
  }
    rutaapi:string =this.datos.URL+'/api/'
    titulomensage:string='Usuarios'
  
    
    public model:Isucursal={
      secuencial:0,
      nombre:''
   }
   titulos=[      
      {nombre:'Nombre'}
   ]
   public estado:string='`'
   public totalregistros:number=0
   public actualpage:number=1
   public pagesize:number=600
   public filtro:string=''
   public arraymodel:izonasucursal[]=[]
   public arraysucursal:Isucursal[]=[]
   public anterior:izonasucursal[]=[]
  
   public operationSuccessful: boolean = false;
   @Output() TRegistros = new EventEmitter<number>();
   
   constructor(
    private datos:DatosServiceService,
    private toastr: MatDialog
                    
   ){}
      ngOnInit(): void {
        this.filtro=""
        this.estado=""
        this.actualpage=1
        this.pagesize=600
        
    }
    public  getdatos(id:string){
      
        const dialogRef = this.toastr.open(LoadingComponent, {
         width: '340px',
         height: '180px', 
       }); 
      
      
  
       this.Gets(id).subscribe(
        {next:(rep:ModelResponse)=>{
          console.log('llegaron los datos de zonasucursal',rep)
          //se obtiene los datos y se ponen en los array
          this.totalregistros =  rep.count
          this.pagesize=rep.count
          this.arraymodel=[]
          this.anterior =[]
          this.arraymodel=rep.data    
          this.anterior.push(...rep.data)
          console.log('datos',this.arraymodel)     
          this.TRegistros.emit(this.totalregistros)        
          dialogRef.close()
       
        }
      }
      ) 
    }

  public Gets(id:string):Observable<ModelResponse> {      
      return this.datos.getdatos<ModelResponse>(this.rutaapi+`zona_sucursal/zona/${id}`)
  }
  
  public Get(id:string):Observable<izonasucursal>{
    return this.datos.getbyid<izonasucursal>(this.rutaapi+`zonasucursal/${id}`)
  }
  public GetCount():Observable<number>{
  
  return this.datos.getdatoscount(this.rutaapi+`/count`)
  }

  public insert(obj:izs):Observable<izs>{  
    console.log('llego a insert en produc',obj)

    return this.datos.insertardatos<izs>(this.rutaapi+'zona_sucursal', obj ); 
  }
  
  public Update(obj:izs):Observable<izs>{
    console.log(this.rutaapi+`/${obj.id}`,obj)
    return this.datos.updatedatos<izs>(this.rutaapi+`zona_sucursal/${obj.id}`,obj); 
  }
  public del(obj:izs):Observable<izs>{
    console.log(this.rutaapi+`zona_sucursal/${obj.id}`)
    return this.datos.delbyid<izs>(this.rutaapi+`zona_sucursal/${obj.id}`); 
  }
  }