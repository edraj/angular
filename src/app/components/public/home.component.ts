import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
@Component({
    templateUrl: './home.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    // imports: [TranslatePipe, ResPipe]
})
export class PublicHomeComponent implements OnInit {

    constructor() {
        //
    }
    ngOnInit(): void {
        //
    }

}
