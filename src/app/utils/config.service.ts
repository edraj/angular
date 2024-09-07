import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../utils/config';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IConfig } from './config.model';


export const configFactory = (config: ConfigService) => () =>
    {
      _seqlog('configFactory');
      return config.loadAppConfig();}

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    constructor(
        private http: HttpClient,
        @Optional() @Inject('localConfig') protected localConfig: IConfig
    ) {
      _seqlog('ConfigService');
    }

    private _getUrl = Config.API.config.local;

    // keep track of config
    private config = new BehaviorSubject<IConfig>(Config as IConfig);
    config$: Observable<IConfig> = this.config.asObservable();

    private static _config: IConfig;

    static get Config(): IConfig {
        return this._config || Config;
    }

    private NewInstance(config: any, withError: boolean): IConfig {
        // cast all keys as are
        const _config = { ...Config, ...<IConfig>config };
        _config.Storage = { ..._config.Storage };
        _config.isServed = true;
        _config.withErrors = withError; // so now we can distinguish where the config really came from

        // populate static element
        ConfigService._config = _config;

        this.config.next(_config);
        return _config;
    }

    loadAppConfig(): Observable<boolean> {
        _seqlog('LoadAppConfig');
        if (this.localConfig) {
            this.NewInstance(this.localConfig, true);
            return of(true);
        }


        return this.http.get(this._getUrl).pipe(
            map((response) => {
                this.NewInstance(response, false);
                // also state that it has been isServed

                _seqlog('config next');

                // here next
                return true;
            }),
            catchError((error) => {
                // if in error, return set fall back from environment
                // make it served, if you want to distinguish error, create another flag
                this.NewInstance(Config, true);
                _debug(error, 'Error in resolve', 'e');
                return of(true);
            })
        );
    }
}
