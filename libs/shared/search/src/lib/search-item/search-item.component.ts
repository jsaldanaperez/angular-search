import { AfterViewInit, Component, ContentChild, ElementRef, Input, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { filter, fromEvent, Subject, takeUntil } from 'rxjs';
import { KeyAssignmentService } from '../key-assignment.service';
import { PathSelectionService } from '../path-selection.service';
import { SearchModalEventsService } from '../search-modal/search-modal-events.service';
import { TabIndexService } from '../tab-index.service';

@Component({
  selector: 'angular-search-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements AfterViewInit, OnDestroy {
  @Input() name!: string;
  @Input() description!: string;
  @Input() path!: string;
  @ViewChild('searchItem', { static: true}) searchItem!: ElementRef;
  @ContentChild(TemplateRef) template?: TemplateRef<unknown>;
  public index!: number;
  public visible = true;
  public focused = false;
  public key!: string;
  private showSearch = false;
  private unsubscribe$ = new Subject();
  onClick = ()  => this.pathSelectionService.setPath(this.path);

  constructor(
    private tabIndexService: TabIndexService,
    private searchModalEventsService: SearchModalEventsService,
    private keyAssignmentService: KeyAssignmentService,
    private pathSelectionService: PathSelectionService){ }

    public ngAfterViewInit(): void{
      fromEvent(this.searchItem.nativeElement, 'focus')
        .pipe(
          filter(() => this.visible),
          takeUntil(this.unsubscribe$)
        )
        .subscribe(() => {
          if(!this.focused){
            this.tabIndexService.setCurrentIndex(this.index);
            this.focused = true;
          }
        });

      fromEvent(this.searchItem.nativeElement, 'blur')
      .pipe(
        filter(() => this.visible),
        takeUntil(this.unsubscribe$)
      )
        .subscribe(() => this.focused = false);

      this.tabIndexService.currentIndex$
        .pipe(
          filter(() => this.visible),
          filter((index) => this.index === index && !this.focused),
          takeUntil(this.unsubscribe$)
        )
        .subscribe(() => {
          this.focused = true;
          this.searchItem.nativeElement.focus();
        });

      this.keyAssignmentService.selectedKey$
        .pipe(
          filter((key) => this.visible && key === this.key && this.showSearch),
          takeUntil(this.unsubscribe$)
        )
        .subscribe(() => this.onClick());

      this.searchModalEventsService.showSearch$
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((show) => this.showSearch = show);
    }

    public onKeyDown(event: KeyboardEvent): void{
      if(event.key === 'Enter'){
        this.onClick();
      }
    }

    public ngOnDestroy(): void{
      this.unsubscribe$.next(true);
      this.unsubscribe$.complete();
    }
}
