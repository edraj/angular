import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config } from '../config';
import { ApiResponse } from '../services/response.model';
import { AuthInfo, IAuthInfo } from './auth.model';
import { AuthState } from './auth.state';



@Injectable({ providedIn: 'root' })
export class AuthService {

  private _loginUrl = Config.API.auth.login;

  constructor(private http: HttpClient, private authState: AuthState) {
    _seqlog('authservices construct');
  }


  Login(username: string, password: string): Observable<IAuthInfo> {

    const data = AuthInfo.PrepAccessToken(username, password);
    return this.http.post(this._loginUrl, data).pipe(

      map(response => {
        _attn(response, 'response');
        // prepare the response to be handled, then return
        const resUser: IAuthInfo = AuthInfo.NewInstance(ApiResponse.NewInstance(response));
        return this.authState.SaveSession(resUser);

      })
    );
  }


  Logout() {
    // logout locally

  }



}
