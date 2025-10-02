import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { count } from 'rxjs';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { NgIf } from '@angular/common';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  standalone: true,
  imports: [SearchInputComponent, CountryListComponent, NgIf],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  CountryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  router = inject(Router);

  ngOnInit(): void {
    if (this.queryParam) {
      this.onSearch(this.queryParam);
  }
  }

    isLoading = signal (false);
    isError = signal<string | null>(null);
    countries = signal<Country[]>([]);

    onSearch( query: string){
      if(query.trim() === ''){
      this.countries.set([]);
      // this.isError.set('No se puede buscar un país con un valor vacío');
      return;
    }
      if (this.isLoading()) return;
      this.isLoading.set(true);
      this.isError.set(null);

      console.log({query});
      this.CountryService.searchByCountry( query ).subscribe({
        next: (countries) => {
            this.isLoading.set(false);
            this.countries.set(countries);
            this.router.navigate(['/country/by-capital?'], { queryParams: { query } });
        },
        error: (err) => {
          console.log(err);
          this.isLoading.set(false);
          this.countries.set([]);
          this.isError.set(err);
          this.router.navigate(['/country/by-capital?'], { queryParams: { query } });
        }
      })
    }
}
