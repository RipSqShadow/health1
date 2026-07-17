import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLanguage } from '@/i18n/LanguageContext';
import { AlertTriangle, Phone, ArrowRight, MapPin } from 'lucide-react';

const cases = [
  { id: 1, name: 'Sunita Devi', age: 26, village: 'Rampur', week: 30, risk: 'critical', flags: ['BP 150/95', 'Hb 8.2'], action: 'Referred to CHC', status: 'referred' },
  { id: 2, name: 'Meena Patel', age: 17, village: 'Ballia', week: 22, risk: 'high', flags: ['Age <18', 'Hb 9.5'], action: 'Adolescent protocol', status: 'active' },
  { id: 3, name: 'Kavita Singh', age: 38, village: 'Deoria', week: 36, risk: 'high', flags: ['Age >35', 'Prev C-section'], action: 'Delivery planning', status: 'active' },
  { id: 4, name: 'Radha Devi', age: 24, village: 'Azamgarh', week: 18, risk: 'medium', flags: ['Hb 10.2', 'Missed visit'], action: 'IFA + follow-up', status: 'active' },
  { id: 5, name: 'Pooja Rai', age: 29, village: 'Gorakhpur', week: 34, risk: 'high', flags: ['Twins', 'BP 138/88'], action: 'Specialist referral', status: 'active' },
];

export default function HighRiskPage() {
  const { t } = useLanguage();

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'border-l-coral-600 bg-coral-50';
      case 'high': return 'border-l-coral-400 bg-coral-50/50';
      case 'medium': return 'border-l-gold-400 bg-gold-400/10';
      default: return 'border-l-sage-500 bg-sage-100';
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title mb-2">{t('highRisk')}</h1>
          <p className="text-gray-600 mb-8">{t('casesRequiringAttention')}</p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="card text-center border-l-4 border-l-coral-600">
              <p className="text-3xl font-bold text-coral-600">2</p>
              <p className="text-sm text-gray-500">{t('criticalRisk')}</p>
            </div>
            <div className="card text-center border-l-4 border-l-coral-400">
              <p className="text-3xl font-bold text-coral-500">3</p>
              <p className="text-sm text-gray-500">{t('highRiskLabel')}</p>
            </div>
            <div className="card text-center border-l-4 border-l-gold-400">
              <p className="text-3xl font-bold text-gold-500">1</p>
              <p className="text-sm text-gray-500">{t('mediumRisk')}</p>
            </div>
          </div>

          <div className="space-y-4">
            {cases.map((c) => (
              <motion.div
                key={c.id}
                whileHover={{ x: 4 }}
                className={`card border-l-4 ${getRiskColor(c.risk)}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <AlertTriangle className={`w-5 h-5 ${c.risk === 'critical' ? 'text-coral-600' : 'text-coral-500'}`} />
                      <h3 className="font-display font-bold text-lg">{c.name}</h3>
                      <span className={c.risk === 'critical' ? 'badge-red' : c.risk === 'high' ? 'badge-red' : 'badge-yellow'}>
                        {c.risk}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {c.flags.map((f, i) => (
                        <span key={i} className="text-xs bg-white px-2 py-1 rounded-lg border">{f}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {c.village}</span>
                      <span>{c.week} {t('weeks')} &bull; Age {c.age}</span>
                    </div>
                    <p className="text-sm font-medium text-maatri-700 mt-2">{t('followUpRequired')}: {c.action}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link to="/profile" className="btn-secondary !py-2 !px-4 text-sm flex items-center gap-1">
                      {t('profile')} <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a href="tel:108" className="btn-primary !py-2 !px-4 text-sm flex items-center gap-1 !bg-coral-500 !hover:bg-coral-600">
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
