import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs';
import { ApiService } from '../apiService/api.service';
import { Icountrys, Name, Translation, Currencies, Aed, Flags, button } from '../models/countrys.model';
@Component({
  selector: 'app-details-country',
  templateUrl: './details-country.component.html',
  styleUrls: ['./_details-country.scss']
})
export class DetailsCountryComponent implements OnInit, OnDestroy {

  codeCountry?: string
  borders:button [] = []
 
  dataCountry?: Icountrys []
  estado?: boolean
  estadoService$?:Subscription
  suscriptionRoute?: Subscription
  dataServiceSearch$?:Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _share: SharedService,
    private _apiservice:ApiService
  ){
    this.estadoService$ = this._share.getEstado().subscribe({
      next: state => {
          this.estado = state
      }
    })
  }

  ngOnInit(): void {
    this.suscriptionRoute = this.route.params.subscribe(params => {
      this.codeCountry = params['code']
      this.borders = []
      
      this.fnSearchCodeCountry(this.codeCountry!).then(data => {
        this.dataCountry = data
        this.getBorders(data[0].borders!)
      })
   
    })
  } 

  getNewCountry(code:string) {
    this.router.navigate(['/country', code]);
  }

  
  getBorders(border: string[]) {
    if (border !== undefined) {
      border.forEach(data => {
      this.getflagName(data)
      })
    }
  }

  getflagName(code:string) {
    this.fnSearchCodeCountry(code).then(data => {
      const objeto = {icon:data[0].flag,name:data[0].cca3}
      this.borders = [...this.borders,objeto]
    })
   
  }
  
  fnSearchCodeCountry(code: string): Promise<Icountrys[]> {
    return new Promise((resolve) => {
      this.dataServiceSearch$ =  this._apiservice.searchCodeCountry(code).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }

  getNameNative(name: Name ):string{
    if (name.nativeName !== undefined) {
      const claves = Object.keys(name.nativeName)
      if (claves.length > 0) {
        const primerElemento = name.nativeName[claves[0]]
        return primerElemento.official
      }else return  'Not found'
    } else return 'Value Invalido'
  }

  getTopLevelDomain(data:string[] | undefined):string {
    if (data !== undefined) return data[0]
    else return 'Not found'
  } 

  getCurrencies(Currencies:any | undefined):string{ 
    if (Currencies !== undefined) {
      const claves = Object.keys(Currencies)
      let key = claves[0]
      if (claves.length > 0) {
        let divisa = Currencies[key]
        return divisa.name
      }else return 'Not found'
    }else return 'Invalid'
   
  }
  
  getLanguages(languages: { [key: string]: string } | undefined):string{
    if (languages !== undefined) {
      let cadena = '';
      let primeraVez = true;
      for (const language in languages) {
        if (primeraVez) {
          cadena += languages[language];
          primeraVez = false;
        } else {
          cadena += ',' + languages[language];
        }
      }
      return cadena
    }else return 'No found'
  }
    
  @HostListener('window:popstate', ['$event'])
    onPopState(event: Event) {
    this.volver();
  }


  volver() {
    this._share.setEstado(true)
    this.router.navigate([''])
  }

  ngOnDestroy(): void {
    this.estadoService$?.unsubscribe()
    this.suscriptionRoute?.unsubscribe()
     this.dataServiceSearch$?.unsubscribe()
  }  

}
