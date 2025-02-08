import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IAuthInfo } from '../../auth/auth.model';
import { AuthState } from '../../auth/auth.state';
import { IProfile } from '../../auth/profile.model';
import { Config } from '../../config';
import { TranslatePipe } from '../../lib/pipes/translate.pipe';
import { Res } from '../../utils/resources';
@Component({
  templateUrl: './details.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, TranslatePipe]
})
export class ProfileDetailsComponent implements OnInit {


  profile$: Observable<IProfile>;


  selectedLanguage = Config.Res.languages.find(l => l.name === Res.language).display;
  otherLanguage = Config.Res.languages.find(l => l.name !== Res.language);

  constructor(private authState: AuthState) {
    //
  }
  ngOnInit(): void {
    this.profile$ = this.authState.stateItem$.pipe(map((auth: IAuthInfo) => auth.payload));
  }

  changeLanguage(): string {
    // swap language and save, then reload page
    // if environment is in development, do nothing

    // the other language:
    const lang = this.otherLanguage.name;
    if (environment.production && !environment.vercel) {
      return `/switchlang?lang=${lang}&red=${this.authState.redirectUrl}`;
    }
    _attn(lang, 'Language change is disabled in development mode');
    return '';
  }

  // for web only, like vercel, reload with new cookie
  switchLanguage() {
    const lang = this.otherLanguage.name;

    if (environment.vercel) {
      // for netlify set nf_lang
      this.setCookie(lang, Config.Res.cookieName, 365);
      window.location.reload();

    }

  }
  private setCookie(value: string, key: string, expires: number) {

    let cookieStr = encodeURIComponent(key) + '=' + encodeURIComponent(value) + ';';
    const dtExpires = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);

    cookieStr += 'expires=' + dtExpires.toUTCString() + ';';
    cookieStr += 'path=/;';

    document.cookie = cookieStr;
  }
}
