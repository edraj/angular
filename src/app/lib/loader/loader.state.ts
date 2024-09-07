import { Injectable } from '@angular/core';
import { share } from 'rxjs';
import { ILoaderState } from './loaderstate.model';
import { StateService } from '../../utils/state.abstract';


@Injectable({
    providedIn: 'root'
})
export class LoaderState extends StateService<ILoaderState> {

    constructor() {
        super('NONE');
        _seqlog('loader srvice construct');
        this.SetState({
            show: false, source: null, url: null
        });
        // this does make the state fired shared amongst all listeners
        this.stateItem$ = this.stateItem$.pipe(share());
    }
    show(source: string) {
        this.UpdateState({show: true, source});
    }
    hide(source: string) {
        this.UpdateState({show: false, source});
    }
    emitUrl(url: string) {
        this.UpdateState({url});
    }

}
