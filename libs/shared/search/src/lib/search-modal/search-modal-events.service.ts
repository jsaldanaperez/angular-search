import { ElementRef, Injectable } from '@angular/core';
import { fromEvent, filter, merge, Subject } from 'rxjs';
import { SearchService } from '../search.service';
import { TabIndexService } from '../tab-index.service';
import { WindowScrollingService } from '../window-scrolling.service';

@Injectable({
    providedIn: 'root'
})
export class SearchModalEventsService{
    private closeButton!: ElementRef;
    private modalContent!: ElementRef;
    private searchControl!: ElementRef;
    private modal!: ElementRef;
    private showSearchValue = false;
    private showSearchSubject = new Subject<boolean>();
    private closeButtonIndex = 0;
    private searchControlIndex = 1;
    public showSearch$ = this.showSearchSubject.asObservable();

    private set showSearch(value: boolean){
        this.showSearchValue = value;
        this.showSearchSubject.next(this.showSearchValue);
    }

    private get showSearch(){
        return this.showSearchValue;
    }

    constructor(
        private searchService: SearchService,
        private tabIndexService: TabIndexService,
        private windowScrollingService: WindowScrollingService){}

    public initialize(config: {
        modal: ElementRef,
        modalContent: ElementRef,
        searchControl: ElementRef,
        closeButton: ElementRef
    }): void{
        this.modal = config.modal;
        this.modalContent = config.modalContent;
        this.searchControl = config.searchControl;
        this.closeButton = config.closeButton;
        this.subscribeToActivateEvent();
        this.subscribeToFocusEvent();
        this.subscribeToNavigationEvents();
        this.subscribeToCloseEvents();
    }

    private subscribeToActivateEvent(): void{
        fromEvent<KeyboardEvent>(window, 'keydown')
            .pipe(filter(() => !this.showSearch))
            .subscribe((event) =>{
            if(event.ctrlKey && event.key === ' ' && !this.showSearch){
                this.windowScrollingService.disable();
                this.modal.nativeElement.style.display = 'block';
                setTimeout(() => {
                this.showSearch = true;
                this.focus(this.searchControl);
                })
            }
            });
    }

    private subscribeToFocusEvent(): void{
        fromEvent(this.searchControl.nativeElement, 'focus')
            .subscribe(() => this.tabIndexService.setCurrentIndex(this.searchControlIndex));
    }

    private subscribeToNavigationEvents(): void{

        fromEvent<KeyboardEvent>(window, 'keydown')
            .pipe(filter(() => this.showSearch))
            .subscribe((event) => {

            const increase = () => {
            event.preventDefault();
            this.tabIndexService.increaseCurrentIndex()
            };

            const decrease = () => {
            event.preventDefault();
            this.tabIndexService.decreaseCurrentIndex()
            };

            switch(event.key){
            case 'Escape': this.hideNavigation(); break;
            case 'ArrowUp': decrease(); break;
            case 'ArrowDown': increase(); break;
            case 'Tab': event.shiftKey ? decrease() : increase(); break;
            }
        });

        this.tabIndexService.currentIndex$
        .subscribe((index) => {
            switch(index){
            case this.closeButtonIndex: this.focus(this.closeButton); break;
            case this.searchControlIndex:
                this.focus(this.searchControl);
                setTimeout(() => this.searchControl.nativeElement.select());
                break;
            }
        });
    }

    private subscribeToCloseEvents(): void{
        const clickOutsideOfModalObservable =  fromEvent(window, 'click')
        .pipe(filter((event) => this.showSearch && !event.composedPath().includes(this.modalContent.nativeElement)));
        const closeButtonClickObservale =  fromEvent(this.closeButton.nativeElement, 'click');
        const onItemSelectedObservable = this.searchService.selected$;

        merge(
        clickOutsideOfModalObservable,
        closeButtonClickObservale,
        onItemSelectedObservable)
        .subscribe(this.hideNavigation);
    }

    private focus(element: ElementRef): void{
        element.nativeElement.focus();
    }


    private hideNavigation = () => {
        this.showSearch = false;
        this.windowScrollingService.enable();
        setTimeout(() => {
            this.modal.nativeElement.style.display = 'none';
        this.searchService.search('')
        }, 200);
    }
}
