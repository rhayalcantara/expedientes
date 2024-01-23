import { Component } from '@angular/core';
import { Supervisores } from 'src/app/Controllers/Supervisores';
import { TableResponse } from 'src/app/Helpers/Interfaces';

@Component({
  selector: 'app-supervisores-page',
  templateUrl: './supervisores-page.component.html',
  styleUrls: ['./supervisores-page.component.css']
})
export class SupervisoresPageComponent {
filtro() {
throw new Error('Method not implemented.');
}
  public config: any;
  public campos: string[]=[] ;
  public tituloslocal: string[]=[];
  public term: string="";

constructor(public supervisores:Supervisores){}

actualizaelidtable($event: string) {
throw new Error('Method not implemented.');
}
paginacambio($event: number) {
throw new Error('Method not implemented.');
}
opcion($event: TableResponse) {
throw new Error('Method not implemented.');
}

agregar() {
throw new Error('Method not implemented.');
}
pdf() {
throw new Error('Method not implemented.');
}
excel() {
throw new Error('Method not implemented.');
}

}
