import { Component, Input, Output, EventEmitter, signal, effect } from '@angular/core';

@Component({
  selector: 'country-search-input',
  standalone: true,
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  @Input() placeholder: string = 'buscar';
  @Output() value = new EventEmitter<string>();

  inputValue = signal<string>('');

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, 500);

    onCleanup(() => clearTimeout(timeout));
  })
}
