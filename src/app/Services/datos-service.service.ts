import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ModelResponse } from '../Models/Usuario/modelResponse';
//import { ModelResponse } from '../Models/modelResponse';

@Injectable({
  providedIn: 'root'
})
export class DatosServiceService {
  //public URL:string='https://localhost:7007'
  public URL:string='http://192.168.7.222:9292'
  constructor(private http: HttpClient,) { }
   headers:HttpHeaders = new HttpHeaders({    
    'Content-Type': 'application/json; charset=utf-8' 
  });

  public showMessage(message: string, title: any, messageType: string) {
    switch (messageType) {
      case 'success':

        Swal.fire({
          title: title,
          text: message,
          icon: 'success',
          confirmButtonText: 'Cool'
        })
        break;
       case 'info':
      
      
         Swal.fire({
          title: title,
          text: message,
          icon: 'info',
          confirmButtonText: 'ok'
        })
         break;
       case 'error':
     //    this.toastr.error(message, title);
          Swal.fire({
            title: title,
            text: message,
            icon: 'error',
            confirmButtonText: 'ok'
          })
              break;
       case 'warning':
     //    this.toastr.warning(message, title);
        Swal.fire({
          title: title,
          text: message,
          icon: 'warning',
          confirmButtonText: 'ok'
        })
        break;
    }
   }

   public llenarFormGrup<T>(obj:any):FormGroup {
         //llenar el formgroup con los datos del consultorio
        let  campos:string[] = Object.keys(obj)
        
        let formGroup:FormGroup=new FormGroup({})
         for (let control of campos) {

          // if(control == 'relacionadomt' ){
            if (typeof(obj[control])=='object' && Object.prototype.toString.call(obj[control])!='[object Date]' ){
            let incampos = Object.keys(obj[control])

            for (let incontrol of incampos){
    
              let newFormControl: FormControl = new FormControl();      
              newFormControl.setValue(obj[control][incontrol]);
              formGroup.addControl(control+"."+incontrol, newFormControl);
            }
    
          }else{
            let newFormControl: FormControl = new FormControl();      
            newFormControl.setValue(obj[control]);
            formGroup.addControl(control, newFormControl);
          }

        } 
       
        return formGroup
   }
   public getmoneda<T>():Observable<T>{
  
    return this.http.get<T>('https://api-currencyconverter.azurewebsites.net/webservices/ConsultarTasaMoneda?moneda=RD$');
   }
   public insertardatos<T>(url:string,obj:T):Observable<T>{
  
    return this.http.post<T>(url, JSON.stringify(obj), { headers:this.headers } );
   }
   public updatedatos<T>(url:string,obj:T):Observable<T>{
   
    return this.http.put<T>(url, JSON.stringify(obj), { headers:this.headers } )
   }
   public getdatos<T>(url:string):Observable<ModelResponse>{
    return this.http.get<ModelResponse>(url)
   }
   public getdatoscount(url:string):Observable<number>{
    return this.http.get<number>(url)
   }

   public getbyid<T>(url:string):Observable<T>{
    return this.http.get<T>(url)
   }
   public delbyid<T>(url:string):Observable<T>{
    console.log('en delete llego',url)
    return this.http.delete<T>(url)
   }
}
