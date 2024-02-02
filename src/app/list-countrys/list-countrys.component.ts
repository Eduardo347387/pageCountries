import { Component, EventEmitter, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { ApiService } from '../apiService/api.service';
import { Icountrys } from '../models/countrys.model';
import { SharedService } from '../shared.service';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { Router } from '@angular/router';
import { LightModeService } from '../apiService/light-mode.service';

@Component({
  selector: 'app-list-countrys',
  templateUrl: './list-countrys.component.html',
  styleUrls: ['./_listCountrys.scss']
})
export class ListCountrysComponent implements OnInit, OnDestroy {
  dataService$?: Subscription;
  dataServiceCountry$?: Subscription;
  dataServiceAllCountry$?: Subscription
  datathemeSuscribe?: Subscription
  
  page_size: number = 0;
  page_number: number = 1;
  listCountrys: Icountrys[] = [];
  listaCountrysPaginada: Icountrys[] = [];
  activeThemeLight?: boolean
  
  
/*   @Output() estadoChanged = new EventEmitter<boolean>(); */

  private _apiCountry = inject(ApiService) 
  private _share = inject(SharedService) 
  private router = inject(Router) 
  private _lightMode = inject(LightModeService)

  ngOnInit(): void {
    
    this.datathemeSuscribe = this._lightMode.getIsLightMode().pipe(distinctUntilChanged()).subscribe({
      next: state => {
        this.activeThemeLight = state
      }
    })

    this.dataService$ = this._share.getValuePaginate().subscribe({
      next: value => {
        this.page_size = value?.page_Size!;
        this.page_number = value?.page_Number!;
        this.actualizarListaPaginada();
      }
    });


    this.dataServiceAllCountry$ = this._apiCountry.getallCountrys().subscribe({
      next: listCountry => {
        this._share.setListCountry(listCountry);
      }
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

  navegarADetallesDelPais(code: string) {
    this._share.setEstado(false);
    this.router.navigate(['/country', code]);
  }

  actualizarListaPaginada() {
    const startIndex = (this.page_number - 1) * this.page_size;
    const endIndex = startIndex + this.page_size;
    this.listaCountrysPaginada = this.listCountrys.slice(startIndex, endIndex); 
  }

  ngOnDestroy(): void {
    this.dataService$?.unsubscribe();
    this.dataServiceCountry$?.unsubscribe()
    this.dataServiceAllCountry$?.unsubscribe()
  }
}
