import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoaderState } from './loader.state';

@Component({
    selector: 'http-loader',
    template: `<div *ngIf="show$ | async" class="httploader">
    <div class="line"></div>
    <div class="subline inc"></div>
    <div class="subline dec"></div></div>`,
    styleUrls: ['./loader.less'],
    standalone: true,
    imports: [CommonModule],
    encapsulation: ViewEncapsulation.None
})
export class LoaderPartial implements OnInit {

    show$: Observable<boolean>;

    constructor(
        private loaderService: LoaderState
    ) { }

    ngOnInit() {
      this.show$ = this.loaderService.stateItem$.pipe(
         map(state => state ? state.show : false)
      );


    }

}
