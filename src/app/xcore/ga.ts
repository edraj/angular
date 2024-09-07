import { environment } from '../../environments/environment';
import { ConfigService } from './services';

declare let dataLayer: any[]; // Declare google tag
export interface IGaOptions {
    category: EnumGaCategory; // also social network
    action: EnumGaAction; // also social action
    label?: string; // also social target
    value?: any;
    type?: EnumGaType; // event or social
}

export interface IGaDims {
    dim?: string;

}
enum EnumGaDim {
    dim = 'dimension1',
    // add custom dimetions
}
export enum EnumGaType {
    event = 'event',
    social = 'social'
}

export enum EnumGaCategory {
    Shares = 'Shares',
    General = 'General'
    // add cats
}
export enum EnumGaAction {

    Click = 'Click',
    // add actopns
}
export class GaTracking {
    // for google analytics
    // u need a service
    public static get IsGaEnabled(): boolean {
        // datalayer
        return ConfigService.Config.Seo.gaEnabled && typeof window !== 'undefined' && window['dataLayer'] && environment.production;
    }

    private static MapGaDims(dims?: IGaDims): any {
        // return dims with their real dimention names, remove empty
        const ret = {};
        if (!dims) {
            return null;
        }

        Object.keys(dims).forEach(n => {
            const key = EnumGaDim[n];
            if (key && dims[n]) {
                ret[key] = dims[n];
            }
        });

        return ret;
    }

    public static RegisterView(url: string, dims: IGaDims[] = []): void {
        _debug(url, 'register view', 'ga');

        if (GaTracking.IsGaEnabled) {
            // register a view

            dataLayer.push({ event: 'vaes_pageview' });
            // push gadims {clientId: 'value'} ... etc
            dims.forEach(n => {
                dataLayer.push(n);
            });

        }
    }
    public static SetValue(name: string, value: string): void {
        _debug({ name, value }, 'Set GA value', 'ga');

        if (GaTracking.IsGaEnabled) {
            // set value once per site if at al applicable
            const _data = {};
            _data[name] = value;
            dataLayer.push(_data);
        }
    }
    public static RegisterEvent(
        category: EnumGaCategory,
        action: EnumGaAction,
        label?: string,
        value?: string,
        event: string = 'vaes_event'
    ): void {
        _debug({ category, action, label, value }, 'register event', 'ga');

        if (GaTracking.IsGaEnabled) {

            // event or social
            dataLayer.push({
                event,
                category, action, label, value
            });

        }
    }

    public static RegisterError(
        category: EnumGaCategory,
        action: EnumGaAction,
        label?: string,
        value?: string) {
            this.RegisterEvent(category, action, label, value, 'vaes_error');

    }

    public static GetFormErrors(form: any): string[] {
        const _errors: string[] = [];
        Object.keys(form.controls).forEach(n => {
            if (form.controls[n].invalid) {
                _errors.push(n);
            }
        });
        return _errors;
    }
}
