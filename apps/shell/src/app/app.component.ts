import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { filter, fromEvent } from 'rxjs';
import { SearchService } from '@angular-search/shared/search';
import { Router } from '@angular/router';
@Component({
  selector: 'angular-search-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent { 

  constructor(private searchService: SearchService, private router: Router){
    this.searchService.selected$.subscribe((selection) =>{
      let path = selection.domain;
      if(selection.path){
        path += `/${selection.path}`;
      }
      if(selection.params){
        this.router.navigate([path, selection.params]);
      }else{
        this.router.navigate([path]);
      }
    })
  }  
}


