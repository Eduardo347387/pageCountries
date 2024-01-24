import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ApiService } from '../apiService/api.service';
import { Icountrys, valuePaginate } from '../models/countrys.model';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-list-countrys',
  templateUrl: './list-countrys.component.html',
  styleUrls: ['./_listCountrys.scss']
})
export class ListCountrysComponent implements OnInit,OnChanges{
  page_size: number = 20;
  page_number: number = 0

  @Output() countrylistChanged = new EventEmitter<Icountrys[]>()
  @Input() valuesPaginate?:valuePaginate
  listCountrys: Icountrys[] = []
    

    constructor(private _apiCountry: ApiService){}  

    ngOnInit(): void {
      this._apiCountry.getallCountrys().subscribe(country => {
        this.listCountrys = country
         this.sendDataToControllers()
      })
    }
  
    ngOnChanges(changes: SimpleChanges): void {
      this.page_number = this.valuesPaginate?.page_Number!
      this.page_size = this.valuesPaginate?.page_Size!
    }
  
    sendDataToControllers(): void {
      this.countrylistChanged.emit(this.listCountrys);
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
