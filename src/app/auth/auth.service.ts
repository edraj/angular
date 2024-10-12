import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Config } from '../config';
import { mapResponse } from '../models/response.model';
import { AuthInfo, IAuthInfo } from './auth.model';
import { AuthState } from './auth.state';
import { ProfileService } from './profile.service';



@Injectable({ providedIn: 'root' })
export class AuthService {

  private _loginUrl = Config.API.auth.login;

  constructor(private http: HttpClient, private authState: AuthState, private profileService: ProfileService) {
    _seqlog('authservices construct');
  }


  Login(username: string, password: string): Observable<IAuthInfo> {

    const data = AuthInfo.PrepAccessToken(username, password);
    return this.http.post(this._loginUrl, data).pipe(

      map(response => {
        // prepare the response to be handled, then return
        const resUser: IAuthInfo = AuthInfo.NewInstance(mapResponse(response));
        return this.authState.SaveSession(resUser);

      }),
      switchMap(auth => this.profileService.GetProfile(auth))
    );
  }


  Logout() {
    // logout locally

  }



}
