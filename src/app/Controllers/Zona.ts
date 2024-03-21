import { EventEmitter, Injectable, OnInit, Output } from "@angular/core";
import { DatosServiceService } from "../Services/datos-service.service";
import { ExcelService } from "../Services/excel.service";
import { MatDialog } from "@angular/material/dialog";
import { IZona, IZonaSucusal } from "../Models/Zona/izona";
import { LoadingComponent } from "../Views/Components/loading/loading.component";
import { ModelResponse } from "../Models/Usuario/modelResponse";
import { firstValueFrom, Observable } from 'rxjs';
import { ZonaSucursal } from "../Controllers/ZonaSucursal";
import { TipoCampo } from "../Helpers/Interfaces";




@Injectable({
    providedIn: 'root'
  })

  export class Zona implements OnInit{

      rutaapi:string =this.datos.URL+'/api/Zonas'
      titulomensage:string='Productos'
      
       public model:IZonaSucusal = this.inicializamodelo()
       public titulos=[{descripcion:'Descripcion'},]
       public tipocampo:TipoCampo[]=[{campo:'descripcion',
                                      tipo:'texto',
                                      arraydata:[],
                                      arrayid:'',
                                      arraynombre:''
                                    }]
       public estado:string='`'
       public totalregistros:number=0
       public actualpage:number=1
       public pagesize:number=10
       public filtro:string=''
       public arraymodel:IZonaSucusal[]=[]
       public arraytodas:IZonaSucusal[]=[]
       public operationSuccessful: boolean = false;
       @Output() TRegistros = new EventEmitter<number>();

    constructor(
        private datos:DatosServiceService,
        //public datossucursal:ZonaSucursal,
        private excel:ExcelService,
        private toastr: MatDialog,
        public zs:ZonaSucursal
                        
       ){}
    ngOnInit(): void {
        this.filtro=""
        this.estado=""
        this.actualpage=1
        this.pagesize=10
        this.getdatos()
    }
    public obtenertodas(){
      this.Getall().subscribe(
        {
          next: (rep:ModelResponse)=>{
            this.arraytodas=rep.data
          }
        })
    }
    public verificasucursalasignada(id:string):Observable<boolean>{      
      return this.datos.getbyid<boolean>(this.datos.URL+`/api/zona_sucursal/sucursal/${id}`)
    }

    public inicializamodelo():IZonaSucusal{
      return {
        id: 0,
        descripcion: '',
        zonaSucursales:[]
      } 
      
    }

    public  getdatos(){
  
          const dialogRef = this.toastr.open(LoadingComponent, {
           width: '340px',
           height: '180px', 

         }); 
    
         this.Gets(this.actualpage.toString(),this.pagesize.toString(),this.filtro)        
           .subscribe({        
          next:(rep:ModelResponse)=>{
            
            this.totalregistros =  rep.count
            this.arraymodel=[]
            this.arraymodel=rep.data    
            console.log(rep.data)
            this.TRegistros.emit(this.totalregistros)        
            
  
  
          dialogRef.close()
         
          }
        }
        ) 
    }

    public filtrar(){
        this.Gets(this.actualpage.toString(),this.pagesize.toString(),this.filtro).subscribe(
                        (m:ModelResponse)=>{
                         
                          this.totalregistros =  m.count
                          this.TRegistros.emit(this.totalregistros)        
                          
                          this.arraymodel=[]
                          this.arraymodel=m.data
                        }
                      )
          
    }
    
      public Getall():Observable<ModelResponse>{
        return this.datos.getdatos<ModelResponse>( this.rutaapi)
      }
      public Gets(page:string,pagesize:string,filtro:string):Observable<ModelResponse> {
        let filtrar=""
        if(filtro!=""){
           filtrar=`&filtro=${filtro}`        
        }
       
        return this.datos.getdatos<ModelResponse>( this.rutaapi+`/paginacion/?page=${page}&pagesize=${pagesize}${filtrar}`)
      }
  
      public Get(id:string):Observable<IZona>{
          return this.datos.getbyid<IZona>(this.rutaapi+`/${id}`)
      }
      public GetCount():Observable<number>{
        
        return this.datos.getdatoscount(this.rutaapi+`/count`)
      }
  
      public insert(obj:IZonaSucusal):Observable<IZonaSucusal>{  
        
  
        return this.datos.insertardatos<IZonaSucusal>(this.rutaapi, obj ); 
      }
      
      public Update(obj:IZonaSucusal):Observable<IZonaSucusal>{
        
        return this.datos.updatedatos<IZonaSucusal>(this.rutaapi+`/${obj.id}`,obj); 
      }
  
      public Reporte(){}
      
      public exportexcel(){}
              
      public async grabar(): Promise<boolean> {
        // Envuelve el código en una nueva Promise
        
        return new Promise<boolean>(async (resolve) => {
          if (this.model.id == 0) {
            // inserta el registro
            await firstValueFrom(this.insert(this.model)).then(
              (rep: IZonaSucusal) => {
                
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
              (rep: IZonaSucusal) => {
                
              //  this.model = rep;
                let m = this.arraymodel.find(x=>x.id==this.model.id)
                if (m!=undefined){
                  m.id = this.model.id
                  m.descripcion = this.model.descripcion
                }

                this.TRegistros.emit(this.totalregistros)
             
              //  this.datos.showMessage('Registro Insertado Correctamente', this.titulomensage, "success");
                resolve(true); // Devuelve true si la operación fue exitosa
              },
              (err: Error) => {
                this.datos.showMessage('Error:' + err.message, this.titulomensage, 'error');
                resolve(false); // Devuelve false si la operación falló
              }
            );
          }
          // agrega o modifica la lista de sucursales
          // this.zs.arraymodel.forEach(element => {
          //   element.zona_id = this.model.id
          //   if (element.id==0){
          //     this.zs.insert(element).subscribe(rep=>{
          //       this.datos.showMessage("grabado la sucursal"+element.nombre,"grabado","sucess")
          //     })
          //   }else{
          //     this.zs.Update(element)
          //   }
          // });
          // // elimina las sucursales que no se selecionaron
          
          // if(this.zs.anterior.length>0){
            
          //   this.zs.anterior.forEach(ele=>{
          //     if(!this.zs.arraymodel.includes(ele)){
                
          //       this.zs.del(ele).subscribe({
          //         next:(rep)=>{
        
          //         }
          //       })
          //     }                
          //   })
          // }

        });
      }
  }
