import {
    Component,
    ViewChild,
    ElementRef,
    ViewEncapsulation,
} from '@angular/core';

import {
    Observable,
    Subject
} from 'rxjs';

import { MessageService } from 'src/app/services/message.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent {

    @ViewChild('searchInput', { read: ElementRef })
    searchInput: ElementRef;

    public searchIcon = 'search';
    private interactedWithSearch = false;

    constructor(private messageService: MessageService) {}


    public search() {
        const searchTerm = this.searchInput.nativeElement.value;
        this.messageService.sendMessage({ value: searchTerm, action: 'SHOW_TICKER' });
        this.interactedWithSearch = true;
    }

    public toggleSearch() {

        const searchContainer = document.getElementById('search-container');
        this.toggleClass(searchContainer, 'open');
        this.searchIcon = this.hasClass(searchContainer, 'open') ? 'clear' : 'search';
        if (!this.hasClass(searchContainer, 'open') && this.interactedWithSearch) {
            this.messageService.sendMessage({ action: 'CLEAR' });
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