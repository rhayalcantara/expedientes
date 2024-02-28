
import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { DatosServiceService } from 'src/app/Services/datos-service.service';
import { firstValueFrom, Observable, repeat } from 'rxjs';
import { IProduct } from '../Models/Product/IProduct';


import { MatDialog } from '@angular/material/dialog';


import { LoadingComponent } from '../Views/Components/loading/loading.component';
import { ExcelService } from '../Services/excel.service';
import { ModelResponse } from '../Models/Usuario/modelResponse';




@Injectable({
    providedIn: 'root'
  })

  export class Product implements OnInit{
   rutaapi:string =this.datos.URL+'/api/Products'
   titulomensage:string='Productos'

   
   public model:IProduct=this.inicializamodelo()
  titulos=[
    {nombre:'Nombre'},

  ]
   public estado:string='`'
   public totalregistros:number=0
   public actualpage:number=1
   public pagesize:number=10
   public filtro:string=''
   public arraymodel:IProduct[]=[]
  

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
public inicializamodelo():IProduct{
  return {
    id: 0,
    nombre: ''
  }
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


    public filtrar(){
      this.Gets(this.filtro,this.actualpage,this.pagesize).subscribe(
                      (m:ModelResponse)=>{
                        console.log(m)
                        this.totalregistros =  m.count
                        this.TRegistros.emit(this.totalregistros)        
                        
                        this.arraymodel=[]
                        this.arraymodel=m.data
                      }
                    )
        
      }


    
    public Gets(filtro:string,
                actualpage:number,pagesize:number):Observable<ModelResponse> {
                  actualpage=actualpage-1                  
        return this.datos.getdatos<ModelResponse>(
          this.rutaapi+`/?filtro=${filtro}&page=${actualpage.toString()}&pagesize=${pagesize.toString()}`
          )
    }

    public Get(id:string):Observable<IProduct>{
        return this.datos.getbyid<IProduct>(this.rutaapi+`/${id}`)
    }
    public GetCount():Observable<number>{
      
      return this.datos.getdatoscount(this.rutaapi+`/count`)
    }

    public insert(obj:IProduct):Observable<IProduct>{  
      console.log('llego a insert en produc',obj)

      return this.datos.insertardatos<IProduct>(this.rutaapi, obj ); 
    }
    
    public Update(obj:IProduct):Observable<IProduct>{
      console.log(this.rutaapi+`/${obj.id}`,obj)
      return this.datos.updatedatos<IProduct>(this.rutaapi+`/${obj.id}`,obj); 
    }

    public Reporte(){
      /*
      //landscape or portrait
      this.GetCount().subscribe({
        next:(rep:number)=>{

          this.Gets(this.filtro,this.estado,1,rep).subscribe((rep)=>{
            let url:any = UtilsService.downloadAsPDF(rep.data,this.titulomensage,this.titulos,'landscape')
            url.getDataUrl((dataUrl:any) => {
             let dialogRef =  this.toastr.open(VisorpdfComponent,{width:"85%" ,height:"70%" ,data:{url:dataUrl}});
              dialogRef.afterClosed().subscribe(rep=>{})
            }); 
          }
              
          )
          
      

        }
      })
      */

    }
    
    public exportexcel(){
      /*
      this.GetCount().subscribe({
        next:(rep:number)=>{
          console.log(rep)

          this.Gets(this.filtro,this.estado,1,rep).subscribe(
            (rep)=>{
              this.excel.exportAsExcelFile(rep.data,this.titulomensage)
            }
          )
        }
      })*/
           
    }
            
    public async grabar(): Promise<boolean> {
      // Envuelve el código en una nueva Promise
      console.log('llego producto a grabar')
      return new Promise<boolean>(async (resolve) => {
        if (this.model.id == 0) {
          // inserta el registro
          await firstValueFrom(this.insert(this.model)).then(
            (rep: IProduct) => {
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
            (rep: IProduct) => {
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
  