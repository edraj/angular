
export interface IProfile {
  // id: string;
  firstname?: string;
  lastname?: string;
  email?: string;
}

export interface INewProfile extends IProfile {
  stage?: number;
  otp?: string;
  password?: string;
}

export class Profile implements IProfile {
  // public id: string;
  public static NewInstance(profile: any): IProfile {
    return {
      firstname: profile.FirstName,
      lastname: profile.LastName,
      email: profile.Email,

    };
  }

}
