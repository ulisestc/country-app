import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'country-search-input',
  standalone: true,
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent { 
  @Input() placeholder: string = 'buscar';
  @Output() value = new EventEmitter<string>();
}
