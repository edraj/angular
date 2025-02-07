
// make it run on both platforms
(function (global) {

  const _LocaleId = 'ar-JO';
  const _Language = 'ar';


  if (window != null) {
    // in browser platform
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.defer = true;
    script.src = `locale/${_LocaleId}.js`;
    document.head.appendChild(script);

  } else {
    // in server platform
    require(`./${_LocaleId}.js`);
  }

  // TODO: translate
  const keys = {
    NoRes: '', // if resource is not found
    Required: 'مطلوب',
    Error: 'حدث خطأ ما',
    Dismiss: '',
    Unknown: 'لم نستطع تنفيذ الأمر المطلوب لخطأ ما. نحن نتحقق من هذا الأمر حالًا.',
    DONE: 'تمّ الأمر',
    UNAUTHORIZED: 'ليس لديك الصلاحية لمشاهدة هذه الصفحة.',
    SAVED: 'حُفظ',
    INVALID_TOOLONG: 'Too long',
    INVALID_TOOSHORT: 'Too short',
    INVALID_TOOLARGE: 'Too large',
    INVALID_TOOSMALL: 'Too small',
    INAVLID_NUMBER: 'ليس رقمًا',
    INVALID_email_FORMAT: 'صيغة البريد الإلكتروني غير صحيحة',
    INVALID_url_FORMAT: 'صيغة الرابط غير صحيحة',
    INVALID_phone_FORMAT: 'صيغة غير صحيحة لرقم الهاتف',
    INVALID_password_FORMAT: 'كلمة مرور بصيغة غير صحيحة',
    INVALID_shortname_FORMAT: 'صيغة الاسم القصير غير صيحية',
    INVALID_FILE_FORMAT: 'صيغة الملف غير مقبولة. الصيغ المقبولة هي: $0',
    INVALID_date_FORMAT: 'Invalid date format',
    ALREADY_EXISTS: 'هذا البريد مسجّل لدينا. حاول الدخول أو استخدم عنوانًا آخر.',
    INVALID_VALUE: 'ليس ضمن القيم المسموح بها',
    INVALID_LENGTH: 'طول القيمة المدخلة ليس ضمن النطاق المسموح به',
    INVALID_FORMAT: 'صيغة غير صحيحة',
    FILE_LARGE: 'حجم الملف أكبر من المسموح به. ($0 KB)',
    PAGE_NOT_FOUND: 'أهلًا. هذا العنوان أصبح خاليًا.',
    INVALID_FORM: 'بعض الحقول بها أخطاء. أصلحها وحاول مجددًا.',
    INVALID_LOGIN: 'اسم المستخدم أو كلمة المرور غير صحيحة. حاول مجددًا.',
    Login: 'دخول',
    SECONDS: { 1: 'ثاينة واحدة', 2: 'ثوانٍ', 11: '$0 ثانية' },
    MINUTES: { 1: 'دقيقة واحدة', 2: 'دقائق', 11: '$0 دقيقة' },
    HOURS: { 1: 'ساعة واحدة', 2: 'ساعتين', 3: '$0 ساعات', 11: '$0 ساعة' },
    DAYS: { 1: 'يوم واحد', 2: 'يومين', 3: '$0 ايام', 11: '$0 يوما' },
    MONTHS: { 1: 'شهر واحد', 2: 'عدة أشهر', 11: '$0 شهرًا' },
    YEARS: { 1: 'سنة واحدة', 2: 'سنتين', 3: '$0 سنوات', 5: 'سنين' },
    TIMEAGO: 'قيل $0',
    INTIME: 'في $0',
    Results: { 0: 'لا نتائج', 1: 'نتيجة واحدة', 2: 'نتيجتين', 3: '$0 نتائج', 11: '$0 نتيجة' },
    SEO_CONTENT: {
      HOME_TITLE: 'الرئيسية',
      HOME: 'الرئيسة'
    },
    PAGE_TITLES: {
      ERROR: 'حدث خطأ ما!',
      NOT_FOUND: '404! أهلاً. هذا العنوان أصبح خاليًا.'
    },
    NewSpace: 'مساحة جديدة',
    Spaces: 'مساحات',
    Logout: 'خروج',
    Type: 'النوع',
    Email: 'البريد الالكتروني',
    Phone: 'الهاتف',
    DisplayName: 'الاسم الظاهر',
    Roles: 'الأدوار',
    Preferences: 'التفضيلات',
    Language: 'اللغة',
    Username: 'اسم المستخدم',
    Password: 'كلمة المرور',
    LastUpdated: 'آخر تحديث',
    Created: 'تاريخ الإنشاء',
    DisplayNameEn: 'الاسم الظاهر (إنجليزي)',
    Shortname: 'الاسم القصير',
    NoSpacesAllowed: 'لا يسمح بالفراغات',
    DescriptionEn: 'الوصف (إنجليزي)',
    ContentType: 'نوع المحتوى',
    Body: 'المحتوى',
    Save: 'احفظ',
    AddFolder: 'أضف مجلدًا',
    AddContent: 'أضف محتوًا',
    CreateNew: 'أنشئ',
    CreateFolder: 'مجلد جديد',
    ForceNewPassword: 'يجب تغيير كلمة المرور',
    VERIFIED: 'محقّق',
    NewUserQuestion: 'مستخدم جديد؟',
    Register: 'سجّل',
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
