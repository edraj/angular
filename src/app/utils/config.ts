import { environment } from '../../environments/environment';


export const Config = {
    isServed: false,
    Basic: {
        country: 'jo',
        defaultRoute: '/',
        defaultSize: 25,
        defaultDateFormt: 'DD-MM-YYYY',
        defaultUploadSize: 1048576,
        defaultUploadFormat: ['gif', 'jpg', 'jpeg', 'png'],
        defaultToastTimeout: 5000
    },
    Res: {
      cookieName: 'cr-lang', // for netlify it's nf_lang
      languages: [{name: 'en', display: 'English'}, {name: 'ar', display: 'عربي'}],
      defaultLanguage: 'en' // not maintained
  },
    Auth: {
        userAccessKey: 'dmart.user'
    },
    Storage: {
        Timeout: 1,
        Key: 'localkey',
        ResetKey: '20180220'
    },
   
    API: {
        apiRoot: environment.apiRoot,
        apiVersion: 1,
        data: {
            notdefined: '/data/notdefined'
        },
        config: {
            local: environment.localConfig
        }
         // **gulpmodel**
    }
};

