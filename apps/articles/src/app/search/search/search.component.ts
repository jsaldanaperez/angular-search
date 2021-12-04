import { Component } from '@angular/core';
import { SearchItem } from '@angular-search/shared/search';
@Component({
  selector: 'angular-search-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent{
  searchItems: SearchItem[] = [
    { name: 'Create article', description: 'Some description', navigate: () => alert('navigate')},
    { name: 'Create article', description: 'Some description', navigate: () => alert('navigate')},
    { name: 'Create article', description: 'Some description', navigate: () => alert('navigate')},
    { name: 'Create article', description: 'Some description', navigate: () => alert('navigate')},
    { name: 'Create article', description: 'Some description', navigate: () => alert('navigate')},
    { name: 'Create article', description: 'Some description', navigate: () => alert('navigate')},
    { name: 'Create article', description: 'Some description', navigate: () => alert('navigate')},
    { name: 'Create article', description: 'Some description', navigate: () => alert('navigate')},
    { name: 'Create article last option', description: 'Some description', navigate: () => alert('navigate')}
  ]
}