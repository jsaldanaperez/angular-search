import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private subject = new BehaviorSubject<string>('');
  private selectSubject = new Subject<{ domain: string, path: string}>();
  search$ = this.subject.asObservable();
  selected$ = this.selectSubject.asObservable();
  select(domain: string, path: string){
    this.selectSubject.next({domain, path});
  }
  search(value: string): void{
    this.subject.next(value);
  }
}
