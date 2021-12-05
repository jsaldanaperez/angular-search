import { Component, ContentChild, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { PathSelectionService } from '../path-selection.service';

@Component({
  selector: 'angular-search-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent {
  @Input() name!: string;
  @Input() description!: string;
  @Input() path!: string;
  @ViewChild('searchItem', { static: true}) searchItem!: ElementRef;
  @ContentChild(TemplateRef) template?: TemplateRef<unknown>;
  public visible = true;
  index = 0;
  focused = false;
  onClick = ()  => this.pathSelectionService.setPath(this.path);

  constructor(private pathSelectionService: PathSelectionService){ }

    onKeyDown(event: KeyboardEvent): void{
      if(event.key === 'Enter'){
        this.onClick();
      }
    }
}
