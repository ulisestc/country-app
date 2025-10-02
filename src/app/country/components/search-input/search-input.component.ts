import { Component, Input, Output, EventEmitter, signal, effect, OnInit } from '@angular/core';

@Component({
  selector: 'country-search-input',
  standalone: true,
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent implements OnInit {
  @Input() placeholder: string = 'buscar';
  @Input() initialValue: string = '';
  @Output() value = new EventEmitter<string>();

  inputValue = signal<string>('');

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, 500);

    onCleanup(() => clearTimeout(timeout));
  })

  ngOnInit(): void {
    this.inputValue.set(this.initialValue);
  }
}
