import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IAuthInfo } from '../../auth/auth.model';
import { AuthState } from '../../auth/auth.state';
import { IProfile } from '../../auth/profile.model';
import { TranslatePipe } from '../../lib/pipes/translate.pipe';
@Component({
  templateUrl: './details.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, TranslatePipe]
})
export class ProfileDetailsComponent implements OnInit {


  profile$: Observable<IProfile>;
  constructor(private authState: AuthState) {
    //
  }
  ngOnInit(): void {
    this.profile$ = this.authState.stateItem$.pipe(map((auth: IAuthInfo) => auth.payload));
  }

  changeLanguage(lang: string): string {
    // swap language and save, then reload page
    // if environment is in development, do nothing
    if (environment.production) {
      return `/switchlang?lang=${lang}&red=${this.authState.redirectUrl}`;
    }
    _attn(lang, 'Language change is disabled in development mode');
    return '';
  }

}
