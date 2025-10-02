import { DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Country } from 'src/app/country/interfaces/country.interface';

@Component({
  selector: 'country-information-page',
  standalone: true,
  imports: [
    DecimalPipe
  ],
  templateUrl: './country-information.component.html',
})
export class CountryInformationComponent {
  @Input({ required: true }) country!: Country;

  private _currentYear: number = new Date().getFullYear();
  
  public get currentYear(): number {
    return this._currentYear;
  }

}
