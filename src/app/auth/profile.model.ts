import { Translation } from '../models/translation.model';

export interface IProfile {
  // id: string;
  email?: string;
  username: string; // shortname
  displayname?: string;
  type?: string;
  isEmailVerified?: boolean;
  forcePasswordChange?: boolean;
  isMobileVerified?: boolean; // whats this?
  mobile?: string; // whats this?
  roles?: string[];
  // TODO: permissions

}


export class Profile  {
  public static NewInstance(profile: any): IProfile {
    // get
    return {
      // firstname: profile.FirstName,
      // lastname: profile.LastName,
      email: profile.email,
      username: profile.shortname,
      displayname: Translation.MapLanguage(profile.displayname),
      type: profile.type,
      isEmailVerified: profile.is_email_verified,
      isMobileVerified: profile.is_msisdn_verified,
      mobile: profile.msisdn,
      roles: profile.roles,
      forcePasswordChange: profile.force_password_change,
    };
  }

}
