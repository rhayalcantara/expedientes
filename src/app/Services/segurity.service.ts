import { Injectable } from '@angular/core';
import { Usuario } from '../Models/Usuario/usuario';
import { CommonsLibService } from '@commons-lib';

@Injectable({
  providedIn: 'root'
})
export class SegurityService {

  private _usuario!:Usuario
  get usuario(){
    
    return this._usuario;
  }
  agregarusuario(value:Usuario){
    this._usuario=value;
    this.commons.sendData('nuevousuario');
  }
  public logout(){}
  constructor( private commons: CommonsLibService,) { }
}
