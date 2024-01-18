import { EventEmitter, Injectable, OnInit, Output } from "@angular/core";
import { DatosServiceService } from "../Services/datos-service.service";
import { ExcelService } from "../Services/excel.service";
import { MatDialog } from "@angular/material/dialog";
import { IZona } from "../Models/Zona/izona";
import { LoadingComponent } from "../Views/Components/loading/loading.component";
import { ModelResponse } from "../Models/Usuario/modelResponse";
import { firstValueFrom, Observable } from 'rxjs';
import { izonasucursal } from "../Models/Zona/izonasucursal";


@Injectable({
    providedIn: 'root'
  })

  export class Zona implements OnInit{

    rutaapi:string =this.datos.URL+'/api/Zonas'
    titulomensage:string='Productos'
    public model:IZona={
        id: 0,
        descripcion: ''
      }
      titulos=[
        {descripcion:'Descripcion'},
    
      ]
       public estado:string='`'
       public totalregistros:number=0
       public actualpage:number=1
       public pagesize:number=10
       public filtro:string=''
       public arraymodel:IZona[]=[]
       public operationSuccessful: boolean = false;
       @Output() TRegistros = new EventEmitter<number>();

    constructor(
        private datos:DatosServiceService,
        private excel:ExcelService,
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

         this.Gets()        
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
    public getsucursal(sucursal_id:string){
        const dialogRef = this.toastr.open(LoadingComponent, {
            width: '340px',
            height: '180px', 
 
          }); 
          this.getsucursales(sucursal_id).subscribe(
            {        
             next:(rep:ModelResponse)=>
                {

                    this.totalregistros =  rep.count
                    this.arrayzonasucursal=[]
                    this.arrayzonasucursal=rep.data    
                    this.TRegistros.emit(this.totalregistros)        
                    dialogRef.close()       
                }
            })          
    }
      public filtrar(){
        this.Gets().subscribe(
                        (m:ModelResponse)=>{
                          console.log(m)
                          this.totalregistros =  m.count
                          this.TRegistros.emit(this.totalregistros)        
                          
                          this.arraymodel=[]
                          this.arraymodel=m.data
                        }
                      )
          
        }
  
      
      public Gets():Observable<ModelResponse> {
        return this.datos.getdatos<ModelResponse>( this.rutaapi)
      }
      public getsucursales(id:string):Observable<ModelResponse>{
        return this.datos.getdatos<ModelResponse>(this.rutaapi+`/zona_sucursal/${id}`)
      }
      public Get(id:string):Observable<IZona>{
          return this.datos.getbyid<IZona>(this.rutaapi+`/${id}`)
      }
      public GetCount():Observable<number>{
        
        return this.datos.getdatoscount(this.rutaapi+`/count`)
      }
  
      public insert(obj:IZona):Observable<IZona>{  
        console.log('llego a insert en produc',obj)
  
        return this.datos.insertardatos<IZona>(this.rutaapi, obj ); 
      }
      
      public Update(obj:IZona):Observable<IZona>{
        console.log(this.rutaapi+`/${obj.id}`,obj)
        return this.datos.updatedatos<IZona>(this.rutaapi+`/${obj.id}`,obj); 
      }
  
      public Reporte(){}
      
      public exportexcel(){}
              
      public async grabar(): Promise<boolean> {
        // Envuelve el código en una nueva Promise
        console.log('llego producto a grabar')
        return new Promise<boolean>(async (resolve) => {
          if (this.model.id == 0) {
            // inserta el registro
            await firstValueFrom(this.insert(this.model)).then(
              (rep: IZona) => {
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
              (rep: IZona) => {
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
