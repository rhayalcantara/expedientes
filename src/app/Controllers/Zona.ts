import { EventEmitter, Injectable, OnInit, Output } from "@angular/core";
import { DatosServiceService } from "../Services/datos-service.service";
import { ExcelService } from "../Services/excel.service";
import { MatDialog } from "@angular/material/dialog";
import { IZona, IZonaSucusal } from "../Models/Zona/izona";
import { LoadingComponent } from "../Views/Components/loading/loading.component";
import { ModelResponse } from "../Models/Usuario/modelResponse";
import { firstValueFrom, Observable } from 'rxjs';
import { ZonaSucursal } from "../Controllers/ZonaSucursal";




@Injectable({
    providedIn: 'root'
  })

  export class Zona implements OnInit{

      rutaapi:string =this.datos.URL+'/api/Zonas'
      titulomensage:string='Productos'
      
       public model:IZonaSucusal = this.inicializamodelo()
       public titulos=[{descripcion:'Descripcion'},]
       public estado:string='`'
       public totalregistros:number=0
       public actualpage:number=1
       public pagesize:number=10
       public filtro:string=''
       public arraymodel:IZonaSucusal[]=[]
       
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

    public verificasucursalasignada(id:string):Observable<boolean>{
      console.log(this.datos.URL+`/api/zona_sucursal/sucursal/${id}`)
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
    
         this.Gets()        
           .subscribe({        
          next:(rep:ModelResponse)=>{
            console.log('zonas',rep)
            this.totalregistros =  rep.count
            this.arraymodel=[]
            this.arraymodel=rep.data    
                
            this.TRegistros.emit(this.totalregistros)        
            
  
  
          dialogRef.close()
         
          }
        }
        ) 
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
    
    // public getdetalle(id:string):Promise<Boolean>{
    //   this.model  = this.arraymodel.filter(x=>x.id == Number.parseInt(id))[0]
      
    //   return this.zs.getdatos(id)
    // }

      public Gets():Observable<ModelResponse> {
        return this.datos.getdatos<ModelResponse>( this.rutaapi)
      }
  
      public Get(id:string):Observable<IZona>{
          return this.datos.getbyid<IZona>(this.rutaapi+`/${id}`)
      }
      public GetCount():Observable<number>{
        
        return this.datos.getdatoscount(this.rutaapi+`/count`)
      }
  
      public insert(obj:IZonaSucusal):Observable<IZonaSucusal>{  
        console.log('llego a insert en produc',obj)
  
        return this.datos.insertardatos<IZonaSucusal>(this.rutaapi, obj ); 
      }
      
      public Update(obj:IZonaSucusal):Observable<IZonaSucusal>{
        console.log(this.rutaapi+`/${obj.id}`,obj)
        return this.datos.updatedatos<IZonaSucusal>(this.rutaapi+`/${obj.id}`,obj); 
      }
  
      public Reporte(){}
      
      public exportexcel(){}
              
      public async grabar(): Promise<boolean> {
        // Envuelve el código en una nueva Promise
        //console.log('llego producto a grabar',this.model,this.zs.arraymodel)
        return new Promise<boolean>(async (resolve) => {
          if (this.model.id == 0) {
            // inserta el registro
            await firstValueFrom(this.insert(this.model)).then(
              (rep: IZonaSucusal) => {
                console.log(rep)
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
            console.log(this.model)
            await firstValueFrom(this.Update(this.model)).then(
              (rep: IZonaSucusal) => {
                console.log('se actualizo la zona:',rep)
              //  this.model = rep;
                let m = this.arraymodel.find(x=>x.id==this.model.id)
                if (m!=undefined){
                  m.id = this.model.id
                  m.descripcion = this.model.descripcion
                }

                this.TRegistros.emit(this.totalregistros)
              //  console.log('modelo actualizado', this.model,rep);
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
          // console.log({
          //   grabado:this.zs.arraymodel,
          //   anterior:this.zs.anterior
          // })
          // if(this.zs.anterior.length>0){
            
          //   this.zs.anterior.forEach(ele=>{
          //     if(!this.zs.arraymodel.includes(ele)){
                
          //       this.zs.del(ele).subscribe({
          //         next:(rep)=>{
          //           console.log('elemento a eliminar',ele,rep)
          //         }
          //       })
          //     }                
          //   })
          // }

        });
      }
  }
