import { EventEmitter, Injectable, OnInit, Output } from "@angular/core";

import { DatosServiceService } from "../Services/datos-service.service";
import { ExcelService } from "../Services/excel.service";
import { MatDialog } from "@angular/material/dialog";
import { LoadingComponent } from "../Views/Components/loading/loading.component";
import { ModelResponse } from "../Models/Usuario/modelResponse";
import { firstValueFrom, Observable, repeat } from 'rxjs';
import { Isupervisor, Isupervisordts } from "../Models/Supervisor/Isupervisor";
import { UtilsService } from "../Helpers/utils.service";

@Injectable({
    providedIn: 'root'
  })

  export class Supervisores implements OnInit{

    rutaapi:string =this.datos.URL+'/api/Supervisors'
    titulomensage:string='Supervisores'

    public model:Isupervisordts=this.inicializamodelo()
    public  titulos=[
        {nombre:'Nombre'},
        {nombrezona:'Zona'}
    
      ]
      public campos:string[]=['nombre','nombrezona']

       public estado:string='`'
       public totalregistros:number=0
       public actualpage:number=1
       public pagesize:number=10
       public filtro:string=''
       public arraymodel:Isupervisordts[]=[]
      
       public operationSuccessful: boolean = false;
       @Output() TRegistros = new EventEmitter<number>();
        constructor(
                    private datos:DatosServiceService,
                    private excel:ExcelService,
                    private toastr: MatDialog,
                    private tools:UtilsService
                                    
                   ){}
    inicializamodelo():Isupervisordts{
      return {
        id: 0,
        codigo: '',
        nombre: '',
        zona_id: 0,
        nombrezona:'',
        zona:{
          zonaSucursales: [],
          id: 0,
          descripcion: ""
        }
    }
    }
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

    public Gets(filtro:string,estado:string,
        actualpage:number,pagesize:number):Observable<ModelResponse> {
       
        
        return this.datos.getdatos<ModelResponse>(this.rutaapi)
    }
    
    public filtrar(filtro:string){
      if(filtro==""){
        this.getdatos()
      }else{
        this.arraymodel=this.arraymodel.filter(x=>x.nombre.includes(filtro.toUpperCase()))
      }
    }

    public insert(obj:Isupervisor):Observable<Isupervisor>{  
      console.log('llego a insert en produc',obj)

      return this.datos.insertardatos<Isupervisor>(this.rutaapi, obj ); 
    }
    
    public Update(obj:Isupervisor):Observable<Isupervisor>{
      console.log(this.rutaapi+`/${obj.id}`,obj)
      return this.datos.updatedatos<Isupervisor>(this.rutaapi+`/${obj.id}`,obj); 
    }
    
    public async grabar(): Promise<boolean> {
      // Envuelve el código en una nueva Promise
      console.log('llego producto a grabar',this.model)
      return new Promise<boolean>(async (resolve) => {
        let supervisor:Isupervisor ={
          id:this.model.id,
          nombre:this.model.nombre,
          codigo:this.model.codigo,
          zona_id:this.model.zona_id
        }
        
        if (this.model.id == 0) {
          // inserta el registro
          await firstValueFrom(this.insert(supervisor)).then(
            (rep: Isupervisor) => {
              this.model.id = rep.id
              this.arraymodel.push(this.model)
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
          
          await firstValueFrom(this.Update(supervisor)).then(
            (rep: Isupervisor) => {
             // this.model = rep;
              let m = this.arraymodel.find(x=>x.id==this.model.id)
              m = this.model 
              this.TRegistros.emit(this.totalregistros)
              console.log('modelo actualizado', this.model,rep,supervisor);
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