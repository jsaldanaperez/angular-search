import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { filter, fromEvent } from 'rxjs';
import { SearchService } from '@angular-search/shared/search';
@Component({
  selector: 'angular-search-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent { 
  @ViewChild('modal', { static: true}) modal!:ElementRef;
  @ViewChild('modalContent', { static: true}) modalContent!:ElementRef;
  @ViewChild('searchControl', { static: true}) searchControl!: ElementRef;
  showSearch = false;
  searchValue = '';

  constructor(private renderer: Renderer2, private searchService: SearchService){
    this.subscribeToEvents();
  }

  private subscribeToEvents(): void{
    const hideNavigation = () => {
      this.showSearch = false;
      setTimeout(() => this.renderer.setStyle(this.modal.nativeElement, 'display', 'none'), 200);
      this.searchValue = '';
      this.searchService.search(this.searchValue)
    };

    fromEvent<KeyboardEvent>(window, 'keydown')
      .subscribe((event) =>{ 
        if(event.ctrlKey && event.key === ' ' && !this.showSearch){
          this.renderer.setStyle(this.modal.nativeElement, 'display', 'block');
          setTimeout(() => {
            this.showSearch = true;
            this.searchControl.nativeElement.focus();
          })
        }else if (event.key === 'Escape'){
          hideNavigation();
        }
      })

    fromEvent(window, 'click')
      .pipe(filter((event) => this.showSearch && !event.composedPath().includes(this.modalContent.nativeElement)))
      .subscribe(() => hideNavigation())
  }

  onSearch(): void{
    this.searchService.search(this.searchValue);
  }
  
}
