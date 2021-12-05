import { AfterContentInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { SearchItemComponent } from '../..';
import { PathSelectionService } from '../path-selection.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'angular-search-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [PathSelectionService]
})
export class SearchComponent implements AfterContentInit {
  @Input() domain!: string;
  @ContentChildren(SearchItemComponent) searchItems!: QueryList<SearchItemComponent>

  constructor(
    private searchService: SearchService,
    pathSelectionService: PathSelectionService){
    pathSelectionService.path$.subscribe((path) => {
      searchService.select(this.domain, path);
    })
  }

  public ngAfterContentInit(): void{
    this.searchService.search$.subscribe((value) =>{
      this.searchItems.forEach(item => item.visible = item.name.toLocaleLowerCase().includes(value))
    })
  }
}