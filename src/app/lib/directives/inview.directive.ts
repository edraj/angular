// classes directive, mostly upon intersection
import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import { Platform } from '../../services/core/platform.service';

export interface IInview {
  outofview?: string,
  inviewbody?: string,
  outofviewbody?: string,
  threshold?: number;
  once?: boolean;
}
interface IViewClasses {
  inView: string[],
  outofView: string[],
  inViewBody: string[],
  outofViewBody: string[],
}
const clean = (str: string) => str ? str.split(' ') : [];

@Directive({
  selector: '[crInview]',
  // exportAs: 'crInview',
  standalone: true,
})
export class InviewDirective implements AfterViewInit, OnDestroy {
  @Input() crInview: string = '';

  @Input() options: IInview = {
    outofview: '',
    inviewbody: '',
    outofviewbody: '',
    threshold: 0,
    once: false
  };


  @Output() onInview = new EventEmitter<void>();
  @Output() onOutofview = new EventEmitter<void>();

  private io: IntersectionObserver;
  private viewClasses!: IViewClasses;

  private prepClasses(): IViewClasses {

    return {
      inView: clean(this.crInview),
      outofView: clean(this.options?.outofview),
      inViewBody: clean(this.options?.inviewbody),
      outofViewBody: clean(this.options?.outofviewbody),
    };
  }
  constructor(
    private el: ElementRef,
    private platform: Platform
  ) { }



  private classChange(
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver,
  ) {
    const c = this.viewClasses;

    if (entry.isIntersecting) {
      // in view
      document.body.classList.add(...c.inViewBody);
      document.body.classList.remove(...c.outofViewBody);

      entry.target.classList.add(...c.inView);
      entry.target.classList.remove(...c.outofView);

      this.onInview.emit();

      if (this.options.once) {
        this.unobserve();
      }

    } else {
      // out of view
      document.body.classList.remove(...c.inViewBody);
      document.body.classList.add(...c.outofViewBody);

      entry.target.classList.remove(...c.inView);
      entry.target.classList.add(...c.outofView);

      this.onOutofview.emit();

    }
  }

  observe() {
    this.io.observe(this.el.nativeElement);
  }

  unobserve() {
    this.io.unobserve(this.el.nativeElement);
  }

  ngAfterViewInit() {

    if (!this.platform.isBrowser) {
      return;
    }

    // prep classes
    this.viewClasses = this.prepClasses();

    this.io = new IntersectionObserver((entries, observer) => {
      this.classChange(entries[0], observer);
    },
      {
        threshold: this.options.threshold
      });
    this.observe();
  }
  ngOnDestroy() {
    this.io.disconnect();
    this.io = null;
  }
}
