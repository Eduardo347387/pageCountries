import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LightModeService {

  constructor() { }

  private isLightMode = new BehaviorSubject<boolean>(false);

  // Utiliza shareReplay para cachear el resultado y compartirlo entre los suscriptores
  private isLightMode$ = this.isLightMode.asObservable().pipe(shareReplay(1));

  getIsLightMode() {
    return this.isLightMode$;
  }

  setIsLightMode(state: boolean) {
    this.isLightMode.next(state);
  }

  toggleDarkMode(): void {
    this.isLightMode.next(!this.isLightMode.value);
  }



















  
  /* private isLightMode= new BehaviorSubject<boolean>(false)

  getIsLightMode(){
    return this.isLightMode.asObservable();
  }

  settIsLightMode(state:boolean){
    this.isLightMode.next(state)
  }

  toggleDarkMode(): void {
    this.isLightMode.next(!this.isLightMode.value);
  } */


}
