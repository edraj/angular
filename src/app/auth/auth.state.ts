import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Config } from '../config';
import { StorageService } from '../data/storage.service';
import { ConfigService } from '../utils/config.service';
import { StateService } from '../utils/state.abstract';
import { IAuthInfo } from './auth.model';



@Injectable({ providedIn: 'root' })
export class AuthState extends StateService<IAuthInfo> {

  get redirectUrl(): string {
    return this.localStorage.getItem(Config.Auth.redirectKey);
  }
  set redirectUrl(value: string) {
    this.localStorage.setItem(Config.Auth.redirectKey, value);
  }


  constructor(
    private configService: ConfigService,
    private localStorage: StorageService,
    private router: Router,

  ) {
    super();

    this.configService.config$.pipe(
      filter(config => config.isServed)
    ).subscribe({
      next: () => {
        // check item validity
        const _localuser: IAuthInfo = this._GetUser();

        if (this.CheckAuth(_localuser)) {
          this.SetState(_localuser);
        } else {
          this.Logout(false);
        }

      }
    }
    );
  }

  private _SaveUser(user: IAuthInfo) {
    this.localStorage.setItem(
      ConfigService.Config.Auth.userAccessKey, user, user.expiresAt
    );
  }
  private _RemoveUser() {
    this.localStorage.removeItem(ConfigService.Config.Auth.userAccessKey);
  }

  private _GetUser(): IAuthInfo | null {

    const _localuser: IAuthInfo = this.localStorage.getItem(ConfigService.Config.Auth.userAccessKey);

    if (_localuser && _localuser.accessToken) {
      return _localuser;
    }
    return null;
  }
  SaveSession(user: IAuthInfo): IAuthInfo | null {
    if (user.accessToken) {

      this._SaveUser(user);
      this.SetState(user);
      return user;
    } else {
      // remove token from user
      this._RemoveUser();
      this.RemoveState();
      return null;
    }

  }

  UpdateSession(user: IAuthInfo) {
    const _localuser: IAuthInfo = this._GetUser();

    if (_localuser) {
      _localuser.accessToken = user.accessToken;

      this._SaveUser(_localuser);

      this.UpdateState(user);
    } else {
      // remove token from user
      this._RemoveUser();
      this.RemoveState();
    }
  }

  CheckAuth(user: IAuthInfo) {
    if (!user || !user.accessToken) {
      return false;
    }
    if (Date.now() > user.expiresAt) {
      // expired
      return false;
    }
    // return if profile is valid
    return true;
  }
  Logout(reroute: boolean = false) {
    // remove leftover
    this.RemoveState();
    // and clean localstroage
    this._RemoveUser();

    if (reroute) {
      this.router.navigateByUrl(Config.Auth.loginRoute);
    }
  }

  GetToken() {
    const _auth = this.currentItem;
    // check if auth is still valid first before you return
    return this.CheckAuth(_auth) ? _auth.accessToken : null;;
  }



}
