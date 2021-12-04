import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PathSelectionService{
    private subject = new Subject<string>();
    public path$ = this.subject.asObservable();
    public setPath = (value: string) => this.subject.next(value);
}