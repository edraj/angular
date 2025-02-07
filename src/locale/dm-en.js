


// make it run on both platforms
(function (global) {

  const _LocaleId = 'en';
  const _Language = 'en';




  const keys = {
    NoRes: '',
    Required: 'Required',
    Error: 'An error occurred',
    Dismiss: 'Dismiss',
    Unknown: 'Oops! We could not perform the required action for some reason. We are looking into it right now.',
    DONE: 'Done',
    UNAUTHORIZED: 'You are not authorised to view this page.',
    SAVED: 'Saved successfully',
    INVALID_TOOLONG: 'Too long',
    INVALID_TOOSHORT: 'Too short',
    INVALID_TOOLARGE: 'Too large',
    INVALID_TOOSMALL: 'Too small',
    INAVLID_NUMBER: 'Not a number',
    INVALID_email_FORMAT: 'Invalid email format',
    INVALID_url_FORMAT: 'Invalid URL format',
    INVALID_phone_FORMAT: 'Invalid phone format',
    INVALID_password_FORMAT: 'Invalid password format',
    INVALID_shortname_FORMAT: 'Invalid shortname format',
    INVALID_FILE_FORMAT: 'The format of the file is not allowed. Allowed formats are: $0',
    INVALID_date_FORMAT: 'Invalid date format',
    ALREADY_EXISTS: 'The email you used has already been signed up. Use another one, or try to sign in.',
    INVALID_VALUE: 'Value entered is not within the range allowed',
    INVALID_LENGTH: 'The length of the value entered is not within range allowed',
    INVALID_FORMAT: 'Invalid format',
    FILE_LARGE: 'The size of the file is larger than the specified limit ($0 KB)',
    PAGE_NOT_FOUND: 'Hmm! Once in a while, we change address and forget to update the mailman.',
    INVALID_FORM: 'Some fields are not valid, fix and submit again.',
    INVALID_LOGIN: 'Wrong username or password.',
    Login: 'Sign in',
    SECONDS: { 1: 'one second', 2: 'few seconds', 10: '$0 seconds' },
    MINUTES: { 1: 'one minute', 2: 'few minutes', 9: '$0 minutes' },
    HOURS: { 1: 'one hour', 2: 'few hours', 9: '$0 hours' },
    DAYS: { 1: 'one day', 2: 'few days', 9: '$0 days' },
    MONTHS: { 1: 'one month', 2: 'few months', 4: '$0 months' },
    YEARS: { 1: 'one year', 2: '$0 years', 5: 'many years' },
    TIMEAGO: '$0 ago',
    INTIME: 'in $0',
    Results: { 0: 'no results', 1: 'one result', 2: 'two results', 3: '$0 results' },
    SEO_CONTENT: {
      HOME_TITLE: 'Home',
      HOME: 'Home'
    },
    PAGE_TITLES: {
      ERROR: 'Oh oh, an error occurred',
      NOT_FOUND: '404! Hmm! Once in a while, we change address and forget to update the mailman.'
    },
    // FIXME: fix this
    NewSpace: 'Create space',
    Spaces: 'Spaces',
    Logout: 'Logout',
    Type: 'Type',
    Email: 'Email',
    Phone: 'Phone',
    DisplayName: 'Display name',
    Roles: 'Roles',
    Preferences: 'Preferences',
    Language: 'Language',
    Username: 'Username',
    Password: 'Password',
    LastUpdated: 'Last updated',
    Created: 'Created',
    DisplayNameEn: 'Display name (en)',
    Shortname: 'Shortname',
    NoSpacesAllowed: 'No spacecs allowed',
    DescriptionEn: 'Description (en)',
    ContentType: 'Content type',
    Body: 'Body',
    Save: 'Save',
    AddFolder: 'Add folder',
    AddContent: 'Add content',
    CreateNew: 'Create new',
    CreateFolder: 'Create folder',
    
    ForceNewPassword: 'Force new password',
VERIFIED: 'Verified',
    NewUserQuestion: 'New user?',
Register: 'Register',
    // inject:translations 
   // endinject
  };

  global.dm = global.dm || {};
  global.dm.resources = {
    language: _Language,
    keys,
    localeId: _LocaleId
  }

  // for nodejs
  global.dm[_Language] = global.dm.resources;



})(typeof globalThis !== 'undefined' && globalThis || typeof global !== 'undefined' && global ||
  typeof window !== 'undefined' && window);
