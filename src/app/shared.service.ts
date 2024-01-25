import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Icountrys, valuePaginate } from './models/countrys.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private valuesPaginateSubject = new BehaviorSubject<valuePaginate | undefined>(undefined);
  private valuesLenghtSubject = new BehaviorSubject<number | undefined>(0);

  /* ___________________________________________________________________________________________________________ */
  
  getValuePaginate() {
    return this.valuesPaginateSubject.asObservable();
  }

  setValuePaginate(valuesPaginate: valuePaginate):void{
    this.valuesPaginateSubject.next(valuesPaginate);
  }

  /* ___________________________________________________________________________________________________________ */
  
  setCountryLenght(lenght:number) {
    this.valuesLenghtSubject.next(lenght)
  }

  getCountryLenght(){
    return this.valuesLenghtSubject.asObservable()
  }
  


}
