// classes directive, mostly upon intersection
import {
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
import { Platform } from '../../utils/platform.service';

interface IOptions {
  threshold?: number;
  fallBack?: string;
  initial?: string;
  nullCss?: string;
}

@Directive({
  selector: '[crLazy]',
  exportAs: 'crLazy',
  standalone: true,
})
export class LazyDirective implements AfterViewInit, OnChanges, OnDestroy {

  @Input() crLazy: string = '';

  @Input() options: IOptions = { threshold: 0, fallBack: null };

  private io: IntersectionObserver;

  constructor(
    private el: ElementRef,
    private platform: Platform,
    private renderer: Renderer2,
    @Optional() @Inject(REQUEST) private request: Request
  ) { }

  private setImage(src: string) {
    if (this.el.nativeElement.tagName === 'IMG') {
      this.renderer.setAttribute(this.el.nativeElement, 'src', src);
    } else {
      // change background image (add the style)
      this.renderer.setAttribute(this.el.nativeElement, 'style', `background-image: url(${src})`);
    }
  }
  private lazyLoad(entry: IntersectionObserverEntry) {

    // when intersecting,
    if (entry.isIntersecting) {
      // if IMG, change src
      const img = new Image();

      img.addEventListener('load', () => {
        // set attributes here ...
        this.setImage(img.src);
        // success, remove extra css
        this.renderer.removeClass(entry.target, this.options.nullCss);
        // disconnect
        this.io.unobserve(entry.target);
      });
      if (this.options.fallBack) {
        img.addEventListener('error', () => {
          this.setImage(this.options.fallBack);
          // disconnect
          this.io.unobserve(entry.target);
        });
      }

      img.src = this.crLazy;

    }
  }

  // show default before loading

  private isBot(agent: string): boolean {
    return /bot|googlebot|crawler|spider|robot|crawling|facebook|twitter|bing|linkedin|duckduck/i.test(agent);
  }

  ngAfterViewInit() {

    if (!this.crLazy && this.options.fallBack) {
      this.crLazy = this.options.fallBack;
    }

    if (!this.platform.isBrowser && this.request) {

      // check if its a bot
      if (this.isBot(this.request.get('user-agent'))) {
        // load image and return
        this.setImage(this.crLazy);
        return;
      };

      return;
    }

    if (this.options.initial) {
      this.setImage(this.options.initial);
    }
    if (this.options.nullCss) {
      this.renderer.addClass(this.el.nativeElement, this.options.nullCss);
    }

    this.io = new IntersectionObserver((entries, observer) => {
      // _attn(_entry.intersectionRatio, this.crLazy);
      const _entry = entries.find((entry) => entry.isIntersecting);
      if (entries.length > 1) {
        _attn(entries, 'entries');
        _attn(entries.find((entry) => entry.intersectionRatio > 0), 'which one is intersecint');
      }
      if (_entry) {
        this.lazyLoad(_entry);
      }
    },
      {
        threshold: this.options.threshold
      });


    this.io.observe(this.el.nativeElement);
  }


  ngOnChanges(c: SimpleChanges) {
    // _attn(c, 'onchanges');
    if (c.crLazy.firstChange) {
      // act normally
      return;
    }
    if (c.crLazy.currentValue !== c.crLazy.previousValue) {
      // observe element
      this.io.observe(this.el.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
    this.io = null;
  }
}
