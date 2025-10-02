import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Region } from '../../interfaces/region.type';
import { NgFor } from '@angular/common';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-region-page',
  standalone: true,
  imports: [CountryListComponent, NgFor],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  isLoading = signal (false);
  isError = signal<string | null>(null);
  countries = signal<Country[]>([]);

  countryService = inject(CountryService);

  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];

  selectedRegion = signal<Region | null>(null)

  onRegionSelected(region: Region) {
    this.selectedRegion.set(region)

    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.isError.set(null);

    console.log({region});
    this.countryService.searchByRegion( region ).subscribe({
      next: (countries) => {
          this.isLoading.set(false);
          this.countries.set(countries);
      },
      error: (err) => {
        console.log(err);
        this.isLoading.set(false);
        this.countries.set([]);
        this.isError.set(err);
      }
    })

  }
}
