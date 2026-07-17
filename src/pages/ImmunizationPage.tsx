import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLanguage } from '@/i18n/LanguageContext';
import { Syringe, CheckCircle2, Clock } from 'lucide-react';

const immunizations = [
  { name: 'Sunita Devi', village: 'Rampur', week: 30, doses: [
    { type: 'TT-1', date: '2025-10-01', status: 'completed' },
    { type: 'TT-2', date: '2025-12-15', status: 'completed' },
    { type: 'Td Booster', date: null, status: 'due' },
  ]},
  { name: 'Priya Sharma', village: 'Sitapur', week: 14, doses: [
    { type: 'TT-1', date: '2026-01-10', status: 'completed' },
    { type: 'TT-2', date: null, status: 'due' },
    { type: 'Td Booster', date: null, status: 'pending' },
  ]},
  { name: 'Kavita Singh', village: 'Deoria', week: 36, doses: [
    { type: 'TT-1', date: '2025-08-20', status: 'completed' },
    { type: 'TT-2', date: '2025-10-25', status: 'completed' },
    { type: 'Td Booster', date: '2026-02-01', status: 'completed' },
  ]},
];

export default function ImmunizationPage() {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title mb-8">{t('immunization')}</h1>
          <div className="space-y-6">
            {immunizations.map((person, i) => (
              <div key={i} className="card">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-display font-bold text-lg">{person.name}</h3>
                    <p className="text-sm text-gray-500">{person.village} &bull; {person.week} {t('weeks')}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  {person.doses.map((dose, j) => (
                    <div key={j} className={`flex-1 p-4 rounded-xl text-center ${
                      dose.status === 'completed' ? 'bg-sage-100' : dose.status === 'due' ? 'bg-gold-400/20 border-2 border-gold-400' : 'bg-gray-100'
                    }`}>
                      <Syringe className={`w-6 h-6 mx-auto mb-2 ${
                        dose.status === 'completed' ? 'text-sage-600' : dose.status === 'due' ? 'text-gold-500' : 'text-gray-400'
                      }`} />
                      <p className="font-medium text-sm">{dose.type}</p>
                      {dose.date && <p className="text-xs text-gray-500 mt-1">{dose.date}</p>}
                      <div className="mt-2">
                        {dose.status === 'completed' ? (
                          <CheckCircle2 className="w-5 h-5 text-sage-600 mx-auto" />
                        ) : dose.status === 'due' ? (
                          <span className="badge-yellow">Due Now</span>
                        ) : (
                          <Clock className="w-5 h-5 text-gray-400 mx-auto" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
