import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Icountrys} from '../models/countrys.model';
import { SharedService } from '../shared.service';
import { Subscription} from 'rxjs';

import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged} from 'rxjs'
import { ApiService } from '../apiService/api.service';
import { LightModeService } from '../apiService/light-mode.service';

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
	dataServiceCaregorty$?:Subscription
	suscribeSearchControl$?:Subscription
	suscribeSelectSortControl$?: Subscription
	suscribeFilterControl$?: Subscription
	datathemeSuscribe$?: Subscription
	
	activeThemeLight?:boolean
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
	pageSize = 15;
	pageIndex = 0;
	pageSizeOptions = [5,10,15,20,25];

	hidePageSize = false;
	showPageSizeOptions = true;
	showFirstLastButtons = true;
	disabled = false;
	pageEvent?: PageEvent;

	
	searchControl = new FormControl('');
	selectSortControl = new FormControl('');
	filterByControl = new FormControl('');

	private _lightMode = inject(LightModeService)
	private _share = inject(SharedService)
	private _apiService = inject(ApiService)


	ngOnInit(): void {
		this._share.setValuePaginate({ page_Size: this.pageSize, page_Number: this.pageIndex + 1 })

		this.datathemeSuscribe$ = this._lightMode.getIsLightMode().pipe(distinctUntilChanged()).subscribe({
			next: state => {
				this.activeThemeLight = state
			}
		})

		this.dataServiceGetList$ = this._share.getListCountry().subscribe({
			next: value => {
				if (value !== undefined) {
					this.listCountrys = value;
					this.length = this.listCountrys.length;
				}
			}
		})

		this.suscribeSearchControl$ = this.searchControl.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe({
			next: value => {
				this.valueSearch = value!
				this.validateIndexPaginate()
				this.logicSearch()
			}
		});

		this.suscribeSelectSortControl$ = this.selectSortControl.valueChanges.subscribe({
			next: value => {
				this.valueSort = value!
				this.validateIndexPaginate()
				this.sortListCountrys(this.listCountrys)

				if (!this.valueSort && this.valueFilterBy && this.valueSearch) {
					this.searchCountry(this.valueSearch)
				}
				else if(!this.valueSort) {
					this.logicSearch()
				}
			}
		})

		this.suscribeFilterControl$ = this.filterByControl.valueChanges.subscribe(({
			next: value => {
				this.valueFilterBy = value!
				this.validateIndexPaginate()
				
				if (!this.valueFilterBy) {
					this.allListCountrys()
				} 	
				else {
					this.filterByListCountry(this.valueFilterBy)
				}
				this.logicSearch()
			}
		}))

	}


	allListCountrys() {
		this.dataServiceAllCountry$ = this._apiService.getallCountrys().subscribe({
			next: data => {
				this.sortListCountrys(data)
				this.logicValueSort(data)
			}
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

	
	searchCountry(country: string) {
		this.dataServiceSearchCountry$ = this._apiService.searchCountry(country).subscribe({
			next: data => {
				this.sortListCountrys(data)
				this.logicValueSort(data)
			},
			error: error => {
				if (!error) {
					this._share.setListCountry(this.listCountrys=[])
				}
			}
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
		this.dataServiceCaregorty$ = this._apiService.getCountrysForRegion(value).subscribe(data => {
			this.logicValueSort(data)
			this.sortListCountrys(data)
			
		})
	}
	
	filterListActual(listCountrys: Icountrys[], value: string): Icountrys[]{
		return listCountrys = listCountrys.filter(data=> data.region === value)
	}
	


	logicSearch() {	
		if (!this.valueSearch && this.valueFilterBy) {
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

	validateIndexPaginate() {
		if (this.pageIndex > 0) {
			this.paginator?.firstPage()	
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
		this.suscribeFilterControl$?.unsubscribe()
		this.dataServiceCaregorty$?.unsubscribe()
		this.datathemeSuscribe$?.unsubscribe()
	}
  
}
