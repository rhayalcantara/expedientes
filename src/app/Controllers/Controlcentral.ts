import { EventEmitter, Injectable, Output } from "@angular/core";
import { DatosServiceService } from "../Services/datos-service.service";
import { ExcelService } from "../Services/excel.service";
import { MatDialog } from "@angular/material/dialog";
import { LoadingComponent } from "../Views/Components/loading/loading.component";
import { ModelResponse } from "../Models/Usuario/modelResponse";
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class Controlcentral {
    rutaapi:string =this.datos.URL
    titulomensage:string=''
 
    
    public model:any={}
    public titulos=[ ]
    public estado:string='`'
    public totalregistros:number=0
    public actualpage:number=1
    public pagesize:number=10
    public filtro:string=''
    public arraymodel:any[]=[]
   
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
     this.pagesize=10
     this.getdatos()
     
   }
 
 
     public  getdatos(){       
         const dialogRef = this.toastr.open(LoadingComponent, {
          width: '340px',
          height: '180px', 
      
        }); 
       //se obtiene los datos y se ponen en los array
       if(this.filtro==""){
         this.filtro="`"
       }
       
        this.Gets(this.filtro,this.estado,
         this.actualpage,this.pagesize)        
          .subscribe({        
         next:(rep:ModelResponse)=>{
           console.log('datos',rep)
           this.totalregistros =  rep.count
           this.arraymodel=[]
           this.arraymodel=rep.data    
           console.log('datos',this.arraymodel)     
           this.TRegistros.emit(this.totalregistros)        
           
 
 
         dialogRef.close()
        
         }
       }
       ) 
     }
 
 
     public filtrar(){
         this.Gets(this.filtro,this.estado,
                     this.actualpage,this.pagesize).subscribe(
                       (m:ModelResponse)=>{
                         console.log(m)
                         this.totalregistros =  m.count
                         this.TRegistros.emit(this.totalregistros)        
                         
                         this.arraymodel=[]
                         this.arraymodel=m.data
                       }
                     )
         
       }
 
     
     public Gets(filtro:string,estado:string,
                 actualpage:number,pagesize:number):Observable<ModelResponse> {         
       // console.log(this.rutaapi+`/estado/?filtro=${filtro}&estado=${estado}&page=${actualpage.toString()}&pagesize=${pagesize.toString()}`)
         return this.datos.getdatos<ModelResponse>( this.rutaapi)
     }
 
     public Get<T>(id:string):Observable<T>{
         return this.datos.getbyid<T>(this.rutaapi+`/${id}`)
     }
     public GetCount():Observable<number>{       
       return this.datos.getdatoscount(this.rutaapi+`/count`)
     }
 
     public insert<T>(obj:any):Observable<T>{  
       console.log('llego a insert en produc',obj)
       return this.datos.insertardatos<T>(this.rutaapi, obj ); 
     }
     
     public Update<T>(obj:any):Observable<T>{
       console.log(this.rutaapi+`/${obj.id}`,obj)
       return this.datos.updatedatos<T>(this.rutaapi+`/${obj.id}`,obj); 
     }
 
     
             
     public async grabar(): Promise<boolean> {
       // Envuelve el código en una nueva Promise
       console.log('llego producto a grabar')
       return new Promise<boolean>(async (resolve) => {
         if (this.model.id == 0) {
           // inserta el registro
           await firstValueFrom(this.insert(this.model)).then(
             (rep) => {
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
             (rep) => {
              // this.model = rep;
               let m = this.arraymodel.find(x=>x.id==this.model.id)
               m = rep
               this.TRegistros.emit(this.totalregistros)
               console.log('modelo actualizado', this.model,rep);
               this.datos.showMessage('Registro Insertado Correctamente', this.titulomensage, "success");
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