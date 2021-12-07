import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { fromEvent, filter, interval, scan, takeWhile, tap } from 'rxjs';
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
  @ViewChild('closeButton', { static: true}) closeButton!: ElementRef;
  @ViewChild('searchResults', { static: false}) searchResults?: ElementRef;
  showSearch = false;
  searchValue = '';
  public lookup = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private windowScrollingService: WindowScrollingService,
    private tabIndexService: TabIndexService,
    private lookupService: LookUpService,
    private renderer: Renderer2, 
    private searchService: SearchService){
  }

  public ngAfterViewInit(): void{
    this.subscribeToEvents();
    this.searchService.selected$.subscribe(() =>this.hideNavigation());
    this.lookupService.lookup$.subscribe((lookup) => this.lookup = lookup);
  }

  private subscribeToEvents(): void{
    fromEvent<KeyboardEvent>(window, 'keydown')
      .pipe(filter(() => !this.showSearch))
      .subscribe((event) =>{ 
        if(event.ctrlKey && event.key === ' ' && !this.showSearch){
          this.windowScrollingService.disable();
          this.renderer.setStyle(this.modal.nativeElement, 'display', 'block');
          setTimeout(() => {
            this.showSearch = true;
            this.searchControlElement.nativeElement.focus();
          })
        }
      })

      fromEvent<KeyboardEvent>(window, 'keydown')
      .pipe(filter(() => this.showSearch))
      .subscribe((event) =>{ 
        if (event.key === 'Escape'){
          this.hideNavigation();
        } 
        else if (event.key === 'ArrowUp'){
          if(this.tabIndexService.currentIndex === this.tabIndexService.startIndex){
            this.scrollToTop(this.searchResults?.nativeElement);
            this.tabIndexService.setCurrentIndex(1);
            this.searchControlElement.nativeElement.focus();
            setTimeout(() => this.searchControlElement.nativeElement.select());
          }else{
            this.tabIndexService.decreaseCurrentIndex();
          }
        }else if (event.key === 'ArrowDown'){
          this.tabIndexService.increaseCurrentIndex();
        }else if (event.key === 'Tab' && this.tabIndexService.isOnLastIndex){
          event.stopPropagation();
        }
        console.log(event.key === 'Tab', this.tabIndexService.isOnLastIndex)
      })

    fromEvent(window, 'click')
      .pipe(filter((event) => this.showSearch && !event.composedPath().includes(this.modalContent.nativeElement)))
      .subscribe(() => this.hideNavigation())

    fromEvent(this.closeButton.nativeElement, 'click')
      .subscribe(() => this.hideNavigation())
  }

  private hideNavigation(): void{
    this.showSearch = false;
    this.windowScrollingService.enable();
    this.tabIndexService.setCurrentIndex(1);
    setTimeout(() => {
      this.renderer.setStyle(this.modal.nativeElement, 'display', 'none')
      this.searchValue = '';
      this.searchService.search(this.searchValue)
    }, 200);
  }

  onSearch(): void{
    this.searchService.search(this.searchValue);
  }

  private scrollToTop(nativeElement: HTMLElement): void {
    const duration = 100;
    const intervalValue = 5;
    const move = nativeElement.scrollTop * intervalValue / duration;
    interval(intervalValue).pipe(
      scan((acc) => acc - move, nativeElement.scrollTop),
      tap(position => nativeElement.scrollTop = position),
      takeWhile(val => val > 0)).subscribe();
  }
}
