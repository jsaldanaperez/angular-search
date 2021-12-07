import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabIndexService {
  public startIndex = 2;
  public currentIndex = 1;

  private currentIndexSubject = new Subject<number>();
  public currentIndex$ = this.currentIndexSubject.asObservable();

  private resetSubject = new Subject();
  public reset$ = this.resetSubject.asObservable();

  private indexCount = this.startIndex;

  public get isOnLastIndex(): boolean{
    console.log('currentIndex', this.currentIndex)
    console.log('indexCount', this.indexCount)
    return this.currentIndex === (this.indexCount - this.startIndex + 1);
  }

  public getIndex(): number{
    const index = this.indexCount;
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
    console.log('increate', this.currentIndex, this.indexCount)
    const count = this.currentIndex + 1;
    if(count < this.indexCount)
    this.currentIndex++;
    this.currentIndexSubject.next(this.currentIndex);
  }

  public decreaseCurrentIndex(): void{
    if(this.currentIndex > this.startIndex){
      this.currentIndex--;
      this.currentIndexSubject.next(this.currentIndex);
    }
  }
}
