import { Res } from '../utils/resources';

export interface ITranslation {
  [key: string]: string;
  // can this be automatical?
}


export class Translation {
  static MapLanguage(prop: ITranslation): string {
    return prop ? prop[Res.language] : '';
  }


}
