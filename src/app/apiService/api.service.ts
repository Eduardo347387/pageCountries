import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Icountrys } from '../models/countrys.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL = 'https://restcountries.com/v3.1/';

  constructor(private _httpClient: HttpClient) { }

  public getallCountrys(): Observable<Icountrys[]> {
    return this._httpClient.get<Icountrys[]>(`${this.baseURL}all`)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getCountrysForRegion(region: string): Observable<Icountrys[]> {
    return this._httpClient.get<Icountrys[]>(`${this.baseURL}region/${region}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getCountryUNMenber(status: boolean): Observable<Icountrys[]> {
    return this._httpClient.get<Icountrys[]>(`${this.baseURL}independent?status=${status}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  public searchCountry(nameCountry: string): Observable<Icountrys[]> {
    return this._httpClient.get<Icountrys[]>(`${this.baseURL}name/${nameCountry}`)
      .pipe(
        catchError(this.handleError)
      );
  }

   public searchCodeCountry(code: string): Observable<Icountrys[]> {
    return this._httpClient.get<Icountrys[]>(`${this.baseURL}alpha/${code}`)
      .pipe(
        catchError(this.handleError)
    );
  }

  

  private handleError(error: HttpErrorResponse) {
    return throwError(false);    
  }
}























/* import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icountrys } from '../models/countrys.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL = 'https://restcountries.com/v3.1/';

  constructor(private _httpClient: HttpClient) { }

  public getallCountrys(): Observable<Icountrys[]>{
    return this._httpClient.get<Icountrys[]>(`${this.baseURL}all`)
  }

  public getCountrysForRegion(region:string): Observable<Icountrys[]>{
      return this._httpClient.get<Icountrys[]>(`${this.baseURL}region/${region}`)
  }

  public getCountryUNMenber(status:boolean): Observable<Icountrys[]>{
    return this._httpClient.get<Icountrys[]>(`${this.baseURL}independent?status=${status}`)
  }

  public searchCountry(nameCountry: string): Observable<Icountrys[]>{
    return this._httpClient.get<Icountrys[]>(`${this.baseURL}name/${nameCountry}`)
  }


}
 */