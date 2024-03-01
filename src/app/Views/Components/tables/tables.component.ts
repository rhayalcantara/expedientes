import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { TableResponse } from 'src/app/Helpers/Interfaces';
import { UtilsService } from 'src/app/Helpers/utils.service';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';

@Component({
  standalone:true,
  imports:[NgIf,NgFor,NgxPaginationModule],
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  @Input() config:any;
  public labels: any;
  public ancho:string=''
  public totalr :number=0;
  id:string=''
  @Input() campos:string[] =[]
  @Input() titulos:string[]=[]
  @Input() arraydatos:any[]=[]
  @Input() campokey:string=''
  @Input() term:string=''
  @Input() selected:boolean=false
  @Input() deleted:boolean=false
  @Input() currentPage:number=0
  @Input() totalregistros:number=0
  @Output() accion = new EventEmitter<TableResponse>();
  @Output() paginacambio = new EventEmitter<number>();
  @Output() idtable = new EventEmitter<string>();
  constructor(private cd: ChangeDetectorRef, private ServiceComunicacion:ComunicacionService,) { 
    this.id =UtilsService.generaNss()
    this.config= {
      id:this.id,
       itemsPerPage: 5,
       currentPage: 1,
       totalItems: 0
     };
    this.labels = {
      previousLabel: "<",
      nextLabel: ">",
      screenReaderPaginationLabel: "paginacion",
      screenReaderPageLabel: "paginacion1",
      screenReaderCurrentLabel: "paginacion2"
    };
    this.ServiceComunicacion.enviarMensajeObservable.subscribe({next:(mensaje:any)=>{
     // console.log('mensaje que llego a table',mensaje)   
      this.actualizaelconfig(mensaje)   
    }})
  }
  actualizaelconfig(tt:any){
    this.calculaancho()
    if(tt.id==this.id){
      this.config.totalItems=tt.totalItems
      this.config.itemsPerPage=tt.itemsPerPage
      //console.log({'config':this.config,'tt':tt} )
      this.cd.detectChanges();
    }
    
  }

  /**
   * Initializes the component and sets the configuration ID and table ID.
   * @returns void
   */
  ngOnInit(): void {
    this.calculaancho()
    this.config.id = this.id
    this.idtable.emit(this.id)        
    this.cd.detectChanges(); 
  }
  /**
   * Calculates the width of the table columns based on the number of fields.
   * If there are no fields, sets the width to 50%.
   */
  calculaancho(){
    if (this.campos.length>0){
      this.ancho=(100/this.campos.length+1).toFixed(2)+'%'
    }else{
      this.ancho='50.00%'
    }
    
  }
  /**
   * Handles the page change event of the table.
   * @param event The page change event.
   * @returns void
   */
  onPageChange(event:any){
    this.config.currentPage = event;
    this.currentPage = event
    this.paginacambio.emit(this.currentPage)
    
    //this.cd.detectChanges();
  }
  /**
   * Executes an action based on the selected option and row.
   * @param row - The selected row object.
   * @param acc - The selected action to execute.
   * @returns void
   */
  opcion(row:object,acc:string){
    //console.log({acc:acc,row:row,table:'enviado'})
    let tr:TableResponse ={
      key: row,
      option: acc
    }

    this.accion.emit(tr);
  }
}
