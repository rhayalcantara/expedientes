import { EventEmitter, Injectable, OnInit, Output } from "@angular/core";
import { DatosServiceService } from "../Services/datos-service.service";
import { ExcelService } from "../Services/excel.service";
import { MatDialog } from "@angular/material/dialog";
import { Iagenda, IagendaCreacion, IagendaDts, Iagenda_sucursal, Iagenda_sucursalDts } from "../Models/agenda/agenda"
import { LoadingComponent } from "../Views/Components/loading/loading.component";
import { ModelResponse } from "../Models/Usuario/modelResponse";
import { firstValueFrom, Observable, repeat } from 'rxjs'; 

@Injectable({
    providedIn: 'root'
  })

  export class Agenda implements OnInit{

    rutaapi:string =this.datos.URL+'/api/agenda'
    titulomensage:string='Agenda'

  public model:Iagenda
  public modelo:IagendaDts=this.inicialamodelototal()
   public  titulos=[
        {id:'Agenda ID'},
        {supervisor_nombre:'Supervisor'},
        {estatus_nombre:'Estatus'},
        {fecha:'Fecha'}
    ]

    public tiulosdetalle=[
      {sucursal_nombre:'Sucursal'},
      {proceso_nombre:'Proceso'} ,
      {fecha:"Fecha"}     
    ]
    public agendacreacion:IagendaCreacion = {
      id: 0,
      supervisor_id: 0,
      fecha: new Date(),
      estatus_id: 0,
      sucursalesProcesos: []
    }
    public estado:string='`'
    public totalregistros:number=0
    public actualpage:number=1
    public pagesize:number=10
    public filtro:string=''
    public desde:string=''
    public hasta:string=''
    public arraymodel:IagendaDts[]=[]

    @Output() TRegistros = new EventEmitter<number>();
    constructor(
                private datos:DatosServiceService,
                private excel:ExcelService,
                private toastr: MatDialog                 
               ){
                this.model=this.inicializamodelo()
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
      //se obtiene los datos y se ponen en los array
   
       this.Gets(this.filtro,
        this.actualpage,this.pagesize)        
         .subscribe({        
        next:(rep:ModelResponse)=>{
          console.log('llego los datos ',rep)
          this.totalregistros =  rep.count
          this.arraymodel=[]
          this.arraymodel=rep.data      
          this.TRegistros.emit(this.totalregistros)        

          dialogRef.close()
       
        }
      }
      ) 
    }
    public getdetalle(id:string):Promise<any>{
      const dialogRef = this.toastr.open(LoadingComponent, {
        width: '340px',
        height: '180px', 
      }); 


      const repu=new Promise((resolve:any,reject:any)=>{

                this.Get(id).subscribe({
                  next:(rep:ModelResponse)=>{
                    if(rep.exito!=400 && rep.exito!=500){
                       console.log('detalle getdatos',rep.data)
                        this.modelo=rep.data
                        resolve(true);
                    }else{
                        this.modelo=this.inicialamodelototal()
                        this.datos.showMessage("Error:"+rep.mensaje,"Buscando Registro","error")
                        reject(true)
                    }
                  }
                })
          })

      return repu
    }
    public inicializamodelo():Iagenda{
          return {
            id: 0,
            supervisor_id: 0,
            fecha: new Date(),
            estatus_id:1
          }
    }

    public inicialamodelototal():IagendaDts{
     return {
        id:0,
        supervisor_id:0,
        fecha:new Date,
        estatus_id:1,
        supervisor:{
          nombrezona: "",
          id: 0,
          codigo: "",
          nombre: "",
          zona_id: 0,
          zona: {
            zonaSucursales: [],
            id: 0,
            descripcion: ""
          }
        },
        Estatus:{
          id: 0,
          status: ""
        },
        supervisor_nombre:'',
        estatus_nombre:'',
        sucursalesProcesos:[]
      }
    }
  public Gets(filtro:string,
          actualpage:number,pagesize:number):Observable<ModelResponse> {
                
            let  opciones:String = ''
          if (filtro!=''){
              opciones= `&filtro=${filtro}`
          } 
          console.log(this.rutaapi+`/paginacion?page=${actualpage.toString()}&pagesize=${pagesize.toString()}`+opciones)
          return this.datos.getdatos<ModelResponse>(
          this.rutaapi+`/paginacion?page=${actualpage.toString()}&pagesize=${pagesize.toString()}`+opciones
    )
  }

  public Get(id:string):Observable<ModelResponse>{
    console.log(this.rutaapi+`/${id}`)
    return this.datos.getbyid<ModelResponse>(this.rutaapi+`/${id}`)
  }

public insert(obj:Iagenda):Observable<Iagenda>{  
    console.log('llego a insert en produc',obj)

    return this.datos.insertardatos<Iagenda>(this.rutaapi, obj ); 
  }
  
public Update(obj:Iagenda):Observable<Iagenda>{
    console.log(this.rutaapi+`/${obj.id}`,obj)
    return this.datos.updatedatos<Iagenda>(this.rutaapi+`/${obj.id}`,obj); 
  }

public Iagenda_sucursalDtstoIagenda_sucursal(array:Iagenda_sucursalDts[]):Iagenda_sucursal[]{
  let array2:Iagenda_sucursal[]=[]
  array.map(ele=>{
      let ele2:Iagenda_sucursal={
        id: ele.id,
        agenda_id: this.modelo.id,
        sucursal_id: ele.sucursal_id,
        proceso_id: ele.proceso_id,
        fecha: ele.fecha,
        estatus_id: ele.estatus_id
      }
      array2.push(ele2)
  })
  return array2
}

public async grabar(): Promise<boolean> {
    // Envuelve el código en una nueva Promise
    const dialogRef = this.toastr.open(LoadingComponent, {
      width: '340px',
      height: '180px', 
    }); 
    console.log('llego registro a grabar',this.modelo)
    this.agendacreacion = {
      id: this.modelo.id,
      supervisor_id: this.modelo.supervisor_id,
      fecha: this.modelo.fecha,
      estatus_id: this.modelo.estatus_id,
      sucursalesProcesos: this.Iagenda_sucursalDtstoIagenda_sucursal(this.modelo.sucursalesProcesos)
    }
    this.model.id = this.modelo.id
    this.model.estatus_id=this.modelo.estatus_id
    this.model.fecha = this.modelo.fecha
    this.model.supervisor_id = this.modelo.supervisor_id
    
    return new Promise<boolean>(async (resolve) => {
      if (this.model.id == 0) {
        // inserta el registro
        await firstValueFrom(this.insert(this.agendacreacion)).then(
          (rep: Iagenda) => {
            this.model = rep;
            this.modelo.id = rep.id
            dialogRef.close()
            this.datos.showMessage('Registro Insertado Correctamente', this.titulomensage, "success");
            // this.grabadetalle().then(rep=>{
            //   if(rep){
            //     resolve(true);   
            //   }else{
            //     resolve(false)
            //   }
              
            // })
            // Devuelve true si la operación fue exitosa
          },
          (err: Error) => {
            this.datos.showMessage('Error:' + err.message, this.titulomensage, 'error');
            resolve(false); // Devuelve false si la operación falló
          }
        );
      } else {
        // actualiza el registro
        await firstValueFrom(this.Update(this.agendacreacion)).then(
          (rep: Iagenda) => {
            let m = this.arraymodel.find(x=>x.id==this.model.id)
            m=this.modelo
            // this.grabadetalle().then(rep=>{
            //   if(rep){

            //     let m = this.arraymodel.find(x=>x.id==this.model.id)
            //     this.getdetalle(this.model.id.toString()).then(
            //       rep=>{
            //         if(rep){
                      
            //         }
                    
            //       }
            //     )

            //     this.getdatos()
            //     this.TRegistros.emit(this.totalregistros)
            //     console.log('modelo actualizado', this.model,rep);
            //     this.datos.showMessage('Registro Insertado Correctamente', this.titulomensage, "success");
            //     resolve(true); // Devuelve true si la operación fue exitosa                
                 
            //   }else{
            //     resolve(false)
            //   }
              
            // })
            dialogRef.close()
            this.datos.showMessage('Registro actualizo Correctamente', this.titulomensage, "success");
            resolve(true)
          
          },
          (err: Error) => {
            this.datos.showMessage('Error:' + err.message, this.titulomensage, 'error');
            resolve(false); // Devuelve false si la operación falló
          }
        );
      }
    });
  }

  public grabadetalleelementoinsert(ele:Iagenda_sucursalDts):Promise<boolean>{
    let model:Iagenda_sucursal={
      id: ele.id,
      agenda_id: ele.agenda_id,
      sucursal_id: ele.sucursal_id,
      proceso_id: ele.proceso_id,
      fecha: ele.fecha,
      estatus_id: 1
    }
    let rr = new Promise<boolean>(async (resolve) => {
          console.log('se envio a grabar agenda sucursal:',model)
          this.datos.insertardatos<Iagenda_sucursal>(this.datos.URL+'/api/agenda_sucursal' , model )
          .subscribe(
            {next:(rep:Iagenda_sucursal)=>{
            resolve(true)
            },error:(err:Error)=>{
              this.datos.showMessage(`Error grabando el detalle ${ele} `,"Error",'error')
              resolve(false)
            }
          }
          ) 
        })
        return rr
     
  }
  public grabadetalleelementoupdate(ele:Iagenda_sucursalDts):Promise<boolean>{
    let model:Iagenda_sucursal={
      id: ele.id,
      agenda_id: ele.agenda_id,
      sucursal_id: ele.sucursal_id,
      proceso_id: ele.proceso_id,
      fecha: ele.fecha,
      estatus_id: 1
    }
    let rr = new Promise<boolean>(async (resolve) => {
      console.log('se envio a actualizar agenda sucursal:',model)
          this.datos.updatedatos<Iagenda_sucursal>(this.datos.URL+'/api/agenda_sucursal' , model )
          .subscribe(
            {next:(rep:Iagenda_sucursal)=>{
            resolve(true)
            },error:(err:Error)=>{
              this.datos.showMessage(`Error grabando el detalle ${ele} `,"Error",'error')
              resolve(false)
            }
          }
          ) 
        })
        return rr
     
  }

  public grabadetalle(): Promise<boolean> {
    const dialogRef = this.toastr.open(LoadingComponent, {
      width: '340px',
      height: '180px', 
    }); 
    let n:number=0
    return new Promise<boolean>(async (resolve) => {
      this.modelo.sucursalesProcesos.forEach((ele:Iagenda_sucursalDts)=>{
        ele.agenda_id = this.modelo.id
        if( ele.id==0){
          //nuevo
          this.grabadetalleelementoinsert(ele).then(rep=>{
            if(rep){
              n++;
              if (n==this.modelo.sucursalesProcesos.length){
                dialogRef.close()
                resolve(true)
              }
            }else{
              dialogRef.close()
                resolve(false)
            }
          })
        }else{
          //actualizacion
          this.grabadetalleelementoupdate(ele).then(rep=>{
            if(rep){
              n++;
              if (n==this.modelo.sucursalesProcesos.length){
                dialogRef.close()
                resolve(true)
              }
            }else{
              dialogRef.close()
                resolve(false)
            }
          })
        }
      }) 
    })
  }

  }