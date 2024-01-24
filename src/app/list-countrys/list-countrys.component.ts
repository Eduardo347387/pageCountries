import { Component, OnInit } from '@angular/core';
import { ApiService } from '../apiService/api.service';
import { Icountrys } from '../models/countrys.model';

@Component({
  selector: 'app-list-countrys',
  templateUrl: './list-countrys.component.html',
  styleUrls: ['./_listCountrys.scss']
})
export class ListCountrysComponent implements OnInit {
  listCountrys: Icountrys[] = []
  
    constructor(private _apiCountry: ApiService){}  

    ngOnInit(): void {
      this._apiCountry.getallCountrys().subscribe(country => {
        this.listCountrys = country
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
