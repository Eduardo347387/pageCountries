import { Component, OnDestroy, OnInit, inject} from '@angular/core';
import { SharedService } from './shared.service';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { LightModeService } from './apiService/light-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./_appComponent.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  estado: boolean = true
  activeThemeLight?:boolean
  dataService$?: Subscription
  datathemeSuscribe$?: Subscription


  private _share = inject(SharedService)
  private _ligthMode = inject(LightModeService)

  ngOnInit(): void {
    this.dataService$ = this._share.getEstado().subscribe({
      next: state => {
        this.estado = state 
      }
    })
    
    this.datathemeSuscribe$ = this._ligthMode.getIsLightMode().pipe(distinctUntilChanged()).subscribe({
      next: state => {
        this.activeThemeLight = state
      }
    })
    
  }

  ngOnDestroy(): void {
    this.dataService$?.unsubscribe()
    this.datathemeSuscribe$?.unsubscribe()
  }

}
