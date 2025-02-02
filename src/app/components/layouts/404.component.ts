import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoaderState } from '../../lib/loader/loader.state';

@Component({
    templateUrl: './404.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class NotFoundComponent implements OnInit {

    constructor(private loaderService: LoaderState) { }

    ngOnInit() {
        _debug(this.loaderService.currentItem.url, '404ed url');

    }
}
