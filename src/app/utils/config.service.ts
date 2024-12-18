import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Config } from './config';
import { IConfig } from './config.model';


export const configFactory =  () => {
  // inject, and return the Observerable function
  const config = inject(ConfigService);
  return config.loadAppConfig();
};

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
            map((response: any) => {
                this.NewInstance(response, false);
                // also state that it has been isServed

                _seqlog('config next');

                // here next
                return true;
            }),
            catchError((error: any) => {
                // if in error, return set fall back from environment
                // make it served, if you want to distinguish error, create another flag
                this.NewInstance(Config, true);
                _debug(error, 'Error in resolve', 'e');
                return of(true);
            })
        );
    }
}
