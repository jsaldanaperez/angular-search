import { Params } from '@angular/router';

export interface SearchItem{
    name: string,
    description: string,
    path: string,
    params?: Params
}
