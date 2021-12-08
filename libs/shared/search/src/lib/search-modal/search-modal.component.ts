import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { fromEvent, filter, merge } from 'rxjs';
import { SearchService } from '../search.service';
import { LookUpService } from '../look-up.service';
import { TabIndexService } from '../tab-index.service';
import { WindowScrollingService } from '../window-scrolling.service';

@Component({
  selector: 'angular-search-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss']
})
export class SearchModalComponent implements AfterViewInit {
  @ViewChild('modal', { static: true}) modal!:ElementRef;
  @ViewChild('modalContent', { static: true}) modalContent!:ElementRef;
  @ViewChild('searchControl', { static: true}) searchControlElement!: ElementRef<HTMLInputElement>;
  @ViewChild('closeButton', { static: true}) closeButtonElement!: ElementRef;
  public showSearch = false;
  public searchValue = '';
  public lookup = false;

  private closeButtonIndex = 0;
  private searchControlIndex = 1;

  constructor(
    private windowScrollingService: WindowScrollingService,
    private tabIndexService: TabIndexService,
    private lookupService: LookUpService,
    private renderer: Renderer2, 
    private searchService: SearchService){
  }

  public ngAfterViewInit(): void{
    this.subscribeToActivateEvent();
    this.subscribeToNavigationEvents();
    this.subscribeToCloseEvents();
    this.lookupService.lookup$.subscribe((lookup) => this.lookup = lookup);
  }

  public onSearch(): void{
    this.searchService.search(this.searchValue);
  }

  public onSearchFocus(): void{
    this.tabIndexService.setCurrentIndex(this.searchControlIndex);
  }

  private subscribeToActivateEvent(): void{
    fromEvent<KeyboardEvent>(window, 'keydown')
      .pipe(filter(() => !this.showSearch))
      .subscribe((event) =>{ 
        if(event.ctrlKey && event.key === ' ' && !this.showSearch){
          this.windowScrollingService.disable();
          this.renderer.setStyle(this.modal.nativeElement, 'display', 'block');
          setTimeout(() => {
            this.showSearch = true;
            this.focus(this.searchControlElement);
          })
        }
      });
  }

  private subscribeToNavigationEvents(): void{

      fromEvent<KeyboardEvent>(window, 'keydown')
        .pipe(filter(() => this.showSearch))
        .subscribe((event) => {

        const increase = () => {
          event.preventDefault();
          this.tabIndexService.increaseCurrentIndex()
        };

        const decrease = () => {
          event.preventDefault();
          this.tabIndexService.decreaseCurrentIndex()
        };

        switch(event.key){
          case 'Escape': this.hideNavigation(); break;
          case 'ArrowUp': decrease(); break;
          case 'ArrowDown': increase(); break;
          case 'Tab': event.shiftKey ? decrease() : increase(); break;
        }
      });

      this.tabIndexService.currentIndex$
      .subscribe((index) => {
        switch(index){
          case this.closeButtonIndex: this.focus(this.closeButtonElement); break;
          case this.searchControlIndex: 
            this.focus(this.searchControlElement);
            setTimeout(() => this.searchControlElement.nativeElement.select());
            break;
        }
      });
  }

  private focus(element: ElementRef): void{
    element.nativeElement.focus();
  }

  private subscribeToCloseEvents(): void{
    const clickOutsideOfModalObservable =  fromEvent(window, 'click')
      .pipe(filter((event) => this.showSearch && !event.composedPath().includes(this.modalContent.nativeElement)));
    const closeButtonClickObservale =  fromEvent(this.closeButtonElement.nativeElement, 'click');
    const onItemSelectedObservable = this.searchService.selected$;

    merge(
      clickOutsideOfModalObservable, 
      closeButtonClickObservale, 
      onItemSelectedObservable)
    .subscribe(this.hideNavigation);
  }

  private hideNavigation = () => {
    this.showSearch = false;
    this.windowScrollingService.enable();
    setTimeout(() => {
      this.renderer.setStyle(this.modal.nativeElement, 'display', 'none')
      this.searchValue = '';
      this.searchService.search(this.searchValue)
    }, 200);
  }
}
