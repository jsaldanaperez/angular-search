import { Component, ElementRef, ViewChild } from '@angular/core';
import { filter, fromEvent } from 'rxjs';

@Component({
  selector: 'angular-search-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent { 
  @ViewChild('modal', { static: true}) modal!:ElementRef;
  title = 'shell';
  showSearch = false;

  constructor(){
    fromEvent<KeyboardEvent>(window, 'keydown')
      .subscribe((event) =>{ 
        if(event.ctrlKey && event.key === ' ' && !this.showSearch){
          this.showSearch = true;
        }else if (event.key === 'Escape'){
          this.showSearch = false;
        }
      })

    fromEvent(window, 'click')
      .pipe(filter((event) => this.showSearch && !event.composedPath().includes(this.modal.nativeElement)))
      .subscribe(() => this.showSearch = false)
  }
}
