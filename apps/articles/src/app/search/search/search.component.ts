import { Component } from '@angular/core';
import { SearchItem, SearchService } from '@angular-search/shared/search';
import { Router } from '@angular/router';
@Component({
  selector: 'angular-search-articles',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent{
  searchItems: SearchItem[] = [
    { name: 'Articles', description: 'List of articles', path: ''},
    { name: 'Create article', description: 'Some description', path: 'create'},
    { name: 'Edit article', description: 'Some description', path: '1'},
  ];
  filteredItems: SearchItem[] = [];
  constructor(
    router: Router,
    private searchService: SearchService){
    this.subscribeToSearch();
  }


  private subscribeToSearch(): void{
    this.filteredItems = [...this.searchItems];
    this.searchService.search$.subscribe((value) =>{
      if(value){
        this.filteredItems = this.searchItems.filter(x => x.name.toLocaleLowerCase().includes(value))
      }else{
        this.filteredItems = [...this.searchItems];
      }
    })
  }
}
