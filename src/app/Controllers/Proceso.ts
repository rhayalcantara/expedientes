import { EventEmitter, Injectable, OnInit, Output } from "@angular/core";
import { IProceso, IprocesoDts } from "../Models/Proceso/Proceso";
import { DatosServiceService } from "../Services/datos-service.service";
import { ExcelService } from "../Services/excel.service";
import { MatDialog } from "@angular/material/dialog";
import { LoadingComponent } from "../Views/Components/loading/loading.component";
import { ModelResponse } from "../Models/Usuario/modelResponse";
import { firstValueFrom, Observable, repeat } from 'rxjs';
import { UtilsService } from "../Helpers/utils.service";
import { VisorpdfComponent } from "../Views/Components/visorpdf/visorpdf.component";

@Injectable({
    providedIn: 'root'
  })

  export class Proceso implements OnInit{
    rutaapi:string =this.datos.URL+'/api/Procesoes'
    titulomensage:string='Productos'

    public model:IprocesoDts={
      id: 0,
      descripcion: '',
      procesoparametros: []
    }
    public titulos=[{descripcion:'Nombre'}]
    public campodetalle:string[]=['producto_nombre','parametro_nombre']
    public titulodetalle=['Producto',
                          'Parametro']
    public estado:string='`'
    public totalregistros:number=0
    public actualpage:number=1
    public pagesize:number=10
    public filtro:string=''
    public arraymodel:IprocesoDts[]=[]

    @Output() TRegistros = new EventEmitter<number>();
    constructor(
                private datos:DatosServiceService,
                private excel:ExcelService,
                private toastr: MatDialog,
                
                                
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
        //console.log('llego a product.ts ',this.actualpage)
        //this.datos.showMessage('Filtrando Datos filtro:'+this.filtro+' Estado: '+ this.estado +' Pagina:'+this.actualpage.toString() + ' Paginasize: '+this.pagesize.toString(),this.titulomensage,'info')
        this.Gets(this.filtro,this.actualpage-1,this.pagesize).subscribe(
                        (m:ModelResponse)=>{
                          console.log(m)
                          this.totalregistros =  m.count
                          this.TRegistros.emit(this.totalregistros)        
                          
                          this.arraymodel=[]
                          this.arraymodel=m.data
                        }
                      )
          
        }
  
      public getbystate(state:string,entidad:string,entidadid:string,mov:string):Observable<ModelResponse> {
        if(this.filtro==""){
          this.filtro="`"
        }
        
        //console.log(this.rutaapi+`/Asignado?entidad=${entidad}&id=${entidadid}&mov=${mov}&filtro=${this.filtro}&page=${this.actualpage.toString()}&pagesize=${this.pagesize.toString()}`)
       
        return this.datos.getdatos<ModelResponse>(this.rutaapi+`/Asignado?entidad=${entidad}&id=${entidadid}&mov=${mov}&filtro=${this.filtro}&page=${this.actualpage.toString()}&pagesize=${this.pagesize.toString()}`)
      }
      
      public Gets(filtro:string,
                  actualpage:number,pagesize:number):Observable<ModelResponse> {
          
          
          
        // console.log(this.rutaapi+`/estado/?filtro=${filtro}&estado=${estado}&page=${actualpage.toString()}&pagesize=${pagesize.toString()}`)
          return this.datos.getdatos<ModelResponse>(
            this.rutaapi+`/?filtro=${filtro}&page=${actualpage.toString()}&pagesize=${pagesize.toString()}`
            
            )
      }
  
      public Get(id:string):Observable<IProceso>{
          return this.datos.getbyid<IProceso>(this.rutaapi+`/${id}`)
      }
      public GetCount():Observable<number>{
        
        return this.datos.getdatoscount(this.rutaapi+`/count`)
      }
  
      public insert(obj:IprocesoDts):Observable<IprocesoDts>{  
        console.log('llego a insert en produc',obj)
  
        return this.datos.insertardatos<IprocesoDts>(this.rutaapi, obj ); 
      }
      
      public Update(obj:IprocesoDts):Observable<IprocesoDts>{
        console.log(this.rutaapi+`/${obj.id}`,obj)
        return this.datos.updatedatos<IprocesoDts>(this.rutaapi+`/${obj.id}`,obj); 
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
              (rep: IprocesoDts) => {
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
              (rep: IprocesoDts) => {
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