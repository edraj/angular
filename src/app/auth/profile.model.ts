
export interface IProfile {
  // id: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  username?: string;
}


export class Profile implements IProfile {
  // public id: string;
  public static NewInstance(profile: any): IProfile {
    return {
      firstname: profile.FirstName,
      lastname: profile.LastName,
      email: profile.Email,
      username: profile.username
    };
  }

}
