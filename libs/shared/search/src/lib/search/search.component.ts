import { AfterContentInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { SearchItemComponent } from '../..';
import { LookUpService } from '../look-up.service';
import { PathSelectionService } from '../path-selection.service';
import { SearchService } from '../search.service';
import { SearchConfig } from '../search-config';
import { SearchItem } from '../search-item';
import { debounceTime, distinctUntilChanged, of, Subject, switchMap } from 'rxjs';
import { TabIndexService } from '../tab-index.service';
import { KeyAssignmentService } from '../key-assignment.service';

@Component({
  selector: 'angular-search-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [PathSelectionService]
})
export class SearchComponent implements AfterContentInit {
  @Input() public domain!: string; 
  @Input() public configs?: SearchConfig[]
  @ContentChildren(SearchItemComponent) public  searchItems!: QueryList<SearchItemComponent>;
  private staticSearchItems: SearchItem[] = [];
  private searchSubject = new Subject<string>();
  private searchValue$ = this.searchSubject
  .pipe(debounceTime(300))
  .pipe(distinctUntilChanged())
  .pipe(switchMap((term) => {
    return of(term);
  }));

  constructor(
    private keyAssignmentService: KeyAssignmentService,
    private tabIndexService: TabIndexService,
    private lookUpService: LookUpService,
    private searchService: SearchService,
    pathSelectionService: PathSelectionService){
    pathSelectionService.path$.subscribe((selectedPath) => {
      searchService.select(this.domain, selectedPath.path, selectedPath.params);
    })
  }


  public ngAfterContentInit(): void{

    this.searchItems.forEach(searchItem => {
      this.setValues(searchItem);
      this.staticSearchItems.push(searchItem)
    });

    this.searchItems.changes.subscribe(() => setTimeout(() => this.tabIndexService.reset()));

    this.searchValue$.subscribe((term: string) => this.triggerConfigurations(term));
    this.searchService.search$.subscribe(this.handleSearchChanges);

    this.tabIndexService.reset$.subscribe(()=>{
      this.searchItems.filter(x => x.visible).forEach(searchItem => {
        this.setValues(searchItem);
        if(searchItem.focused){
          this.tabIndexService.currentIndex = searchItem.index;
        }
      })
    })
  }

  private triggerConfigurations(value: string): void{
    if(value && this.configs){
      this.configs.forEach(x => this.lookUpService.execute(x.onSearch(value)).subscribe(result => x.onResult(result)))
    }
  }

  private handleSearchChanges = (value: string) => {
    this.searchSubject.next(value);

      let hasChangedVisibility = false;

      this.searchItems
        .filter(x => this.staticSearchItems.includes(x))
        .forEach(item => {
          const currentValue = item.visible;
          item.visible = item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
          if(currentValue !== item.visible){
            hasChangedVisibility = true;
          }
        });

      if(this.configs){
        this.configs.forEach(x => x.onReset())
      }

      if(hasChangedVisibility){
        this.tabIndexService.reset();
      }
  }

  private setValues(component: SearchItemComponent): void{
    component.index = this.tabIndexService.getIndex();
    component.key = this.keyAssignmentService.get();
  }
}
