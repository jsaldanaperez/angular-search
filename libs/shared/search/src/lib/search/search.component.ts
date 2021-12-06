import { AfterContentInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { SearchItemComponent } from '../..';
import { LookUpService } from '../look-up.service';
import { PathSelectionService } from '../path-selection.service';
import { SearchService } from '../search.service';
import { SearchConfig } from '../search-config';
import { SearchItem } from '../search-item';

@Component({
  selector: 'angular-search-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [PathSelectionService]
})
export class SearchComponent implements AfterContentInit {
  @Input() public domain!: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public configs?: SearchConfig<any>[]
  @ContentChildren(SearchItemComponent) private  searchItems!: QueryList<SearchItemComponent>;
  private staticSearchItems: SearchItem[] = [];

  constructor(
    private lookUpService: LookUpService,
    private searchService: SearchService,
    pathSelectionService: PathSelectionService){
    pathSelectionService.path$.subscribe((path) => {
      searchService.select(this.domain, path);
    })
  }

  public ngAfterContentInit(): void{
    this.searchItems.forEach(searchItem => this.staticSearchItems.push(searchItem));
    this.searchService.search$.subscribe((value) =>{
      this.searchItems
        .filter(x => this.staticSearchItems.includes(x))
        .forEach(item => item.visible = item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()));

      if(this.configs){
        this.configs.forEach(x => x.onReset())
        if(value){
          this.configs.forEach(x => this.lookUpService.execute(x.onSearch(value)).subscribe(result => x.onResult(result)))
        }
      }
    });
  }
}