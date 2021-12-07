import { AfterViewInit, Component, ContentChild, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { filter, fromEvent } from 'rxjs';
import { PathSelectionService } from '../path-selection.service';
import { TabIndexService } from '../tab-index.service';

@Component({
  selector: 'angular-search-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements AfterViewInit {
  @Input() name!: string;
  @Input() description!: string;
  @Input() path!: string;
  @ViewChild('searchItem', { static: true}) searchItem!: ElementRef;
  @ContentChild(TemplateRef) template?: TemplateRef<unknown>;
  public set index(value: number) {
    this.indexValue = value;
    if(this.focused){
      this.tabIndexService.currentIndex = value;
    }
  }
  public visible = true;
  public indexValue = 0;
  public focused = false;
  onClick = ()  => this.pathSelectionService.setPath(this.path);

  constructor(
    private tabIndexService: TabIndexService,
    private pathSelectionService: PathSelectionService){ }

    public ngAfterViewInit(): void{
      fromEvent(this.searchItem.nativeElement, 'focus') 
        .subscribe(() => {
          if(!this.focused){
            this.tabIndexService.setCurrentIndex(this.indexValue);
            this.focused = true;
          }
        });

        fromEvent(this.searchItem.nativeElement, 'blur')
        .subscribe(() => this.focused = false);

      this.tabIndexService.currentIndex$
        .pipe(filter((index) => this.indexValue === index && !this.focused))
        .subscribe(() => {
          this.focused = true;
          this.searchItem.nativeElement.focus();
        });
    }

    public onKeyDown(event: KeyboardEvent): void{
      if(event.key === 'Enter'){
        this.onClick();
      }
    }

    public onMouseEnter(): void{
      this.searchItem.nativeElement.focus();
    }
}
