import { DOCUMENT } from '@angular/common';
import { ApplicationRef, EmbeddedViewRef, Inject, Injectable, Injector, StaticProvider, Type, createComponent } from '@angular/core';
import { DialogPartial } from './partial';

export interface IDialogOptions<T = any> {
  title?: string,
  data?: T,
  css?: string,
  id?: string,
  ismodal?: boolean,
  onclose?: (res: any) => void;
  providers?: StaticProvider[];
}

@Injectable({ providedIn: 'root' })
export class DialogService<T = any>  {


  dialogs: { [key: string]: DialogPartial; } = {};

  constructor(
    // bring in the application ref
    private appRef: ApplicationRef,
    @Inject(DOCUMENT) private doc: Document
  ) { }

  // open method
  public open(c: Type<any>, options?: IDialogOptions<T>): any {
    // create injector of providers

    const _injector = options?.providers?.length ? Injector.create({ providers: options.providers }) : undefined;

    // first, create the child
    const childRef = createComponent(c, {
      environmentInjector: this.appRef.injector,
      elementInjector: _injector,
    });

    // attach
    this.appRef.attachView(childRef.hostView);

    // get root nodes
    const rootNode = (<EmbeddedViewRef<any>>childRef.hostView).rootNodes;


    // then create the dialog that will host it
    const componentRef = createComponent(DialogPartial, {
      environmentInjector: this.appRef.injector,
      // pass the child here
      projectableNodes: [rootNode],
    });

    // append to body, we will use platform document for this
    const dialogElement = (<EmbeddedViewRef<any>>componentRef.hostView).rootNodes[0];
    if (options?.id) {
      dialogElement.id = options.id;
      this.dialogs[options.id] = componentRef.instance;
    }

    if (options?.css) {

      dialogElement.classList.add(...options.css.split(' '));
    }
    this.doc.body.append(dialogElement);

    // attach view
    this.appRef.attachView(componentRef.hostView);


    // assign all options
    componentRef.instance.options = {...options, ismodal: options?.ismodal || false, title: options?.title || '' };

    childRef.instance.data = options?.data;
    childRef.instance.dialog = componentRef.instance;
    childRef.instance.dialogElement = dialogElement; // NEW: why not pass the dialog element



    // when closed destroy
    const s = componentRef.instance.onClose.subscribe((res) => {
      // call onclose if exists
      if (options?.onclose) {
        options.onclose(res);
      }

      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();

      this.appRef.detachView(childRef.hostView);
      childRef.destroy();
      if (options?.id) {
        delete this.dialogs[options.id];
      }
      // options?.id && (this.dialogs[options.id] = null);

      s.unsubscribe();
    });


    return childRef.instance;
  }

  public get(id: string) {
    // find the element in body
    return this.dialogs[id] || null;
  }



}
