import { Component, Input } from '@angular/core';
import { PathSelectionService } from '../path-selection.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'angular-search-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [PathSelectionService]
})
export class SearchComponent {
  @Input() domain!: string;

  constructor(
    searchService: SearchService,
    pathSelectionService: PathSelectionService){
    pathSelectionService.path$.subscribe((path) => {
      searchService.select(this.domain, path);
    })
  }
}