import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Icountrys } from './models/countrys.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private countryListSuject = new BehaviorSubject<Icountrys[]>([]);
  countryList$ = this.countryListSuject.asObservable();

  getCountryList(countryList: Icountrys[]): void {
    this.countryListSuject.next(countryList);
  }


}
