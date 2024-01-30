import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Icountrys, valuePaginate } from '../models/countrys.model';
import { SharedService } from '../shared.service';
import { Subscription, every } from 'rxjs';

import { FormControl } from '@angular/forms';
import { fromEvent, debounceTime, distinctUntilChanged, switchMap } from 'rxjs'
import { ApiService } from '../apiService/api.service';

@Component({
  selector: 'app-controllers',
  templateUrl: './controllers.component.html',
  styleUrls: ['./_controllers.scss']
})

export class ControllersComponent implements OnDestroy, OnInit{
	@ViewChild('paginator') paginator?: MatPaginator;
	
	dataServiceGetList$?: Subscription
	dataServiceSearchCountry$?: Subscription
	dataServiceAllCountry$?: Subscription
	suscribeSearchControl$?:Subscription
	suscribeSelectSortControl$?: Subscription
	
	listCountrys:Icountrys[] = []
	
	valueSort?:string 
	valueSearch: string = '' 
	valueFilterBy?:string
	isUnMemberChecked: boolean = false;

	sortBy:any[] = [
		{value: 'name', viewValue: 'Name'},
		{value: 'population', viewValue: 'Population'},
		{value: 'area', viewValue: 'Area' }
	];

	regions: any[] = [
		{ value: 'Africa', viewValue: 'Africa' },
		{ value: 'Americas', viewValue: 'America' },
		{ value: 'Asia', viewValue: 'Asia' },
		{ value: 'Europe', viewValue: 'Europa' },
		{ value: 'Oceania', viewValue: 'Oceania' },
	]

	length:number = 0;
	pageSize = 20;
	pageIndex = 0;
	pageSizeOptions = [5,10,15,20,25];

	hidePageSize = false;
	showPageSizeOptions = true;
	showFirstLastButtons = true;
	disabled = false;
	pageEvent?: PageEvent;

	
	searchControl = new FormControl('');
	selectSort = new FormControl('');
	filterBy = new FormControl('');

	constructor(private _share: SharedService, private _apiService:ApiService) {
		this.dataServiceGetList$ = this._share.getListCountry().subscribe({
			next: value => {
				if (value !== undefined) {
					this.listCountrys = value;
					this.length = this.listCountrys.length;
				}
			},
			error: error => {
				console.log(error)
			}
		})
	}

	ngOnInit(): void {
		this._share.setValuePaginate({ page_Size: this.pageSize, page_Number: this.pageIndex + 1 })

		this.suscribeSearchControl$ = this.searchControl.valueChanges.pipe(debounceTime(500), // Retrasa las actualizaciones durante 500 ms
			distinctUntilChanged() // Solo emite si el valor realmente ha cambiado
			)
			.subscribe(query => {
				this.valueSearch =  query!
				if (this.pageIndex > 0) {
					this.paginator?.firstPage()	
				}
				this.logicSearch()
		});

		this.suscribeSelectSortControl$ = this.selectSort.valueChanges.subscribe(value => {
			this.valueSort = value!
			this.sortListCountrys(this.listCountrys)

			if (!this.valueSort && this.valueFilterBy) {
				this.filterByListCountry(this.valueFilterBy)
			}
			else if(!this.valueSort) {
				this.logicSearch()
			}
			
		})

		this.filterBy.valueChanges.subscribe((value => {
			this.valueFilterBy = value!
			if (!this.valueFilterBy) {
				this.allListCountrys()
			} 	
			else {
				this.filterByListCountry(this.valueFilterBy)
			}
			this.logicSearch()
			

			
		}))

	}

	allListCountrys() {
		this.dataServiceAllCountry$ = this._apiService.getallCountrys().subscribe(data => {
			this.sortListCountrys(data)
			this.logicValueSort(data)
		})
	}

	SortNameListCountry(listaCountrys:Icountrys[]):Icountrys[] {
		return listaCountrys.sort((a, b) => (a.name.common > b.name.common) ? 1 : -1)
	}

	SortPopulationListaCountry(listCountry:Icountrys[]):Icountrys[] {
		return listCountry.sort((a, b) => (a.population < b.population) ? 1 : -1)
	}

	SortAreaListCountry(listCountry:Icountrys[]):Icountrys[] {
		return listCountry.sort((a, b) => (a.area < b.area) ? 1 : -1)
	}

	searchCountry(country: string){
		this.dataServiceSearchCountry$ = this._apiService.searchCountry(country).subscribe(data => {
			
			this.sortListCountrys(data)
			this.logicValueSort(data)
			
			
		})
	}

	sortListCountrys(listCountrys: Icountrys[]) {	
		if (this.valueSort === 'name'){
			this._share.setListCountry(this.SortNameListCountry(listCountrys))
			return
		}
		if (this.valueSort === 'population') {
			this._share.setListCountry(this.SortPopulationListaCountry(listCountrys))
			return
		}
		if (this.valueSort === 'area') {
			this._share.setListCountry(this.SortAreaListCountry(listCountrys))
			return
		}
	}

	filterByListCountry(value:string) {
		this._apiService.getCountrysForRegion(value).subscribe(data => {
			this.logicValueSort(data)
			this.sortListCountrys(data)
			
		})
	}
	
	filterListActual(listCountrys: Icountrys[], value: string): Icountrys[]{
		return listCountrys = listCountrys.filter(data=> data.region === value)
	}
	


	logicSearch() {	
		if (!this.valueSearch && this.valueFilterBy) {
			console.log(`Obtener todos los paises con ${this.valueFilterBy}`)
			this.filterByListCountry(this.valueFilterBy)
		}else if (!this.valueSearch) {
			this.allListCountrys()
		}
		else {
			this.searchCountry(this.valueSearch)
		}
	}

	logicValueSort(listCountrys: Icountrys[]) {
		if (this.valueFilterBy && this.valueSearch) {
			console.log(this.filterListActual(listCountrys,this.valueFilterBy))
			this._share.setListCountry(this.filterListActual(listCountrys, this.valueFilterBy))
			return
		}
		if (!this.valueSort || !this.valueFilterBy) {
			this._share.setListCountry(listCountrys)
			return
		}	
	
	}

	fnCheckUnMember(){
		this.isUnMemberChecked = !this.isUnMemberChecked
		if (this.isUnMemberChecked) {
			console.log('Marcado')
		} else {
			console.log('desmarcado')
		}
	}
	
	
	// Manejar evento de pagina
	handlePageEvent(e: PageEvent) {
		this.pageEvent = e;
		this.length = e.length;
		this.pageSize = e.pageSize;
		this.pageIndex = e.pageIndex;
		this._share.setValuePaginate({ page_Size: this.pageSize, page_Number: this.pageIndex + 1})
	}


	
	// establecer opciones de tamaño de página
	setPageSizeOptions(setPageSizeOptionsInput: string) {
		if (setPageSizeOptionsInput) {
		this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
		}
	}

	ngOnDestroy(): void {
		this.dataServiceGetList$?.unsubscribe()
		this.dataServiceSearchCountry$?.unsubscribe()
		this.dataServiceAllCountry$?.unsubscribe()
		this.suscribeSearchControl$?.unsubscribe()
		this.suscribeSelectSortControl$?.unsubscribe()
		console.log('suscripcion detruida desde controller')
	}
  
}
