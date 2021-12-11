/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable } from 'rxjs';

export class SearchConfig{

    private constructor(
        public readonly onSearch: (value: string) => Observable<Record<string, unknown>>,
        public readonly onResult: (result: Record<string, unknown>) => void,
        public readonly onReset: () => void
    ){}

    static create<T>(config: {
        onSearch: (value: string) => Observable<T>,
        onResult: (result: T) => void,
        onReset: () => void
    }): SearchConfig {
        return new SearchConfig(
            <() => Observable<Record<string, unknown>>>config.onSearch, 
            <(result: Record<string, unknown>) => void>config.onResult, 
            config.onReset);
    }
}
