import { EventEmitter, Injectable, OnInit, Output } from "@angular/core";
import { IParametro } from "../Models/Proceso/Proceso";
import { DatosServiceService } from "../Services/datos-service.service";
import { MatDialog } from "@angular/material/dialog";
import { LoadingComponent } from "../Views/Components/loading/loading.component";
import { ModelResponse } from "../Models/Usuario/modelResponse";
import { Observable } from "rxjs/internal/Observable";
import { firstValueFrom } from "rxjs/internal/firstValueFrom";

@Injectable({
    providedIn: 'root'
  })
 
  export class Parametro implements OnInit{
    rutaapi:string =this.datos.URL+'/api/Parametro_Expediente'
    titulomensage:string='Parametros'
  
    
    public model:IParametro=this.inicializamodelo()
   titulos=[      
      {nombre:'Nombre'},
      {sg:'Incluye Garante'}
   ]
   public estado:string='`'
   public totalregistros:number=0
   public actualpage:number=1
   public pagesize:number=600
   public filtro:string=''
   public arraymodel:IParametro[]=[]
  
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
        this.getdatos()
    }
    inicializamodelo():IParametro{
      return {
        id: 0,
        nombre: '',
        sg: false
    }
    }
    public  getdatos(){
        console.log('entro y llama a cargando')
        const dialogRef = this.toastr.open(LoadingComponent, {
         width: '340px',
         height: '180px', 
       }); 
      
       console.log('entro y llama a los datos')
  
       this.Gets(this.filtro,this.actualpage-1,this.pagesize).subscribe({next:(rep:ModelResponse)=>{
          console.log('llegaron los datos datos',rep)
          //se obtiene los datos y se ponen en los array
          this.totalregistros =  rep.count
          this.pagesize=rep.count
          this.arraymodel=[]
          this.arraymodel=rep.data    
          console.log('datos',this.arraymodel)     
          this.TRegistros.emit(this.totalregistros)        
          
  
  
        dialogRef.close()
       
        }
      }
      ) 
    }
    public Gets(filtro:string,actualpage:number,pagesize:number):Observable<ModelResponse> {      
        return   this.datos.getdatos<ModelResponse>(this.rutaapi+`/?filtro=${filtro}&page=${actualpage.toString()}&pagesize=${pagesize.toString()}`)
    }
  
  
  public Get(id:string):Observable<IParametro>{
    return this.datos.getbyid<IParametro>(this.rutaapi+`/${id}`)
  }
  public GetCount():Observable<number>{
  
  return this.datos.getdatoscount(this.rutaapi+`/count`)
  }
  public insert(obj:IParametro):Observable<IParametro>{  
    console.log('llego a insert en produc',obj)

    return this.datos.insertardatos<IParametro>(this.rutaapi, obj ); 
  }
  
  public Update(obj:IParametro):Observable<IParametro>{
    console.log(this.rutaapi+`/${obj.id}`,obj)
    return this.datos.updatedatos<IParametro>(this.rutaapi+`/${obj.id}`,obj); 
  }

  public Reporte(){}
  
  public exportexcel(){}
          
  public async grabar(): Promise<boolean> {
    // Envuelve el código en una nueva Promise
    console.log('llego producto a grabar',this.model)
    return new Promise<boolean>(async (resolve) => {
      if (this.model.id == 0) {
        // inserta el registro
        await firstValueFrom(this.insert(this.model)).then(
          (rep: IParametro) => {
            this.model = rep;
            this.datos.showMessage('Registro Insertado Correctamente', this.titulomensage, "success");
            resolve(true); // Devuelve true si la operación fue exitosa
          },
          (err: Error) => {
            this.datos.showMessage('Error:' + err.message, this.titulomensage, 'error');
            resolve(false); // Devuelve false si la operación falló
          }
        );
      } else {
        // actualiza el registro
        await firstValueFrom(this.Update(this.model)).then(
          (rep: IParametro) => {
           // this.model = rep;
            let m = this.arraymodel.find(x=>x.id==this.model.id)
            console.log({actual:m,nuevo:this.model})
            m = this.model
            this.TRegistros.emit(this.totalregistros)
            console.log('modelo actualizado', this.model,rep);
            this.datos.showMessage('Registro Actualizado Correctamente', this.titulomensage, "success");
            resolve(true); // Devuelve true si la operación fue exitosa
          },
          (err: Error) => {
            this.datos.showMessage('Error:' + err.message, this.titulomensage, 'error');
            resolve(false); // Devuelve false si la operación falló
          }
        );
      }
    });
  }
  }