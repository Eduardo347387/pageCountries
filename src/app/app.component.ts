import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Icountrys, Name, valuePaginate } from './models/countrys.model';
import { ApiService } from './apiService/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./_appComponent.scss']
})
export class AppComponent implements OnChanges, OnInit{
  valuePaginate?:valuePaginate
  listCountrys: Icountrys[] = []
  sortName: Icountrys[] = []
  sortPopulation: Icountrys[] = []
  sontArea: Icountrys[] = []


  constructor(private _apiCountrys: ApiService) { }
  countryList: Icountrys[] = [];

  ngOnInit(): void {
      console.log(this.valuePaginate)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.valuePaginate)
  }
  
  onCountryListChanged(newCountryList: Icountrys[]): void {
    this.countryList = newCountryList;
    // Opcional: this.sharedService.updateCountryList(newCountryList);
  }

  onValuePaginate(valuePage: valuePaginate) {
    this.valuePaginate = valuePage
  }









//   ngOnInit(): void {
//     //trae todos los paises
//     this._apiCountrys.getallCountrys().subscribe(data => {
//         this.listCountrys = data
        
//         //ordenanar por nombre
//         this.sortName = this.listCountrys.sort((a, b) => (a.name > b.name) ? 1 : -1)
//         // orden por popular
//         this.sortPopulation = this.listCountrys.sort((a, b) => (a.population < b.population) ? 1 : -1)
//         // ordenan por area
//         this.sontArea = this.listCountrys.sort((a, b) => (a.area < b.area) ? 1 : -1)

//         //busca un pais en espesifico
//         /* this._apiCountrys.searchCountry('Mexico').subscribe(data => {
//             console.log(data)
//             }) */
        
//         //Obtiene los paises por su region
//         /* this._apiCountrys.getCountrysForRegion('europe').subscribe(data => {
//             console.log(data)
//         }) */

//         //Obtener paises independientes
//         this._apiCountrys.getCountryUNMenber(true).subscribe(data => {
//             console.log(data)
//         })


//     })
//   }
}
