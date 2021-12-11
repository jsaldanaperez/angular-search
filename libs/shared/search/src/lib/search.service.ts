import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private subject = new BehaviorSubject<string>('');
  private selectSubject = new Subject<{ domain: string, path: string, params?: Params}>();
  search$ = this.subject.asObservable();
  selected$ = this.selectSubject.asObservable();
  select(domain: string, path: string, params?: Params){
    this.selectSubject.next({domain, path, params});
  }
  search(value: string): void{
    this.subject.next(value);
  }
}
