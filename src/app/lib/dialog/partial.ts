import { Component, ChangeDetectionStrategy, EventEmitter, Output, ViewEncapsulation, HostListener } from '@angular/core';

@Component({
   selector: 'nv-dialog-partial',
   templateUrl: './partial.html',
   changeDetection: ChangeDetectionStrategy.OnPush,
   encapsulation: ViewEncapsulation.None
})
export class DialogPartialComponent {

   @Output() onClose: EventEmitter<any> = new EventEmitter<any>();


   title: string = '';
   // remove css, where are my fields

   public close(data?: any): void {
      this.onClose.emit(data);
   }


   @HostListener('click', ['$event.target'])
   onClick(target: HTMLElement): void {
      if (target.matches('.d-overlay')){
         this.close(null);
      }
   }
   @HostListener('window:keydown', ['$event'])
   onEscape(event: KeyboardEvent): void {
       // hide on escape
       if (event.code === 'Escape') {
           this.close(null);
       }
   }
}

