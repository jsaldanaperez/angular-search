import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabIndexService {
  public startIndex = 2;
  public minIndex = 0;
  public currentIndex!: number;

  private currentIndexSubject = new Subject<number>();
  public currentIndex$ = this.currentIndexSubject.asObservable();

  private resetSubject = new Subject();
  public reset$ = this.resetSubject.asObservable();

  private indexCount = this.startIndex;
  private lastIndex = 0;

  public getIndex(): number{
    const index = this.indexCount;
    this.lastIndex = index;
    this.indexCount++;
    return index;
  }

  public reset(): void{
    this.indexCount = this.startIndex;
    this.resetSubject.next(true);
  }

  public setCurrentIndex(index: number): void{
    this.currentIndex = index;
    this.currentIndexSubject.next(this.currentIndex);
  }

  public increaseCurrentIndex(): void{
    if(this.currentIndex < this.lastIndex)
    this.currentIndex++;
    this.currentIndexSubject.next(this.currentIndex);
  }

  public decreaseCurrentIndex(): void{
    if(this.currentIndex > this.minIndex){
      this.currentIndex--;
      this.currentIndexSubject.next(this.currentIndex);
    }
  }
}
