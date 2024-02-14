import { EventEmitter, Injectable, OnInit, Output } from "@angular/core";
import { DatosServiceService } from "../Services/datos-service.service";
import { ExcelService } from "../Services/excel.service";
import { MatDialog } from "@angular/material/dialog";
import { agendaDts } from "../Models/agenda/agenda";
import { LoadingComponent } from "../Views/Components/loading/loading.component";
import { ModelResponse } from "../Models/Usuario/modelResponse";
import { firstValueFrom, Observable, repeat } from 'rxjs'; 

@Injectable({
    providedIn: 'root'
  })

  export class Agenda implements OnInit{

    rutaapi:string =this.datos.URL+'/api/Procesoes'
    titulomensage:string='Procesos'

    public model:agendaDts={
        id: 0,
        supervisor_id: 0,
        fecha: new Date(),

        supervisor_nombre: "",
        sucursalesprocesos: [],        
        supervisor:{
            id: 0,
            codigo: "",
            nombre: "",
            zona_id: 0
        }        
    }
   public  titulos=[
        {id:'Agenda ID'},
        {supervisor_nombre:'Supervisor'},
        {fecha:'Fecha'}
    ]
    public estado:string='`'
    public totalregistros:number=0
    public actualpage:number=1
    public pagesize:number=10
    public filtro:string=''
    public desde:string=''
    public hasta:string=''
    public arraymodel:agendaDts[]=[]

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
   
       this.Gets(this.filtro,
        this.actualpage,this.pagesize)        
         .subscribe({        
        next:(rep:ModelResponse)=>{

          this.totalregistros =  rep.count
          this.arraymodel=[]
          this.arraymodel=rep.data      
          this.TRegistros.emit(this.totalregistros)        

          dialogRef.close()
       
        }
      }
      ) 
    }
public Gets(filtro:string,
        actualpage:number,pagesize:number):Observable<ModelResponse> {
          actualpage=actualpage-1     
          let  opciones:String = ''
         if (filtro!=''){
            opciones= `&filtro=${filtro}`
         } 
        return this.datos.getdatos<ModelResponse>(
        this.rutaapi+`/?&page=${actualpage.toString()}&pagesize=${pagesize.toString()}`+opciones
  )
}



public insert(obj:agendaDts):Observable<agendaDts>{  
    console.log('llego a insert en produc',obj)

    return this.datos.insertardatos<agendaDts>(this.rutaapi, obj ); 
  }
  
  public Update(obj:agendaDts):Observable<agendaDts>{
    console.log(this.rutaapi+`/${obj.id}`,obj)
    return this.datos.updatedatos<agendaDts>(this.rutaapi+`/${obj.id}`,obj); 
  }

  public async grabar(): Promise<boolean> {
    // Envuelve el código en una nueva Promise
    console.log('llego registro a grabar')
    return new Promise<boolean>(async (resolve) => {
      if (this.model.id == 0) {
        // inserta el registro
        await firstValueFrom(this.insert(this.model)).then(
          (rep: agendaDts) => {
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
          (rep: agendaDts) => {
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