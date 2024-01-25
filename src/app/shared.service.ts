import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Icountrys, valuePaginate } from './models/countrys.model';
import { ApiService } from './apiService/api.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService{

  constructor() { }

  private valuesPaginateSubject = new BehaviorSubject<valuePaginate>({page_Size:0,page_Number:0});
  private listPaisesSubject = new BehaviorSubject<Icountrys[]>([]);

  private estadoHomeSubject = new BehaviorSubject<boolean>(true)

  /* ___________________________________________________________________________________________________________ */
  
  getValuePaginate() {
    return this.valuesPaginateSubject.asObservable();
  }

  setValuePaginate(valuesPaginate: valuePaginate):void{
    this.valuesPaginateSubject.next(valuesPaginate);
  }

  /* ___________________________________________________________________________________________________________ */
  
  setListCountry(listCountrys:Icountrys[]) {
    this.listPaisesSubject.next(listCountrys)
  }

  getListCountry(){
    return this.listPaisesSubject.asObservable()
  }

    /* ___________________________________________________________________________________________________________ */
  
  setEstado(estado:boolean) {
    this.estadoHomeSubject.next(estado)
  }

  getEstado(){
    return this.estadoHomeSubject.asObservable()
  }


  


}
