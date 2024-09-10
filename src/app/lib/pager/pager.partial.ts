import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LoaderState } from '../loader/loader.state';
import { TranslatePipe } from '../pipes/translate.pipe';

 @Component({
   selector: 'cr-pager',
   template: `
     <div class="pager" [class.loading]="loading$ | async">
         <button class="btn-fake" *ngIf="isLoadMore" (click)="page($event)" title="{{'show more' | translate:'ShowMore'}}">More</button>
     </div>
   `,
   styleUrls: ['./pager.less'],
   encapsulation: ViewEncapsulation.None,
   standalone: true,
   imports: [CommonModule, TranslatePipe]
 })
 export class PagerPartialComponent implements OnInit {
   @Input() isLoadMore = false;
   @Input() source?: string;
   @Output() onPage: EventEmitter<{event: MouseEvent, source: string}> = new EventEmitter();

   loading$: Observable<boolean>;

   constructor(private loaderState: LoaderState) {
   }
   ngOnInit(): void {

     this.loading$ = this.loaderState.stateItem$.pipe(
       filter(state => state.context === this.source),
       map(state => state ? state.show : false)
     );


   }
   page(event: MouseEvent): void {
    // pass back the source
     this.onPage.emit({event, source: this.source});
   }

  
 }
