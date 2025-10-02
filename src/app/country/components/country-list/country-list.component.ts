import { Component, Input } from '@angular/core';
// import { RESTCountry } from '../../interfaces/rest-countries.interface';
import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Country } from '../../interfaces/country.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'country-list',
  standalone: true,
  imports: [
    NgFor,
    DecimalPipe,
    RouterLink,
    NgIf
],
  templateUrl: './country-list.component.html',
})
export class CountryListComponent {
  @Input({ required: true }) countries!: Country[];
  @Input() isLoading: boolean = false;
  // @Input() isEmpty: boolean = false;
  
  trackByCountryCode(index: number, country: Country): string {
    return country.cca2;
  }
}
