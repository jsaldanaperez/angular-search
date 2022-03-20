import { Component } from '@angular/core';
import { SearchConfig, SearchItem } from '@app/shared/search';
import { of } from 'rxjs';

@Component({
  selector: 'app-<%= project-name %>',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  public searchItem?: SearchItem;


  public readonly searchConfig = SearchConfig.create({
    onSearch: (search: string) => of(),
    onResult: (entity) => {
      if (entity) {
        //assign value to searchItem
      }
    },
    onReset: () => (this.searchItem = undefined),
  });
}
