import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config } from '../config';
import { IAuthInfo } from './auth.model';
import { AuthState } from './auth.state';
import { IProfile, Profile } from './profile.model';


@Injectable({ providedIn: 'root' })
export class ProfileService {

  private _detailsUrl = Config.API.profile.details;

  constructor(private _http: HttpClient, private authState: AuthState) {

  }

  // get logged in user profile
  GetProfile(auth: IAuthInfo): Observable<IProfile> {
    const _url = this._detailsUrl;
    return this._http.get(_url).pipe(
      map(response => {
        const retProfile = Profile.NewInstance(response);
        // WATCH: dates become strings
        const _auth = { ...auth, payload: retProfile };
        this.authState.SaveSession(_auth);
        return retProfile;
      })
    );

  }


}
