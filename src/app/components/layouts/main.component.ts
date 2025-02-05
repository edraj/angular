import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { IAuthInfo } from '../../auth/auth.model';
import { AuthState } from '../../auth/auth.state';
import { TranslatePipe } from '../../lib/pipes/translate.pipe';

@Component({
    templateUrl: './main.component.html',
    imports: [ RouterModule, CommonModule, TranslatePipe]
})
export class MainLayoutComponent implements OnInit {
  profile$: Observable<IAuthInfo>;
  constructor(private authState: AuthState) { }

  ngOnInit() {
    this.profile$ = this.authState.stateItem$;
  }
  logout() {
    this.authState.Logout(true);

  }
}
