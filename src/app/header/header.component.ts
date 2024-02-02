import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, inject} from '@angular/core';
import { LightModeService } from '../apiService/light-mode.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./_header.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  private _lightMode = inject(LightModeService)

  datathemeSuscribe?: Subscription
  theme?: boolean

  ngOnInit(): void {
    this.datathemeSuscribe = this._lightMode.getIsLightMode().subscribe({
        next: data => {
          this.theme = data
        }
      })
  }


   toggleLightMode() {
     this._lightMode.toggleDarkMode()
   }
  
  ngOnDestroy(): void {
      this.datathemeSuscribe?.unsubscribe()
  }
 

}
