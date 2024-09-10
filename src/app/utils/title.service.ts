import { Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

// this is aweful
@Injectable({providedIn: 'root'})
export class DmartTitleStrategy extends TitleStrategy {
  constructor() {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
  }
}
