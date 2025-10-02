import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { map, Observable, pipe, catchError, throwError, delay, of, count, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient)
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();

  searchByCapital( query: string ): Observable<Country[]> {
    query = query.toLowerCase();
    // console.log('searchByCountry', query);
    // return of([]);

    if ( this.queryCacheCapital.has(query) ) {
      // console.log('Cache Capital: ', query);
      return of ( this.queryCacheCapital.get(query)! );
    }

    console.log('msg a servidor por: ', query);

    return this.http.get<RESTCountry[]>(`${ API_URL }/capital/${ query }`)
    .pipe(
      map(resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap((countries) => this.queryCacheCapital.set(query, countries) ),
      delay(500),
      catchError(error =>{
        console.error('Error fetching countries:', error);
        return throwError(() => new Error(`No se encuentran coincidencias de: "${ query }"`));
      })
    )
  }

  searchByCountry( query: string ): Observable<Country[]> {
    query = query.toLowerCase();

    if ( this.queryCacheCountry.has(query) ) {
      // console.log('Cache Country: ', query);
      return of ( this.queryCacheCountry.get(query)! );
    }

    console.log('msg a servidor por: ', query);

    return this.http.get<RESTCountry[]>(`${ API_URL }/name/${ query }`)
    .pipe(
      map(resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap((countries) => this.queryCacheCountry.set(query, countries) ),
      delay(500),
      catchError(error =>{
        console.error('Error fetching countries:', error);
        return throwError(() => new Error(`No se encuentran coincidencias de: "${ query }"`));
      })
    )
  }

    searchByCountryByAlphaCode( code: string ){
    // code = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${ API_URL }/alpha/${ code }`)
    .pipe(
      map(resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      map (countries => countries.at(0)),
      delay(500),
      catchError(error =>{
        console.error('Error fetching countries:', error);
        return throwError(() => new Error(`No se encuentran un país con el código: "${ code }"`));
      })
    )
  }

  searchByRegion( region: Region ): Observable<Country[]> {

    if ( this.queryCacheCountry.has(region) ) {
      // console.log('Cache Country: ', region);
      return of ( this.queryCacheCountry.get(region)! );
    }

    console.log('msg a servidor por: ', region);

    return this.http.get<RESTCountry[]>(`${ API_URL }/region/${ region }`)
    .pipe(
      map(resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap((countries) => this.queryCacheCountry.set(region, countries) ),
      delay(500),
      catchError(error =>{
        console.error('Error fetching countries:', error);
        return throwError(() => new Error(`No se encuentran coincidencias de: "${ region }"`));
      })
    )
  }
}
