import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LoaderState } from '../../lib/loader/loader.state';

@Component({
    templateUrl: './404.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class NotFoundComponent implements OnInit {

    constructor(private loaderService: LoaderState) { }

    ngOnInit() {
        _debug(this.loaderService.currentItem.url, '404ed url');

    }
}
