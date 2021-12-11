import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable()
export class PathSelectionService{
    private subject = new Subject<SelectedPath>();
    public path$ = this.subject.asObservable();
    public setPath = (path: string, params?: Params) => this.subject.next({ path: path, params: params});
}

export interface SelectedPath{
    path: string;
    params?: Params;
}