import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Supervisores } from 'src/app/Controllers/Supervisores';
import { Isupervisordts } from 'src/app/Models/Supervisor/Isupervisor';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { DatosServiceService } from 'src/app/Services/datos-service.service';
import { FormZonasComponent } from '../form-zonas/form-zonas.component';
import { TableResponse } from 'src/app/Helpers/Interfaces';
import { FormUsuariosComponent } from '../form-usuarios/form-usuarios';
import { IUsuario } from 'src/app/Models/Usuario/Iusuario';
import { Usuario } from 'src/app/Controllers/Usuario';
import { FormZonaListComponent } from '../form-zona-list/form-zona-list.component';
import { IZona, IZonaSucusal } from 'src/app/Models/Zona/izona';
import { ZonaSucursal } from 'src/app/Controllers/ZonaSucursal';
import { Zona } from 'src/app/Controllers/Zona';

@Component({
  selector: 'app-forms-supervisor',
  templateUrl: './forms-supervisor.component.html',
  styleUrls: ['./forms-supervisor.component.css']
})
export class FormsSupervisorComponent implements OnInit  {




  public config: any;  
  public term: string="";
  public sele:boolean=true;
  public campos:string[]=[];
  public camposdetalle:string[]=[];
  public totalregistros: number=0;
  public totalregistrosdetalle: number=0;

  actualpage: number=1;
  tituloslocal: string[]=[];
  tituloslocaldetalle: string[]=[];
  fg:FormGroup = new FormGroup({})
  
  
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb: FormBuilder,
    private toastr: MatDialog,
    public productdatos:Supervisores,
    public zslocal:Zona,
    private dialogre:MatDialogRef<FormsSupervisorComponent>,
    private Dat:DatosServiceService,
    private ServiceComunicacion:ComunicacionService,) {
    this.fg=this.fb.group({});
    this.ServiceComunicacion.enviarMensajeObservable.subscribe({next:(mensaje:string)=>{
      console.log('Productos Construtor: '+mensaje)   
    
    }})
   }

  
  
  actualizaelidtable(event: string) {
    this.config.id=event
  }
  
  paginacambio(event: number) {
    this.config.actualpage = event
  }
  
  opcion($event: TableResponse) {
    throw new Error('Method not implemented.');
    }
  
   get nombre(){return this.fg.get('nombre');}
   get Descripcion(){return this.fg.get('nombrezona');}

    ngOnInit(): void {
          console.log('formulario',this.data.model)
          this.productdatos.model= this.data.model
      
          this.campos=Object.keys(this.productdatos.model);
          console.log(this.campos)
          this.fg= this.Dat.llenarFormGrup(this.productdatos.model)
          

         this.camposdetalle = ['nombre',]
         this.tituloslocaldetalle = ['Sucursal']

          this.config = {
            id:'',
             itemsPerPage: 10,
             currentPage: 1,
             totalItems: this.productdatos.model.zona.zonaSucursales.length
           };
          
    }
  
    
  
    grabar(){
      // verificacion
      let verificacion:boolean=true
      if (this.productdatos.model.codigo==''){
        this.Dat.showMessage("Favor Selecione el Empleado","No hay empleado selecionado","error")
        verificacion=false
      }
      if (this.productdatos.model.zona_id==0){
        this.Dat.showMessage("Favor Selecione la zona","No hay zona selecionado","error")
        verificacion=false
      }
      
      //this.productdatos.model.zona_id=this.zslocal.zs.dd[0].zona_id
      if(verificacion){
        console.log('se envio a grabar')
        this.productdatos.grabar()
      }
      
      console.log('enviando modelo actualizado',this.productdatos.model)
      this.dialogre.close(this.productdatos.model)
      
    }
    
    onChangeProductType(event:any){}
    buscar(){}
    cancelar(){
      this.dialogre.close(null)
    }
    buscarempleado() {
      const  dialogRef = this.toastr.open(FormUsuariosComponent,{
        width: '900px',data:{}
          })
          dialogRef.afterClosed().subscribe((result:IUsuario)=>{
            
            this.fg.get('nombre')?.setValue(result.nombres)
            this.productdatos.model.codigo=result.usuario
            this.productdatos.model.nombre=result.nombres
          })
      }
      buscarzona() { 
        const  dialogRef = this.toastr.open(FormZonaListComponent,{
          width: '900px',data:{}
            })
            dialogRef.afterClosed().subscribe((result: IZonaSucusal)=>{
              console.log('llego zona',result)
              
              
                this.fg.get('nombrezona')?.setValue(result.descripcion)
              
              
              this.productdatos.model.zona_id=result.id
              this.productdatos.model.nombrezona=result.descripcion
              this.productdatos.model.zona = result

              console.log('se cargo la zona', this.productdatos.model)
            })
      }
}
