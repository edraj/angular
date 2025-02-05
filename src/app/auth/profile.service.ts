import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config } from '../config';
import { mapResponse } from '../models/response.model';
import { IAuthInfo } from './auth.model';
import { AuthState } from './auth.state';
import { Profile } from './profile.model';


@Injectable({ providedIn: 'root' })
export class ProfileService {

  private _detailsUrl = Config.API.profile.details;

  constructor(private _http: HttpClient, private authState: AuthState) {

  }

  // get logged in user profile
  GetProfile(auth: IAuthInfo): Observable<IAuthInfo> {
    return this._http.get(this._detailsUrl).pipe(
      map(response => {

        const retProfile = Profile.NewInstance(mapResponse(response));
        const _auth = { ...auth, payload: retProfile };
        this.authState.SaveSession(_auth);
        return _auth;
      })
    );
  }



}
