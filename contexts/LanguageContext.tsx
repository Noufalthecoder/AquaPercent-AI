'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Language = 'en' | 'ar'

interface Translations {
  [key: string]: {
    en: string
    ar: string
  }
}

const translations: Translations = {
  // Common
  'app.title': {
    en: 'AquaPercent AI',
    ar: 'أكوابيرسنت AI'
  },
  'app.subtitle': {
    en: 'AI Intelligence',
    ar: 'الذكاء الاصطناعي'
  },
  'app.tagline': {
    en: 'Predicting Water. Preventing Crisis.',
    ar: 'التنبؤ بالمياه. منع الأزمات.'
  },
  'welcome.back': {
    en: 'Welcome back',
    ar: 'مرحبا بعودتك'
  },
  'launch.dashboard': {
    en: 'Launch Dashboard',
    ar: 'تشغيل لوحة القيادة'
  },
  'select.language': {
    en: 'Select Language',
    ar: 'اختر اللغة'
  },
  'all.systems.online': {
    en: 'All Systems Online',
    ar: 'جميع الأنظمة متصلة'
  },
  'modules.available': {
    en: 'Modules Available',
    ar: 'الوحدات المتاحة'
  },
  'realtime.intelligence': {
    en: 'Real-time Intelligence',
    ar: 'الذكاء في الوقت الفعلي'
  },
  'scroll.explore': {
    en: 'Scroll to explore',
    ar: 'قم بالتمرير للاستكشاف'
  },
  'ready.begin': {
    en: 'Ready to Begin?',
    ar: 'هل أنت مستعد للبدء؟'
  },
  'modules.ready': {
    en: 'All 8 modules are loaded and ready for your command',
    ar: 'تم تحميل جميع الوحدات الثمانية وهي جاهزة لأوامرك'
  },
  'secure.access': {
    en: 'Secure Infrastructure Access',
    ar: 'الوصول الآمن للبنية التحتية'
  },
  'user.id.placeholder': {
    en: 'Enter user identification',
    ar: 'أدخل معرف المستخدم'
  },
  'password.placeholder': {
    en: 'Enter secure password',
    ar: 'أدخل كلمة المرور الآمنة'
  },
  
  // Farmer Mode
  'farmer.title': {
    en: 'Farmer Mode',
    ar: 'وضع المزارع'
  },
  'farmer.subtitle': {
    en: 'Agricultural water management and irrigation intelligence',
    ar: 'إدارة المياه الزراعية وذكاء الري'
  },
  'farmer.groundwater': {
    en: 'Groundwater Level',
    ar: 'مستوى المياه الجوفية'
  },
  'farmer.pumping': {
    en: 'Safe Pumping Limit',
    ar: 'حد الضخ الآمن'
  },
  'farmer.stress': {
    en: 'Water Stress Index',
    ar: 'مؤشر إجهاد المياه'
  },
  'farmer.recharge': {
    en: 'Recharge Forecast',
    ar: 'توقعات إعادة الشحن'
  },
  'farmer.below.surface': {
    en: 'Below surface',
    ar: 'تحت السطح'
  },
  'farmer.liters.hour': {
    en: 'Liters/hour',
    ar: 'لتر/ساعة'
  },
  'farmer.moderate.stress': {
    en: 'Moderate stress',
    ar: 'إجهاد معتدل'
  },
  'farmer.next.30.days': {
    en: 'Next 30 days',
    ar: 'الثلاثين يومًا القادمة'
  },
  'farmer.irrigation.recommendations': {
    en: 'Irrigation Recommendations',
    ar: 'توصيات الري'
  },
  'farmer.optimal.window': {
    en: 'Optimal Irrigation Window',
    ar: 'نافذة الري المثلى'
  },
  'farmer.best.time': {
    en: 'Best time: 5:00 AM - 7:00 AM',
    ar: 'أفضل وقت: 5:00 صباحًا - 7:00 صباحًا'
  },
  'farmer.optimal.desc': {
    en: 'Low evaporation, optimal soil absorption. Recommended flow: 380 L/hr',
    ar: 'تبخر منخفض، امتصاص تربة مثالي. التدفق الموصى به: 380 لتر/ساعة'
  },
  'farmer.conservation': {
    en: 'Water Conservation Mode',
    ar: 'وضع الحفاظ على المياه'
  },
  'farmer.savings': {
    en: 'Potential savings: 18%',
    ar: 'التوفير المحتمل: 18%'
  },
  'farmer.conservation.desc': {
    en: 'Switch to drip irrigation for vegetables. Reduce water usage while maintaining yield.',
    ar: 'التحول إلى الري بالتنقيط للخضروات. تقليل استخدام المياه مع الحفاظ على الإنتاج.'
  },
  'farmer.stress.alert': {
    en: 'Stress Alert',
    ar: 'تنبيه الإجهاد'
  },
  'farmer.stress.detected': {
    en: 'Moderate water stress detected',
    ar: 'تم اكتشاف إجهاد مائي معتدل'
  },
  'farmer.stress.desc': {
    en: 'Consider reducing irrigation by 15% for non-critical crops. Prioritize high-value crops.',
    ar: 'فكر في تقليل الري بنسبة 15% للمحاصيل غير الحرجة. إعطاء الأولوية للمحاصيل عالية القيمة.'
  },
  'farmer.soil.prediction': {
    en: 'Soil Moisture Prediction',
    ar: 'توقع رطوبة التربة'
  },
  'farmer.next.7.days': {
    en: 'Next 7 days: Stable',
    ar: 'الأيام السبعة القادمة: مستقر'
  },
  'farmer.soil.desc': {
    en: 'Current moisture levels adequate. No immediate irrigation required for established crops.',
    ar: 'مستويات الرطوبة الحالية كافية. لا حاجة للري الفوري للمحاصيل القائمة.'
  },
  'farmer.crop.guidance': {
    en: 'Crop-Specific Water Guidance',
    ar: 'إرشادات المياه الخاصة بالمحاصيل'
  },
  'farmer.wheat': {
    en: 'Wheat',
    ar: 'قمح'
  },
  'farmer.rice': {
    en: 'Rice',
    ar: 'أرز'
  },
  'farmer.vegetables': {
    en: 'Vegetables',
    ar: 'خضروات'
  },
  'farmer.fruits': {
    en: 'Fruits',
    ar: 'فواكه'
  },
  'farmer.optimal': {
    en: 'Optimal',
    ar: 'مثالي'
  },
  'farmer.needs.water': {
    en: 'Needs Water',
    ar: 'يحتاج ماء'
  },
  'farmer.good': {
    en: 'Good',
    ar: 'جيد'
  },
  'farmer.monitor': {
    en: 'Monitor',
    ar: 'مراقبة'
  },
  'farmer.weather.forecast': {
    en: '7-Day Weather & Irrigation Forecast',
    ar: 'توقعات الطقس والري لمدة 7 أيام'
  },
  'farmer.mon': {
    en: 'Mon',
    ar: 'الإثنين'
  },
  'farmer.tue': {
    en: 'Tue',
    ar: 'الثلاثاء'
  },
  'farmer.wed': {
    en: 'Wed',
    ar: 'الأربعاء'
  },
  'farmer.thu': {
    en: 'Thu',
    ar: 'الخميس'
  },
  'farmer.fri': {
    en: 'Fri',
    ar: 'الجمعة'
  },
  'farmer.sat': {
    en: 'Sat',
    ar: 'السبت'
  },
  'farmer.sun': {
    en: 'Sun',
    ar: 'الأحد'
  },
  'farmer.rain': {
    en: 'Rain',
    ar: 'مطر'
  },
  'farmer.clear': {
    en: 'Clear',
    ar: 'صافي'
  },
  'farmer.skip.irrigation': {
    en: 'Skip irrigation',
    ar: 'تخطي الري'
  },
  'farmer.irrigate': {
    en: 'Irrigate',
    ar: 'ري'
  },
  
  // Menu Items
  'menu.command': {
    en: 'Global Command Center',
    ar: 'مركز القيادة العالمي'
  },
  'menu.leak': {
    en: 'Leak Prediction Engine',
    ar: 'محرك التنبؤ بالتسرب'
  },
  'menu.map': {
    en: 'Infrastructure Map',
    ar: 'خريطة البنية التحتية'
  },
  'menu.decision': {
    en: 'Decision Intelligence',
    ar: 'ذكاء القرار'
  },
  'menu.citizen': {
    en: 'Citizen Portal',
    ar: 'بوابة المواطن'
  },
  'menu.farmer': {
    en: 'Farmer Mode',
    ar: 'وضع المزارع'
  },
  'menu.insights': {
    en: 'AI Insights Lab',
    ar: 'مختبر رؤى الذكاء الاصطناعي'
  },
  'menu.analytics': {
    en: 'System Analytics',
    ar: 'تحليلات النظام'
  },
  'menu.settings': {
    en: 'Settings',
    ar: 'الإعدادات'
  },
  
  // Notifications
  'notifications': {
    en: 'Notifications',
    ar: 'الإشعارات'
  },
  'unread.notification': {
    en: 'unread notification',
    ar: 'إشعار غير مقروء'
  },
  'unread.notifications': {
    en: 'unread notifications',
    ar: 'إشعارات غير مقروءة'
  },
  'all': {
    en: 'All',
    ar: 'الكل'
  },
  'unread': {
    en: 'Unread',
    ar: 'غير مقروء'
  },
  'mark.all.read': {
    en: 'Mark all as read',
    ar: 'وضع علامة مقروءة على الكل'
  },
  'clear.all': {
    en: 'Clear all',
    ar: 'مسح الكل'
  },
  'no.notifications': {
    en: 'No notifications yet',
    ar: 'لا توجد إشعارات حتى الآن'
  },
  'no.unread': {
    en: 'No unread notifications',
    ar: 'لا توجد إشعارات غير مقروءة'
  },
  'dismiss': {
    en: 'Dismiss',
    ar: 'رفض'
  },
  'details': {
    en: 'Details',
    ar: 'تفاصيل'
  },
  'report.issue': {
    en: 'Report Issue',
    ar: 'الإبلاغ عن مشكلة'
  },
  'contact.support': {
    en: 'Contact Support',
    ar: 'اتصل بالدعم'
  },
  
  // Login
  'login.title': {
    en: 'Access Portal',
    ar: 'بوابة الوصول'
  },
  'login.subtitle': {
    en: 'Authorized Personnel Only',
    ar: 'الموظفون المصرح لهم فقط'
  },
  'user.id': {
    en: 'User ID',
    ar: 'معرف المستخدم'
  },
  'password': {
    en: 'Password',
    ar: 'كلمة المرور'
  },
  'access.role': {
    en: 'Access Role',
    ar: 'دور الوصول'
  },
  'authenticate': {
    en: 'Authenticate Access',
    ar: 'مصادقة الوصول'
  },
  'demo.credentials': {
    en: 'Demo Credentials:',
    ar: 'بيانات الاعتماد التجريبية:'
  },
  'secure.connection': {
    en: 'Secure Connection Active',
    ar: 'الاتصال الآمن نشط'
  },
  
  // Header
  'system.monitor': {
    en: 'Monitor',
    ar: 'مراقب'
  },
  'eco.mode': {
    en: 'Eco Mode',
    ar: 'الوضع البيئي'
  },
  'logout': {
    en: 'Logout',
    ar: 'تسجيل خروج'
  },
  'system.online': {
    en: 'System Online',
    ar: 'النظام متصل'
  }
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    // Load saved language from localStorage
    const saved = localStorage.getItem('aquapercent_language') as Language
    if (saved && ['en', 'ar'].includes(saved)) {
      setLanguageState(saved)
      // Set initial dir attribute
      if (typeof document !== 'undefined') {
        document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr'
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('aquapercent_language', lang)
    
    // Update HTML dir attribute for RTL languages
    if (typeof document !== 'undefined') {
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    }
  }

  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const languages = [
  { code: 'en' as Language, name: 'English', flag: '🇬🇧' },
  { code: 'ar' as Language, name: 'العربية', flag: '🇸🇦' }
]
