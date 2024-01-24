import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ApiService } from '../apiService/api.service';
import { Icountrys, valuePaginate } from '../models/countrys.model';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-list-countrys',
  templateUrl: './list-countrys.component.html',
  styleUrls: ['./_listCountrys.scss']
})
export class ListCountrysComponent implements OnInit{
  page_size: number = 20;
  page_number: number = 1;
  listCountrys: Icountrys[] = []
    

  constructor(private _apiCountry: ApiService, private _share: SharedService) {
  }  

  ngOnInit(): void {
      this._apiCountry.getallCountrys().subscribe(country => {
        this.listCountrys = country
        this._share.setCountryLenght(this.listCountrys.length)
      })
    
    
      this._share.valuesPaginate$.subscribe((valuesPaginate) => {
         this.page_number = valuesPaginate?.page_Number!
        this.page_size = valuesPaginate?.page_Size!
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

}
