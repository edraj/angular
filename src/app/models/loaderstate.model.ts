
export enum EnumLoaderSource {
    HTTP,
    PAGER
}


export interface ILoaderState {
    show: boolean;
    source?: EnumLoaderSource;
    id?: string;
    url?: string;
}

