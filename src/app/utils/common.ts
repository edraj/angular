

export const toSentenceCase = (s: string) => {
  return s.substring(0, 1).toUpperCase() + s.substring(1);
};

export const _global: any = typeof globalThis !== 'undefined' && globalThis || typeof global !== 'undefined' && global || typeof window !== 'undefined' && window;



export const GetParamsAsString = (urlParams: any, joinArray = false): string => {
  const s = new URLSearchParams();

  // for every key, if value is undefined, or null, or false, exclude
  Object.keys(urlParams).forEach(n => {
      const v = urlParams[n];
      if (v) {
          if (v instanceof Array) {
              if (v.length) {
                  // filter out empty strings
                  if (joinArray) {
                      const _v = v.filter(x => x && x !== '').join(',');
                      if (_v) { s.append(n, _v); }
                  } else {
                      // lookout for this, it might need an [] in the key
                      // append multiple if joinArray is false
                      v.filter(x => x !== '').forEach(f => s.append(n, f));
                  }
              }
          } else {
              // append key and value
              s.append(n, v);
          }
      }
  });
  return s.toString();

};

export const parseJwt =  (token: string): any => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export const toFormat = (s:string, ...args: any) => {
  const regExp = /\$(\d+)/gi;
  // match $1 $2 ...
  return s?.replace(regExp, (match, index) => {
      return args[index] ?? match;
  });

}
export const GetMatrixParamsAsString = (urlParams: any): string => {
  // for each urlparam, join with ';'
  let s = '';
  Object.keys(urlParams).forEach(n => {
      const v = urlParams[n];
      if (v) {
          if (v instanceof Array) {
              if (v.length) {
                  // filter out empty strings
                  v.filter(x => !!x).forEach(f => s +=`;${n}=${f}`);
              }
          } else {
              // append key and value
             s += `;${n}=${v}`;
          }
      }
  });
  return s;
}
export const CleanParams = (params: any): any => {
  // remove empty arrays, unidentified, nulls
  const s: any = {};
  Object.keys(params).forEach(n => {
      const v: any = params[n];
      if (v) {
          if (v instanceof Array) {
              if (v.length) {
                  // filter out empty strings and join
                  const _v: any = v.filter(x => x && x !== '').join(',');
                  if (_v) { s[n] = _v; }
              }
          } else {
              // append key and value
              s[n] = v;
          }
      }
  });

  return s;
};



export const makeDate = (dateString: string): Date | null => {
  if (dateString) {
      // do check to make sure it is valid date

      if (isNaN(Date.parse(dateString))) { return null; }

      return new Date(dateString);
  }
  return null;
};


export const fixAngularBug = (params: string[]): string[] => {
  // WATCH: https://github.com/angular/angular/issues/19179
  // get an array like this ["a,b"] and create an array ["a", "b"]
  if (params.length < 1) {
      return params;
  }
  return params[0].split(',');
};

/*
function copied from https://github.com/angus-c/just/blob/master/packages/collection-clone/index.js
Deep clones all properties except functions
var arr = [1, 2, 3];
var subObj = {aa: 1};
var obj = {a: 3, b: 5, c: arr, d: subObj};
var objClone = clone(obj);
arr.push(4);
subObj.bb = 2;
obj; // {a: 3, b: 5, c: [1, 2, 3, 4], d: {aa: 1}}
objClone; // {a: 3, b: 5, c: [1, 2, 3], d: {aa: 1, bb: 2}}
*/
const getRegExpFlags = (regExp: any) => {
  if (typeof regExp.source.flags == 'string') {
    return regExp.source.flags;
  } else {
    const flags = [];
    regExp.global && flags.push('g');
    regExp.ignoreCase && flags.push('i');
    regExp.multiline && flags.push('m');
    regExp.sticky && flags.push('y');
    regExp.unicode && flags.push('u');
    return flags.join('');
  }
};
export const clone = (obj: any) => {
  if (typeof obj == 'function') {
    return obj;
  }
  const result: any = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    // include prototype properties
    const value = obj[key];
    const type = {}.toString.call(value).slice(8, -1);
    if (type == 'Array' || type == 'Object') {
      result[key] = clone(value);
    } else if (type == 'Date') {
      result[key] = new Date(value.getTime());
    } else if (type == 'RegExp') {
      result[key] = RegExp(value.source, getRegExpFlags(value));
    } else {
      result[key] = value;
    }
  }
  return result;
};


export const hasMore = (total: number, size: number, currentPage: number): boolean => {

 if (total === 0) { return false; }

 const pages = Math.ceil(total / size);
 if (currentPage === pages) {
    // no more pages
    return false;
 } else {
    // yes more
    return true;
 }
};



export const uuid = (): string => {

  if (window?.crypto) {

      const buf = new Uint32Array(4);
      window.crypto.getRandomValues(buf);
      let idx = -1;
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          idx++;
          const r = (buf[idx >> 3] >> ((idx % 8) * 4)) & 15;
          const v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
      });

  } else {

      let dt = new Date().getTime();
      const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          const r = (dt + Math.random() * 16) % 16 | 0;
          dt = Math.floor(dt / 16);
          return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      return uuid;
  }
};
