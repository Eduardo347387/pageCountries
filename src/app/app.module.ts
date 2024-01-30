import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormsModule } from '@angular/forms';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatPaginatorModule} from '@angular/material/paginator';
import { JsonPipe } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HeaderComponent } from './header/header.component';
import { ControllersComponent } from './controllers/controllers.component';
import { HttpClientModule } from '@angular/common/http';
import { ListCountrysComponent } from './list-countrys/list-countrys.component';
import { AbbreviateNumberPipe } from './pipes/abbreviate-number.pipe';
import { PaginatePipe } from './pipes/paginate.pipe';
import { DetailsCountryComponent } from './details-country/details-country.component';

import { ReactiveFormsModule } from '@angular/forms';

import { MatRadioModule } from '@angular/material/radio';
import { AreaFormatPipe } from './pipes/area-format.pipe'; 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ControllersComponent,
    ListCountrysComponent,
    AbbreviateNumberPipe,
    PaginatePipe,
    DetailsCountryComponent,
    AreaFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,

    FormsModule,

    MatMenuModule,
    MatButtonModule,

    MatCheckboxModule,
    MatPaginatorModule,
    JsonPipe,
    MatSlideToggleModule,
    HttpClientModule,

    ReactiveFormsModule,
    MatRadioModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
