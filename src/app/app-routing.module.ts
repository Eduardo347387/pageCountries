import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsCountryComponent } from './details-country/details-country.component';


const routes: Routes = [
  
  {
    path: 'country/:nameCountry',
    component: DetailsCountryComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
