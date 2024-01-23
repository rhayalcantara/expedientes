import { EventEmitter, Injectable, OnInit, Output } from "@angular/core";
import { supervisordts } from "../Models/Supervisor/Isupervisor";
import { DatosServiceService } from "../Services/datos-service.service";
import { ExcelService } from "../Services/excel.service";
import { MatDialog } from "@angular/material/dialog";
import { LoadingComponent } from "../Views/Components/loading/loading.component";
import { ModelResponse } from "../Models/Usuario/modelResponse";
import { firstValueFrom, Observable, repeat } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

  export class Supervisores implements OnInit{

    rutaapi:string =this.datos.URL+'/api/Products'
    titulomensage:string='Productos'

    public model:supervisordts={
        id: 0,
        codigo: '',
        nombre: '',
        zona_id: 0,
        zona: {
            id: 0,
            descripcion: "",
            sucursales: []
        }
    }
      titulos=[
        {nombre:'Nombre'},
    
      ]
       public estado:string='`'
       public totalregistros:number=0
       public actualpage:number=1
       public pagesize:number=10
       public filtro:string=''
       public arraymodel:supervisordts[]=[]
      
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
  }