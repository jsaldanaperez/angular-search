import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private subject = new BehaviorSubject<string>('');
  search$ = this.subject.asObservable();
  search(value: string): void{
    this.subject.next(value);
  }
}
