import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-details-country',
  templateUrl: './details-country.component.html',
  styleUrls: ['./details-country.component.scss']
})
export class DetailsCountryComponent implements OnInit, OnDestroy {
  nameCountry?: string
  estado?: boolean
  estadoService$?:Subscription
  
  constructor(private route: ActivatedRoute, private router: Router, private _share: SharedService) {
    this.estadoService$ = this._share.getEstado().subscribe({
      next: state => {
          this.estado = state
      },
      error: error => {
        console.log(error)
      }
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.nameCountry = params['nameCountry']
    })
    console.log(this.nameCountry)
  } 
  
  @HostListener('window:popstate', ['$event'])
    onPopState(event: Event) {
    this.volver();
  }

  volver() {
    console.log('volver')
    this._share.setEstado(true)
    this.router.navigate([''])
  }

  ngOnDestroy(): void {
    this.estadoService$?.unsubscribe()
    console.log('suscripcion destruidad desde detail country')
  }  

}
