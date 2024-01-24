import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Icountrys, valuePaginate } from '../models/countrys.model';

@Component({
  selector: 'app-controllers',
  templateUrl: './controllers.component.html',
  styleUrls: ['./_controllers.scss']
})
export class ControllersComponent implements OnInit, OnChanges{
	@Input() countrysList: Icountrys[] = []
	@Output() valuePaginateChanged = new EventEmitter<valuePaginate>()
	
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

	length = 249;
	pageSize = 20;
	pageIndex = 0;
	pageSizeOptions = [5,10,15,20,25];

	hidePageSize = false;
	showPageSizeOptions = true;
	showFirstLastButtons = true;
	disabled = false;
	

	pageEvent?: PageEvent;

	ngOnInit(): void {
		this.emitirValue()
	}

	ngOnChanges(changes: SimpleChanges): void {

	}
	
	// Manejar evento de pagina
	handlePageEvent(e: PageEvent) {
		this.pageEvent = e;
		this.length = e.length;
		this.pageSize = e.pageSize;
		this.pageIndex = e.pageIndex;
		this.emitirValue()
	}

	emitirValue(): void{
		const values: valuePaginate = { page_Size: this.pageSize, page_Number: this.pageIndex+1 }
		this.valuePaginateChanged.emit(values)
	}
	
	// establecer opciones de tamaño de página
	setPageSizeOptions(setPageSizeOptionsInput: string) {
		if (setPageSizeOptionsInput) {
		this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
		}
	}
  
}
