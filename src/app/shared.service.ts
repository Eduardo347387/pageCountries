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

  getValuePaginate(): valuePaginate | undefined {
    return this.valuesPaginateSubject.getValue();
  }

  setValuePaginate(valuesPaginate: valuePaginate): void {
    this.valuesPaginateSubject.next(valuesPaginate);
  }

}
