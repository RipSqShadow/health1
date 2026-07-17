import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLanguage } from '@/i18n/LanguageContext';
import { BookOpen, AlertTriangle, Apple, Baby } from 'lucide-react';

const articles = [
  { id: 1, title: 'nutrition', icon: Apple, category: 'Nutrition', content: 'Eat iron-rich foods like green leafy vegetables, lentils, and jaggery. Take IFA tablets daily. Include protein sources like milk, eggs, and dal. Drink plenty of clean water.', contentHi: 'हरी पत्तेदार सब्जियां, दाल, गुड़ जैसे आयरन युक्त खाद्य पदार्थ खाएं। रोजाना IFA गोली लें।' },
  { id: 2, title: 'dangerSigns', icon: AlertTriangle, category: 'Emergency', content: 'Seek immediate help if you experience: severe headache, blurred vision, convulsions, severe abdominal pain, heavy bleeding, reduced fetal movement, high fever, or difficulty breathing.', contentHi: 'तुरंत मदद लें यदि: गंभीर सिरदर्द, धुंधली दृष्टि, ऐंठन, गंभीर पेट दर्द, भारी रक्तस्राव, भ्रूण की गति में कमी।' },
  { id: 3, title: 'breastfeeding', icon: Baby, category: 'Postnatal', content: 'Start breastfeeding within 1 hour of birth. Exclusive breastfeeding for 6 months. Feed on demand, 8-12 times daily. Proper latch technique prevents sore nipples.', contentHi: 'जन्म के 1 घंटे के भीतर स्तनपान शुरू करें। 6 महीने तक केवल स्तनपान। मांग पर दिन में 8-12 बार।' },
  { id: 4, title: 'ironFolic', icon: Apple, category: 'Supplements', content: 'Take 1 IFA tablet daily throughout pregnancy. IFA prevents anemia which affects both mother and baby. Take with vitamin C rich food for better absorption. Report side effects to ASHA.', contentHi: 'पूरे गर्भावस्था में रोजाना 1 IFA गोली लें। यह एनीमिया को रोकता है। बेहतर अवशोषण के लिए विटामिन C युक्त भोजन के साथ लें।' },
];

export default function HealthEducationPage() {
  const { t, language } = useLanguage();

  return (
    <Layout show3D variant3D="minimal">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title mb-2">{t('education')}</h1>
          <p className="text-gray-600 mb-8">{t('personalizedTips')}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card-hover"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-maatri-100 shrink-0">
                    <article.icon className="w-8 h-8 text-maatri-600" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-maatri-600 bg-maatri-50 px-2 py-1 rounded-lg">{article.category}</span>
                    <h3 className="font-display font-bold text-lg text-maatri-900 mt-2 mb-3">
                      {t(article.title as 'nutrition')}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {language === 'hi' ? article.contentHi : article.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="card mt-8 bg-gradient-to-br from-maatri-50 to-sage-100">
            <div className="flex items-center gap-4">
              <BookOpen className="w-12 h-12 text-maatri-600" />
              <div>
                <h3 className="font-display font-bold text-lg">{t('institutionalDeliveryPlan')}</h3>
                <p className="text-gray-600 text-sm mt-1">{t('birthPlan')} &bull; {t('transportArrangement')} &bull; {t('nearestPHC')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
