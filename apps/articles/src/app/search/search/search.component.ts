import { Component } from '@angular/core';
import { SearchItem, SearchService } from '@angular-search/shared/search';
import { Router } from '@angular/router';
@Component({
  selector: 'angular-search-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent{
  searchItems: SearchItem[] = [
    { name: 'Create article', description: 'Some description', navigate: () => alert('navigate')},
    { name: 'Edit article', description: 'Some description', navigate: () => alert('navigate')},
    { name: 'Create article', description: 'Some description', navigate: () => alert('navigate')},
    { name: 'Create article', description: 'Some description', navigate: () => alert('navigate')},
    { name: 'Create article', description: 'Some description', navigate: () => alert('navigate')},
    { name: 'Create article', description: 'Some description', navigate: () => alert('navigate')},
    { name: 'Create article', description: 'Some description', navigate: () => alert('navigate')},
    { name: 'Create article', description: 'Some description', navigate: () => alert('navigate')},
    { name: 'Create article last option', description: 'Some description', navigate: () => alert('navigate')}
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
