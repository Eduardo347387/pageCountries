import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Icountrys, valuePaginate } from '../models/countrys.model';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-controllers',
  templateUrl: './controllers.component.html',
  styleUrls: ['./_controllers.scss']
})
export class ControllersComponent implements OnDestroy{

	dataService$?: Subscription
	
	selectedValue?: string;

	sortBy:any[] = [
		{value: 'name', viewValue: 'Name'},
		{value: 'population', viewValue: 'Population'},
		{value: 'area', viewValue: 'Area'},
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

	constructor(private _share: SharedService) {
		this.dataService$ = this._share.getListCountry().subscribe({
			next: value => {
				if (value !== undefined) {
					this.length = value?.length
				}
			},
			error: error => {
				this.length = 0
				console.log(error)
			}
		})
	}
	
	
	// Manejar evento de pagina
	handlePageEvent(e: PageEvent) {
		this.pageEvent = e;
		this.length = e.length;
		this.pageSize = e.pageSize;
		this.pageIndex = e.pageIndex;
		this._share.setValuePaginate({ page_Size: this.pageSize, page_Number: this.pageIndex + 1 })
	}


	
	// establecer opciones de tamaño de página
	setPageSizeOptions(setPageSizeOptionsInput: string) {
		if (setPageSizeOptionsInput) {
		this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
		}
	}

	ngOnDestroy(): void {
		this.dataService$?.unsubscribe()
		console.log('suscripcion detruida desde controller')
	}
  
}
