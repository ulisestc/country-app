import { Component, Input } from '@angular/core';
// import { RESTCountry } from '../../interfaces/rest-countries.interface';
import { NgFor } from '@angular/common';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-list',
  standalone: true,
  imports: [
    NgFor
  ],
  templateUrl: './country-list.component.html',
})
export class CountryListComponent {
  @Input({ required: true }) countries!: Country[];

  trackByCountryCode(index: number, country: Country): string {
    return country.cca2;
  }
}
