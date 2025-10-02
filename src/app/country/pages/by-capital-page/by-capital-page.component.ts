import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  standalone: true,
  imports: [SearchInputComponent, CountryListComponent, NgIf],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  CountryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  router = inject(Router);

  isLoading = signal (false);
  isError = signal<string | null>(null);
  countries = signal<Country[]>([]);

  ngOnInit(): void {
    if (this.queryParam) {
      this.onSearch(this.queryParam);
  }
  }

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
    // if (query != ''){
      this.CountryService.searchByCapital( query ).subscribe({
        next: (countries) => {
            this.isLoading.set(false);
            this.countries.set(countries);
            this.router.navigate(['/country/by-capital'], { queryParams: { query } });
        },
        error: (err) => {
          console.log(err);
          this.isLoading.set(false);
          this.countries.set([]);
          this.isError.set(err);
          this.router.navigate(['/country/by-capital'], { queryParams: { query } });
        }
      })
    // }
  }
}
