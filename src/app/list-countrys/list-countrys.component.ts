import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ApiService } from '../apiService/api.service';
import { Icountrys, valuePaginate } from '../models/countrys.model';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-countrys',
  templateUrl: './list-countrys.component.html',
  styleUrls: ['./_listCountrys.scss']
})
export class ListCountrysComponent implements OnInit, OnDestroy{
  dataService$?:Subscription
  page_size: number = 20;
  page_number: number = 1;
  listCountrys: Icountrys[] = []
    

  constructor(private _apiCountry: ApiService, private _share: SharedService) {

    this.dataService$ = this._share.getValuePaginate().subscribe({
      next: value => {
        this.page_size = value?.page_Size!
        this.page_number = value?.page_Number!
      },
      error: error => {
        this.page_size = 0
        this.page_number = 0
        console.log(error)
      }
    })
  }  

  ngOnInit(): void {
    this._apiCountry.getallCountrys().subscribe(country => {
      this.listCountrys = country
      this._share.setCountryLenght(this.listCountrys.length)
    })
  }
  

  
  getNameCapital(country:Icountrys):string {
      if (country && country.capital && country.capital[0] !== undefined) {
        let firstCapital = country.capital[0];
        return firstCapital;
      } else {
        return 'Not fount'
      }
  }
  ngOnDestroy(): void {
      this.dataService$?.unsubscribe()
  }

}
