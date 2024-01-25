import { Component, OnDestroy} from '@angular/core';
import { Icountrys, Name, valuePaginate } from './models/countrys.model';
import { ApiService } from './apiService/api.service';
import { SharedService } from './shared.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./_appComponent.scss']
})
export class AppComponent implements OnDestroy{
  valuePaginate?:valuePaginate
  listCountrys: Icountrys[] = []
  sortName: Icountrys[] = []
  sortPopulation: Icountrys[] = []
  sontArea: Icountrys[] = []
  countryList: Icountrys[] = [];

  estado: boolean = true
  dataService?:Subscription
  constructor(private _apiCountrys: ApiService,private _share:SharedService, private router:Router) { 
    this.dataService = this._share.getEstado().subscribe({
      next: state => {
        this.estado = state 
      },
      error: error => {
        console.log(error)
      }
    })
  }

  ngOnDestroy(): void {
    this.dataService?.unsubscribe()
    console.log('suscripcion destruidad desde appcomponet')
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
