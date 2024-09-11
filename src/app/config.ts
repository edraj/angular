import { environment } from '../environments/environment';


export const Config = {
    isServed: false,
    Basic: {
        defaultRoute: '/',
        defaultSize: 25,
        defaultDateFormt: 'DD-MM-YYYY',
        defaultUploadSize: 1048576,
        defaultUploadFormat: ['gif', 'jpg', 'jpeg', 'png'],
        lockTimeout: 100

    },
    Res: {
      languages: [{ name: 'en', display: 'English' }, { name: 'ar', display: 'عربي' }],
      defaultLanguage: 'en'
    },
    Auth: {
        userAccessKey: 'dmart.user',
        redirectKey: 'redirectUrl',
        loginRoute: '/login',
    },
    Cache: {
        Timeout: 1,
        Key: 'dmart.cache',
        ResetKey: 'dmart.20240101'
    },
    API: {
        apiRoot: environment.apiRoot,
        apiVersion: 1,
        data: {
            notdefined: '/data/notdefined'
        },
        auth: {
          login: '/user/login'
        },
        profile: {
            details: '/api/services/app/Profile/GetProfile'
        },
        config: {
            local: environment.localConfig
        }
         // **gulpmodel**
    }
};

