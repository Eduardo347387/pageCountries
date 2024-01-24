import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Icountrys, valuePaginate } from './models/countrys.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private valuesPaginateSubject = new BehaviorSubject<valuePaginate | undefined>(undefined);
  valuesPaginate$ = this.valuesPaginateSubject.asObservable();

  private valuesLenghtSubject = new BehaviorSubject<number | undefined>(undefined);
  valuesLength$ = this.valuesLenghtSubject.asObservable();

  /* ___________________________________________________________________________________________________________ */
  
  getValuePaginate(): valuePaginate | undefined {
    return this.valuesPaginateSubject.getValue();
  }

  setValuePaginate(valuesPaginate: valuePaginate): void
   {
    this.valuesPaginateSubject.next(valuesPaginate);
  }

  /* ___________________________________________________________________________________________________________ */
  
  setCountryLenght(lenght:number) {
    this.valuesLenghtSubject.next(lenght)
  }

  getCountryLenght():number | undefined {
    return this.valuesLenghtSubject.getValue()
  }
  


}
