import { Res } from '../utils/resources';

export interface ITranslation {
  [key: string]: string;
}


export class Translation {
  static MapLanguage(prop: ITranslation): string {
    return prop ? prop[Res.language] : '';
  }

  // TODO: make a loop from config languages
  static PrepLanguage(prop: ITranslation): ITranslation {
    return {
      en: prop['en'],
      ar: prop['ar'],
      ku: prop['ku'],
    };
  }

}
