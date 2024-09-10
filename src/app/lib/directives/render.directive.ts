import { NgIf, isPlatformServer } from '@angular/common';
import { Directive, Input, OnInit, PLATFORM_ID, inject } from '@angular/core';

@Directive({
  selector: '[shServerRender]',
  standalone: true,
  hostDirectives: [{
    directive: NgIf,
    inputs: ['ngIfElse: shServerRenderElse']
  }]
})
export class RenderDirective implements OnInit {
  @Input() shServerRender: boolean;

  private ngIfDirective = inject(NgIf);
  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    // if sherverrender is false, do not render on server, if true, serve only on server
    if (isPlatformServer(this.platformId) === this.shServerRender) {
      this.ngIfDirective.ngIf = true;
    } else {
      this.ngIfDirective.ngIf = false;
    }
  }
}
