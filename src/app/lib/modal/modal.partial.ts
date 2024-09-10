import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '../../utils/platform.service';

@Component({
  selector: 'cr-modal',
  templateUrl: './modal.partial.html',
  standalone: true,
  imports: [CommonModule]
})
export class ModalPartialComponent implements OnDestroy, AfterContentInit {


  @Input() title: string = '';
  @Input() withFooter = false;
  @Input() trigger: string | null;
  @Output() onShow = new EventEmitter();
  @Output() onHide = new EventEmitter();
  @Output() onLoad = new EventEmitter();

  isVisible$ = new BehaviorSubject<boolean>(false);

  private config = {
    overlaySelector: '.d-overlay',
    bodyCss: 'mdl-open'
  };

  constructor(private platform: Platform) { }

  ngAfterContentInit(): void {
    if (this.platform.isBrowser) {
      this.onLoad.emit();
    }
  }
  public hide(emit = true): void {
    // hide dialog
    if (this.platform.isBrowser) {
      this.isVisible$.next(false);

      document.body.classList.remove(this.config.bodyCss);
    }
  }
  public show(title?: string): void {
    // show dialog
    if (this.platform.isBrowser) {

      // change title
      // WATCH: do i need a subjct? maybe signal?
      if (title) {
        this.title = title;
      }
      this.isVisible$.next(true);
      this.onShow.emit();
      // add a class to body to help in positioning better
      document.body.classList.add(this.config.bodyCss);
    }
  }
  public isVisible(): boolean {
    return this.isVisible$.getValue();
  }

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: HTMLElement): void {
    // if this is the trigger, or a closest is the trigger, do trigger
    if (this.trigger) {
      if (target.matches(this.trigger) || target.closest(this.trigger)) {
        // itself or its parent
        const _t = target.matches(this.trigger) ? target : target.closest(this.trigger);
        if (_t) {
          // TODO: optionally pass title?
          this.show();
        }
      }
    }

  }

  @HostListener('click', ['$event.target'])
  onClick(target: HTMLElement): void {
    if (target.matches(this.config.overlaySelector)) {
      this.hide(true);
    }
  }

  @HostListener('window:keydown', ['$event'])
  closeEscape(event: KeyboardEvent): void {
    // hide on escape
    if (event.code === 'Escape') {
      this.hide();
    }
  }

  ngOnDestroy(): void {
    // shit, this caused issues
    // hide without emitting
    this.hide(false);
  }

}
