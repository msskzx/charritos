const translations = {
  en: {
    // NavBar
    title: 'Sanabel',
    categories: 'Categories',
    profiles: 'Profiles',
    // Homepage
    welcome: 'Welcome to Sanabel!',
    intro: 'Discover and support inspiring charities, learn about mosques around the world, learn about Islam, and discover many online libraries offering enriching books from around the world.',
    charities: 'Charities',
    mosques: 'Mosques',
    libraries: 'Libraries',
    discover: 'Discover Something New',
    random: "Can't decide what to explore? Let us surprise you with a random charity to support or a beautiful mosque to discover. Every click opens a new opportunity to make a difference or learn something amazing.",
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
    // Breadcrumbs
    backToCategories: 'Back to Categories',
    backToProfiles: 'Back to All Profiles',
  },
  ar: {
    // NavBar
    title: 'سنابل',
    categories: 'التصنيفات',
    profiles: 'الملفات الشخصية',
    // Homepage
    welcome: 'مرحبًا بكم في سنابل',
    intro: 'اكتشف وادعم الجمعيات الخيرية الملهمة، وتعرف على المساجد حول العالم، وتعلم عن الإسلام، واكتشف العديد من المكتبات الإلكترونية التي تقدم كتبًا غنية من جميع أنحاء العالم.',
    charities: 'الجمعيات الخيرية',
    mosques: 'المساجد',
    libraries: 'المكتبات',
    discover: 'اكتشف شيئًا جديدًا',
    random: 'لا تستطيع أن تقرر ماذا تستكشف؟ دعنا نفاجئك بجمعية خيرية عشوائية لدعمها أو مسجد جميل لاكتشافه. كل نقرة تفتح فرصة جديدة لإحداث فرق أو تعلم شيء مذهل.',
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
    // Breadcrumbs
    backToCategories: 'العودة إلى التصنيفات',
    backToProfiles: 'العودة إلى الملفات الشخصية',
  },
};

export default translations; 