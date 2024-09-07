import { ApplicationRef, createComponent, EmbeddedViewRef, Injectable } from '@angular/core';
import { Observable, of, Subscription, throwError, timer } from 'rxjs';
import { IToastButton, IToast, EnumTimeout } from './toast.model';
import { ToastPartialComponent } from './toast.partial';
import { StateService } from '../../utils/state.abstract';
import { Res } from '../../utils/resources';
import { IUiError } from '../../utils/error.model';

@Injectable({ providedIn: 'root' })
export class Toast extends StateService<IToast> {
   //
   // keep track of timeout
   private isCanceled: Subscription;
   private created: boolean;

   private addComponent() {
      const componentRef = createComponent(ToastPartialComponent, {
         environmentInjector: this.appRef.injector
      });

      this.appRef.attachView(componentRef.hostView);
      // FIXME: platform
      document.body.append((<EmbeddedViewRef<any>>componentRef.hostView).rootNodes[0]);

      this.created = true;

   }


   public dismissButton: IToastButton = {
      css: 'btn-close',
      text: Res.Get('Dismiss'),
      click: (event: MouseEvent) => {
         this.Hide();
      }
   };

   private defaultOptions: IToast = {
      css: 'toast',
      extracss: '',
      text: Res.Get('ToastError'),
      timeout: EnumTimeout.Short, // or config value
      buttons: [this.dismissButton],
      visible: false
   };

   constructor(private appRef: ApplicationRef) {
      super();
      this.SetState({ ...this.defaultOptions });
   }


   Show(code: string, options?: IToast): void {
      if (!this.created) {
         this.addComponent();
      }


      this.Hide();

      const _options: IToast = { ...this.defaultOptions, ...options };

      // get message from code
      const message = Res.Get(code, options?.text || Res.Get('Unknown'));
      timer(100).subscribe(() => {
         this.SetState({ ..._options, text: message, visible: true });
      });


      // timeout and hide
      if (_options.timeout && _options.timeout > EnumTimeout.Never) {
         this.isCanceled = timer(_options.timeout).subscribe(() => {
            this.Hide();
         });
      }

   }

   ShowError(code: string, options?: IToast) {
      this.Show(code, { extracss: 'error', ...options });
   }
   ShowSuccess(code: string, options?: IToast) {
      this.Show(code, { extracss: 'success', ...options });
   }
   ShowWarning(code: string, options?: IToast) {
      this.Show(code, { extracss: 'warning', ...options });
   }

   Hide() {
      if (this.isCanceled) {
         this.isCanceled.unsubscribe();
      }
      this.UpdateState({ visible: false });
   }


   HandleUiError(error: IUiError, options?: IToast): Observable<any> {

      // check code for generic responses
      // 400 and 500 are errors
      // 401 and 403 are info with relogin
      // 404 is warning

      if (error.code) {
         // do a switch case for specific errors
         switch (error.status) {
            case 500:
               // terrible error, code always unknown
               this.ShowError('Unknown', options);
               break;
            case 400:
               // server error
               this.ShowError(error.code, options);
               break;
            case 401:
            case 403:
               // auth error, just show a unified message
               this.Show('UNAUTHORIZED', options);
               break;
            case 404:
               // thing does not exist, better let each component decide
               this.ShowWarning(error.code, options);
               break;
            default:
               // other errors
               this.ShowError(error.code, options);
         }
         return of(null);
      } else {
         // else, throw it back to Angular Error Service, this is a JS error
         return throwError(() => error);
      }
   }
}
