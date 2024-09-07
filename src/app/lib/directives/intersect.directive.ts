import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';
import { Platform } from '@angular/cdk/platform';



@Directive({
    selector: '[shIntersect]',
    exportAs: 'shIntersect'
})
export class IntersectDirective implements AfterViewInit {
    @Input() shIntersect: string;
    @Input() config: any = { threshold: 0, reverse: false };

    private _config = {threshold: 0, reverse: false};

    constructor(private el: ElementRef, private platform: Platform) {
        //
    }

    ngAfterViewInit() {
        // if on server, do not show image
        if (!this.platform.isBrowser) {
            return;
        }
        // simply, when element is within view, add style, else remove it
        if (!IntersectionObserver) {
            return;
        }

        this._config = {...this._config, ...this.config};

        const io = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // either add or remove ependong on reverse value
                        if (this._config.reverse) {
                            document.body.classList.remove(this.shIntersect);
                        } else {
                            document.body.classList.add(this.shIntersect);
                        }
                        entry.target.classList.remove('outofview');
                        entry.target.classList.add('inview');
                    } else {
                        if (this._config.reverse) {
                            document.body.classList.add(this.shIntersect);
                        } else {
                            document.body.classList.remove(this.shIntersect);
                        }
                        entry.target.classList.add('outofview');
                        entry.target.classList.remove('inview');
                    }
                });
            },
            {
                // root: this.rootElement,
                // rootMargin: '0px',
                threshold: this._config.threshold
            }
        );

        io.observe(this.el.nativeElement);
    }
}
