import { Router } from '@angular/router';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ApiService } from '../apiService/api.service';
import { Icountrys} from '../models/countrys.model';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-countrys',
  templateUrl: './list-countrys.component.html',
  styleUrls: ['./_listCountrys.scss']
})
export class ListCountrysComponent implements OnInit, OnDestroy{

  dataService$?: Subscription
  dataServiceCountry$?: Subscription;
  page_size: number = 20;
  page_number: number = 1;
  listCountrys: Icountrys[] = []

  @Output() estadoChanged = new EventEmitter<boolean>()

  constructor(private _apiCountry: ApiService, private _share: SharedService , private router:Router) {

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

    this.dataServiceCountry$ = this._share.getListCountry().subscribe({
      next: value => {
        this.listCountrys = value!
      },
      error: error => {
        console.log(error)
      }
    })
  }  

  ngOnInit(): void {
    this._apiCountry.getallCountrys().subscribe(country => {
      this._share.setListCountry(country)
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

  navegarADetallesDelPais(nameCountry: string) {
    this._share.setEstado(false);
    this.router.navigate(['/country', nameCountry]);
    // Reemplaza '/pais' con la ruta real que desees y pasa cualquier parámetro necesario.
  }



  
  ngOnDestroy(): void {
    this.dataService$?.unsubscribe()
    console.log('suscripcion destruidad desde list countrys')
  }

}
