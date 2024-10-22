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
    rootPath: '__root__',
    rootSpace: 'management',
    apiRoot: environment.apiRoot,
    apiVersion: 1,
    data: {
      notdefined: '/data/notdefined'
    },
    auth: {
      login: '/user/login',
    },
    profile: {
      details: '/user/profile'
    },
    config: {
      local: environment.localConfig
    }

    // later: content from.amanged/payload
    // managed/resource
    , space: {
      // query
      list: '/managed/query',
      details: '/managed/entry/space/Ayyash/__root__/Ayyash',
      create: '/managed/space', // POST
      save: '/spaces/:id', // PUT
      delete: '/spaces/:id', // DELETE
    }
    , resource: {
      query: '/managed/query',
      details: '/managed/entry/:resource/:space/:subpath?:options', // :shortname not needed
      create: '/managed/request', // POST
      save: '/resources/:id', // PUT
      delete: '/resources/:id', // DELETE
    }
    // **gulpmodel**
  }
};

