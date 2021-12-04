import { Component, Input } from '@angular/core';
import { PathSelectionService } from '../path-selection.service';
import { SearchItem } from '../search-item';

@Component({
  selector: 'angular-search-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent {
  @Input() value!: SearchItem;
  onClick = (value: string)  => this.pathSelectionService.setPath(value);
  constructor(private pathSelectionService: PathSelectionService){}

}