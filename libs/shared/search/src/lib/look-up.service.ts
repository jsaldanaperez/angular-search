import { Injectable } from '@angular/core';
import { finalize, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LookUpService {
  private observables: Observable<unknown>[] = [];
  private lookupSubject = new Subject<boolean>();
  private lookupBusy = false;
  lookup$ = this.lookupSubject.asObservable();

  execute<T>(observable:Observable<T>): Observable<T>{
    this.addObservable(observable);
     return observable.pipe(finalize(() => this.removeObservable(observable)));
  }

  private addObservable(observable: Observable<unknown>): void {
    this.observables.push(observable);
    if(!this.lookupBusy){
      this.lookupBusy = true;
      this.lookupSubject.next(this.lookupBusy);
    }
  }

  private removeObservable(observable: Observable<unknown>): void{
    const index = this.observables.indexOf(observable);
    this.observables.splice(index, 1);
    if(!this.observables.length){
      this.lookupBusy = false;
      this.lookupSubject.next(this.lookupBusy);
    }
  }
}
