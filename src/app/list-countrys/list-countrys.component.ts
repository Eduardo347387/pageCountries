import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ApiService } from '../apiService/api.service';
import { Icountrys } from '../models/countrys.model';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-countrys',
  templateUrl: './list-countrys.component.html',
  styleUrls: ['./_listCountrys.scss']
})
export class ListCountrysComponent implements OnInit, OnDestroy {
  dataService$?: Subscription;
  dataServiceCountry$?: Subscription;
  page_size: number = 0;
  page_number: number = 1;
  listCountrys: Icountrys[] = [];
  listaCountrysPaginada: Icountrys[] = [];
  filterValue:string = "Africa"

  @Output() estadoChanged = new EventEmitter<boolean>();

  constructor(private _apiCountry: ApiService, private _share: SharedService, private router: Router) {
    this.dataService$ = this._share.getValuePaginate().subscribe({
      next: value => {
        this.page_size = value?.page_Size!;
        this.page_number = value?.page_Number!;
        this.actualizarListaPaginada();
      }
    });

  }

  ngOnInit(): void {
    this._apiCountry.getallCountrys().subscribe(country => {
      this._share.setListCountry(country);
    });


    this.dataServiceCountry$ = this._share.getListCountry().subscribe({
      next: value => {
        this.listCountrys = value!;   
        this.actualizarListaPaginada();
      }
    });
  }

  getNameCapital(country: Icountrys): string {
    if (country && country.capital && country.capital[0] !== undefined) {
      let firstCapital = country.capital[0];
      return firstCapital;
    } else {
      return 'Not found';
    }
  }

  navegarADetallesDelPais(nameCountry: string) {
    this._share.setEstado(false);
    this.router.navigate(['/country', nameCountry]);
  }

  actualizarListaPaginada() {
    const startIndex = (this.page_number - 1) * this.page_size;
    const endIndex = startIndex + this.page_size;
    this.listaCountrysPaginada = this.listCountrys.slice(startIndex, endIndex);
   
  }

  ngOnDestroy(): void {
    this.dataService$?.unsubscribe();
  }
}
