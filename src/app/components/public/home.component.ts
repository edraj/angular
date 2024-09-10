import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ResPipe } from 'src/app/lib/pipes/res.pipe';
import { TranslatePipe } from '../../lib/pipes/translate.pipe';
@Component({

    templateUrl: './home.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TranslatePipe, ResPipe]
})
export class PublicHomeComponent implements OnInit {

    constructor() {
        //
    }
    ngOnInit(): void {
        //
    }

}
