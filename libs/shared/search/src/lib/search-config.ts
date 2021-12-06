import { Observable } from 'rxjs';

export class SearchConfig<T>{

    private constructor(
        public readonly onSearch: (value: string) => Observable<T>,
        public readonly onResult: (result: T) => void,
        public readonly onReset: () => void
    ){}

    static create<T>(config: {
        onSearch: (value: string) => Observable<T>,
        onResult: (result: T) => void,
        onReset: () => void
    }): SearchConfig<T>{
        return new SearchConfig(config.onSearch, config.onResult, config.onReset);
    }
}