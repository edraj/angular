import { IProfile } from './profile.model';


export interface IAuthInfo {
  accessToken?: string;
  expiresAt?: number;
  payload?: IProfile;

}

export class AuthInfo implements IAuthInfo {



  public static NewInstance(res: any): IAuthInfo {
    _attn(res);
    return {
      accessToken: res.access_token,
      expiresAt: Date.now() + (15 * 60 * 1000)
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
