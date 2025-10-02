import { Component, inject, signal, OnInit } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Region } from '../../interfaces/region.type';
import { NgFor, NgIf } from '@angular/common';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-region-page',
  standalone: true,
  imports: [CountryListComponent, NgFor, NgIf],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent implements OnInit {
  isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<Country[]>([]);

  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';

  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];

  selectedRegion = signal<Region>(
    (this.queryParam as Region) || 'Americas'
  );

  ngOnInit(): void {
    // cargar al iniciar
    this.onRegionSelected(this.selectedRegion());
  }

  onRegionSelected(region: Region) {
    this.selectedRegion.set(region);

    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.isError.set(null);

    this.countryService.searchByRegion(region).subscribe({
      next: (countries) => {
        this.isLoading.set(false);
        this.countries.set(countries);
        this.router.navigate(['/country/by-region'], { queryParams: { region } });
      },
      error: (err) => {
        console.log(err);
        this.isLoading.set(false);
        this.countries.set([]);
        this.isError.set(err);
        this.router.navigate(['/country/by-region'], { queryParams: { region } });
      }
    });
  }
}
