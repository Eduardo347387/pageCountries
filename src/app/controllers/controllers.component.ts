import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Icountrys, valuePaginate } from '../models/countrys.model';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs';

import { FormControl } from '@angular/forms';
import { fromEvent, debounceTime, distinctUntilChanged, switchMap } from 'rxjs'
import { ApiService } from '../apiService/api.service';

@Component({
  selector: 'app-controllers',
  templateUrl: './controllers.component.html',
  styleUrls: ['./_controllers.scss']
})

export class ControllersComponent implements OnDestroy, OnInit{
	
	dataServiceGetList$?: Subscription
	dataServiceSearchCountry$?: Subscription
	dataServiceAllCountry$?: Subscription
	suscribeSearchControl$?:Subscription
	
	listCountrys:Icountrys[] = []
	listSortCountrys: Icountrys[] = []
	
	valueSort:string = 'all'
	valueSearch: string = ''
	
	sortBy:any[] = [
		{value: 'name', viewValue: 'Name'},
		{value: 'population', viewValue: 'Population'},
		{ value: 'area', viewValue: 'Area' },
		{value: 'all', viewValue: 'All Countrys'},
	];

	regions: any[] = [
		{ value: 'africa', viewValue: 'Africa' },
		{ value: 'america', viewValue: 'America' },
		{ value: 'asia', viewValue: 'Asia' },
		{ value: 'europa', viewValue: 'Europa' },
		{ value: 'oceania', viewValue: 'Oceania' },
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

		this.selectSort.valueChanges.subscribe((value => {
			this.valueSort = value!
			if (value === 'name') {
				this.listCountrys = this.listCountrys.sort((a, b) => (a.name.common > b.name.common) ? 1 : -1)
				this._share.setListCountry(this.listCountrys);
			}
			if (value === 'all') {
				this._apiService.searchCountry(this.valueSearch).subscribe(data => {
					this._share.setListCountry(data);
				})
			}
		}))

		this.suscribeSearchControl$ = this.searchControl.valueChanges.pipe(debounceTime(500), // Retrasa las actualizaciones durante 500 ms
			distinctUntilChanged() // Solo emite si el valor realmente ha cambiado
			)
			.subscribe(query => {
				this.valueSearch =  query!
				// Realice la lógica de búsqueda aquí
				if (query !== null && query?.length !== 0) {

					this.dataServiceSearchCountry$ = this._apiService.searchCountry(this.valueSearch).subscribe(data => {
						if (this.valueSort === 'all') {
							this._share.setListCountry(data);
						}
						if (this.valueSort === 'name') {
							this._share.setListCountry(data.sort((a, b) => (a.name.common > b.name.common) ? 1 : -1));
						}
						
					})
				}

				if (query?.length === 0) {
					this.allListCountrys()
					
				}
			});
	}

	allListCountrys() {
		this.dataServiceAllCountry$ = this._apiService.getallCountrys().subscribe(data => {
			if (this.valueSort === 'all') {
				this._share.setListCountry(data);
			}
			if (this.valueSort === 'name') {
					this._share.setListCountry(data.sort((a, b) => (a.name.common > b.name.common) ? 1 : -1));
			}
		})	
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
		console.log('suscripcion detruida desde controller')
	}
  
}
