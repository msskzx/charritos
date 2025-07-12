const translations = {
  en: {
    // NavBar
    title: 'Sanabel',
    categories: 'Categories',
    profiles: 'Profiles',
    // Homepage
    welcome: 'Welcome to Sanabel!',
    intro: 'Discover and support inspiring charities, learn about mosques around the world, learn about Islam, and discover many online libraries offering enriching books from around the world',
    charities: 'Charities',
    mosques: 'Mosques',
    libraries: 'Libraries',
    discover: 'Discover Something New',
    random: "Can't decide what to explore? Let us surprise you with a random charity to support or a beautiful mosque to support. Every click opens a new opportunity to make a difference or learn something amazing",
    // All Profiles
    allProfiles: 'All Profiles',
    profilesFound: (total: number) => `${total} profile${total === 1 ? '' : 's'} found`,
    searchPlaceholder: 'Search',
    noProfiles: 'No profiles found.',
    prev: 'Previous Page',
    next: 'Next Page',
    profilesError: 'Failed to load profiles',
    pageOf: (page: number, totalPages: number) => `Page ${page} of ${totalPages}`,
    // All Categories
    allCategories: 'All Categories',
    noCategories: 'No categories found.',
    categoriesError: 'Failed to load categories',
    // Category Detail Page
    categoryNotFound: 'Category not found',
    failedToLoadCategory: 'Failed to load category data',
    loadingProfiles: 'Loading profiles...',
    noProfilesInCategory: 'No profiles found in this category.',
    viewAllProfiles: 'View All Profiles',
    // Profile Detail Page
    profileNotFound: 'Profile not found',
    failedToLoadProfile: 'Failed to load profile data',
    backToAllProfiles: 'Back to All Profiles',
    location: 'location',
    // Breadcrumbs
    backToCategories: 'Back to Categories',
    backToProfiles: 'Back to Profiles',
    // Donations
    donations: 'Donations',
    // Profile count
    profileCount: 'profile',
    profileCountPlural: 'profiles',
    // Category Data
    categoryData: {
      charity: {
        name: 'Charities',
        description: 'Organizations making a positive difference.',
      },
      mosque: {
        name: 'Mosques',
        description: 'Mosques around the world.',
      },
      library: {
        name: 'Libraries',
        description: 'Discover a wide range of books across different genres and topics.',
      },
      islam: {
        name: 'Islam',
        description: 'Resources for learning about Islam.',
      },
    },
  },
  ar: {
    // NavBar
    title: 'سنابل',
    categories: 'التصنيفات',
    profiles: 'الملفات الشخصية',
    // Homepage
    welcome: 'مرحبًا بكم في سنابل',
    intro: 'اكتشف وادعم الجمعيات الخيرية الملهمة، وتعرف على المساجد حول العالم، وتعلم عن الإسلام، واكتشف العديد من المكتبات الإلكترونية التي تقدم كتبًا غنية من جميع أنحاء العالم',
    charities: 'الجمعيات الخيرية',
    mosques: 'المساجد',
    libraries: 'المكتبات',
    discover: 'اكتشف شيئًا جديدًا',
    random: 'لا تستطيع أن تقرر ماذا تستكشف؟ دعنا نفاجئك بجمعية خيرية عشوائية لدعمها أو مسجد جميل لاكتشافه. كل نقرة تفتح فرصة جديدة لإحداث فرق أو تعلم شيء مذهل',
    // All Profiles
    allProfiles: 'جميع الملفات الشخصية',
    profilesFound: (total: number) => `تم العثور على ${total} ملف شخصي`,
    searchPlaceholder: 'بحث',
    noProfiles: 'لم يتم العثور على ملفات شخصية.',
    prev: 'الصفحة السابقة',
    next: 'الصفحة التالية',
    profilesError: 'فشل في تحميل الملفات الشخصية',
    pageOf: (page: number, totalPages: number) => `صفحة ${page} من ${totalPages}`,
    // All Categories
    allCategories: 'جميع التصنيفات',
    noCategories: 'لم يتم العثور على تصنيفات.',
    categoriesError: 'فشل في تحميل التصنيفات',
    // Category Detail Page
    categoryNotFound: 'لم يتم العثور على التصنيف',
    failedToLoadCategory: 'فشل في تحميل بيانات التصنيف',
    loadingProfiles: 'جاري تحميل الملفات الشخصية...',
    noProfilesInCategory: 'لم يتم العثور على ملفات شخصية في هذا التصنيف.',
    viewAllProfiles: 'عرض جميع الملفات الشخصية',
    // Profile Detail Page
    profileNotFound: 'لم يتم العثور على الملف الشخصي',
    failedToLoadProfile: 'فشل في تحميل بيانات الملف الشخصي',
    backToAllProfiles: 'العودة إلى جميع الملفات الشخصية',
    location: 'الموقع',
    // Breadcrumbs
    backToCategories: 'العودة إلى التصنيفات',
    backToProfiles: 'العودة إلى الملفات الشخصية',
    // Donations
    donations: 'التبرعات',
    // Profile count
    profileCount: 'ملف شخصي',
    profileCountPlural: 'ملفات شخصية',
    // Category Data
    categoryData: {
      charity: {
        name: 'الجمعيات الخيرية',
        description: 'منظمات تقوم بفعل الخير وإحداث فرق إيجابي',
      },
      mosque: {
        name: 'المساجد',
        description: 'مساجد حول العالم',
      },
      library: {
        name: 'المكتبات',
        description: 'اكتشف مجموعة واسعة من الكتب عبر مختلف الأنواع والمواضيع',
      },
      islam: {
        name: 'الإسلام',
        description: 'موارد لتعلم الإسلام',
      },
    },
  },
};

export default translations; 