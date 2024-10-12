import { IProfile, Profile } from './profile.model';


export interface IAuthInfo {
  accessToken?: string;
  expiresAt?: number;
  payload?: IProfile;

}

export class AuthInfo implements IAuthInfo {



  public static NewInstance(res: any): IAuthInfo {

    // decode res.access_token
    const _res = JSON.parse(atob(res.access_token.split('.')[1]));
    if (!_res) return null;

    return {
      accessToken: res.access_token,
      expiresAt: _res.expires * 1000,
      payload: Profile.NewInstance(res) // this has shortname
    };
  }

  public static PrepAccessToken(username: string, password: string): any {

    return {
      shortname: username,
      password: password
    };
  }


  // REST
  public static PrepReset(password: string, token: string): any {

    return {
      Code: token,
      Password: password
    };
  }


  // change password
  public static PrepSave(auth: { password: string, newPassword: string; }): string {
    return `newPassword=${auth.newPassword}&oldPassword=${auth.password}`;

  }


  public static PrepForgot(email: string): string {
    return `email=${email}`;
  }




}
