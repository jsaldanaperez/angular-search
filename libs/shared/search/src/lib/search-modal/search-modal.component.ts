import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { fromEvent, filter } from 'rxjs';
import { SearchService } from '../search.service';
import { LookUpService } from '../look-up.service';

@Component({
  selector: 'angular-search-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss']
})
export class SearchModalComponent implements AfterViewInit {
  @ViewChild('modal', { static: true}) modal!:ElementRef;
  @ViewChild('modalContent', { static: true}) modalContent!:ElementRef;
  @ViewChild('searchControl', { static: true}) searchControl!: ElementRef;
  @ViewChild('closeButton', { static: true}) closeButton!: ElementRef;
  showSearch = false;
  searchValue = '';
  public lookup = false;

  constructor(
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
      .subscribe((event) =>{ 
        if(event.ctrlKey && event.key === ' ' && !this.showSearch){
          this.renderer.setStyle(this.modal.nativeElement, 'display', 'block');
          setTimeout(() => {
            this.showSearch = true;
            this.searchControl.nativeElement.focus();
          })
        }else if (event.key === 'Escape'){
          this.hideNavigation();
        }
      })

    fromEvent(window, 'click')
      .pipe(filter((event) => this.showSearch && !event.composedPath().includes(this.modalContent.nativeElement)))
      .subscribe(() => this.hideNavigation())

    fromEvent(this.closeButton.nativeElement, 'click')
      .subscribe(() => this.hideNavigation())
  }

  private hideNavigation(): void{
    this.showSearch = false;
    setTimeout(() => {
      this.renderer.setStyle(this.modal.nativeElement, 'display', 'none')
      this.searchValue = '';
      this.searchService.search(this.searchValue)
    }, 200);
  }

  onSearch(): void{
    this.searchService.search(this.searchValue);
  }
}
