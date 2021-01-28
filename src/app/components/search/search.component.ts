import { Component, Output, EventEmitter, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchIcon = 'search';

  @ViewChild('searchInput', { read: ElementRef })
  private searchInput!: ElementRef;

  interactedWithSearch = false;

  @Output() searchEvent = new EventEmitter<{ query? : string, action: 'SEARCH' | 'CLEAR' }>();

  constructor() { }


  search() {
    const searchTerm = this.searchInput.nativeElement.value;
    console.log(`Search: ${searchTerm}`);
    this.searchEvent.emit({ query: searchTerm, action: 'SEARCH' });
    this.interactedWithSearch = true;
  }

  toggleSearch() {
    console.log(`toggleSearch: this.interactedWithSearch: ${this.interactedWithSearch}`);
    const searchContainer = document.getElementById('search-container');
    this.toggleClass(searchContainer, 'open');
        this.searchIcon = this.hasClass(searchContainer, 'open') ? 'clear' : 'search';
    if (!this.hasClass(searchContainer, 'open') && this.interactedWithSearch) {
      console.log("clearing search)")
      this.searchEvent.emit({ action: 'CLEAR' });
      this.interactedWithSearch = false;
      this.searchInput.nativeElement.value = '';
    }
  }

  private hasClass(element: any, className: string) {
    return element.classList.contains(className);
  }

  private toggleClass(element: any, className: string) {
    this.hasClass(element, className) ? element.classList.remove(className) : element.classList.add(className);
  }

}
