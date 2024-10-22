import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Output, ViewEncapsulation } from '@angular/core';
import { IDialogOptions } from './service';

@Component({
    selector: 'cr-dialog',
   templateUrl: './partial.html',
   changeDetection: ChangeDetectionStrategy.OnPush,
   encapsulation: ViewEncapsulation.None,
   standalone: true,
   imports: [CommonModule]
})
export class DialogPartial {

   @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

   public options: IDialogOptions<any>;

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


   // so unfortunate! when click begins on one element and ends on a different element,
   // browser registers a full click on the shared parent.
   // to prevent a by-mistake click and drag, catch an explicit mousedown on the overlay
   @HostListener('mousedown', ['$event.target'])
   onMouseDown(target: HTMLElement): void {
      if (target.matches('.d-overlay, .modal-dialog, .modal') && !this.options.ismodal) {
         this.close(null);
      }
   }

}

