import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchService } from '../search.service';
import { LookUpService } from '../look-up.service';
import { SearchModalEventsService } from './search-modal-events.service';

@Component({
  selector: 'angular-search-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
})
export class SearchModalComponent<T> implements AfterViewInit {
  @ViewChild('modal', { static: true}) modal!:ElementRef;
  @ViewChild('modalContent', { static: true}) modalContent!:ElementRef;
  @ViewChild('searchControl', { static: true}) searchControlElement!: ElementRef<HTMLInputElement>;
  @ViewChild('closeButton', { static: true}) closeButtonElement!: ElementRef;
  public showSearch = false;
  public searchValue = '';
  public lookup$!: Observable<boolean>;


  constructor(
    private lookupService: LookUpService,
    private searchService: SearchService,
    private searchModalEventsService: SearchModalEventsService){
  }

  public ngAfterViewInit(): void{
    this.lookup$ = this.lookupService.lookup$;
    this.searchModalEventsService.initialize({
      modal: this.modal,
      modalContent: this.modalContent,
      searchControl: this.searchControlElement,
      closeButton: this.closeButtonElement
    });
    this.searchModalEventsService.showSearch$.subscribe((show) =>{
      this.showSearch = show;
      this.searchValue = '';
    });
  }

  public onSearch(): void{
    this.searchService.search(this.searchValue);
  }
}
