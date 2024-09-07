import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '../../lib/pipes/translate.pipe';
import { Res } from '../../utils/resources';
import { SeoService } from '../../utils/seo.service';
import { ResPipe } from 'src/app/lib/pipes/res.pipe';
@Component({

    templateUrl: './home.html',
    standalone: true,
    imports: [TranslatePipe, ResPipe]
})
export class PublicHomeComponent implements OnInit {

    welcomeText = Res.Get('WELCOME_TEXT');

    constructor( private seoService: SeoService) {
        //
    }
    ngOnInit(): void {
        //
    }

}
