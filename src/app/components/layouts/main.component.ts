import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../utils/seo.service';
import { TranslatePipe } from '../../lib/pipes/translate.pipe';
import { RouterModule } from '@angular/router';

@Component({
    templateUrl: './main.component.html',
    standalone: true,
    imports: [TranslatePipe, RouterModule]
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent implements OnInit {

    constructor( private seoService: SeoService) { }

    ngOnInit() {
    }



}
