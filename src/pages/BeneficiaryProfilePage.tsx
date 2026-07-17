import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLanguage } from '@/i18n/LanguageContext';
import { User, Calendar, Activity, Syringe, AlertTriangle } from 'lucide-react';

const beneficiary = {
  name: 'Sunita Devi', age: 26, village: 'Rampur', phone: '+91 98765 43210',
  lmp: '2025-09-15', edd: '2026-06-22', weeks: 30, riskLevel: 'high',
  gravida: 2, para: 1, riskFlags: ['BP ≥ 140/90', 'Hb 9.1 g/dL'],
};

const ancVisits = [
  { num: 1, date: '2025-10-01', weight: 52, bp: '120/80', hb: 11.2, status: 'completed' },
  { num: 2, date: '2025-12-15', weight: 58, bp: '130/85', hb: 10.5, status: 'completed' },
  { num: 3, date: '2026-02-20', weight: 63, bp: '145/92', hb: 9.1, status: 'completed' },
  { num: 4, date: '2026-04-01', weight: null, bp: null, hb: null, status: 'upcoming' },
];

const immunizations = [
  { type: 'TT-1', date: '2025-10-01', status: 'completed' },
  { type: 'TT-2', date: '2025-12-15', status: 'completed' },
  { type: 'Td Booster', date: '2026-02-20', status: 'due' },
];

export default function BeneficiaryProfilePage() {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card mb-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-maatri-400 to-maatri-600 flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-display font-bold text-maatri-900">{beneficiary.name}</h1>
                  <span className="badge-red">{beneficiary.riskLevel} {t('riskLevel')}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div><span className="text-gray-500">{t('age')}:</span> <span className="font-medium">{beneficiary.age}</span></div>
                  <div><span className="text-gray-500">{t('village')}:</span> <span className="font-medium">{beneficiary.village}</span></div>
                  <div><span className="text-gray-500">{t('gestationalAge')}:</span> <span className="font-medium">{beneficiary.weeks} {t('weeks')}</span></div>
                  <div><span className="text-gray-500">{t('edd')}:</span> <span className="font-medium">{beneficiary.edd}</span></div>
                </div>
                {beneficiary.riskFlags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {beneficiary.riskFlags.map((flag, i) => (
                      <span key={i} className="badge-red flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> {flag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ANC Timeline */}
            <div className="card">
              <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-maatri-600" /> {t('timeline')}
              </h2>
              <div className="space-y-4">
                {ancVisits.map((visit) => (
                  <div key={visit.num} className={`flex gap-4 p-3 rounded-xl ${visit.status === 'upcoming' ? 'bg-gold-400/10 border border-gold-400/30' : 'bg-gray-50'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      visit.status === 'completed' ? 'bg-sage-500 text-white' : 'bg-gold-400 text-white'
                    }`}>
                      {visit.num}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">ANC Visit {visit.num}</span>
                        <span className="text-sm text-gray-500">{visit.date}</span>
                      </div>
                      {visit.weight && (
                        <div className="grid grid-cols-3 gap-2 mt-2 text-xs text-gray-600">
                          <span>{t('weight')}: {visit.weight}kg</span>
                          <span>{t('bloodPressure')}: {visit.bp}</span>
                          <span>{t('hemoglobin')}: {visit.hb}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Immunizations */}
            <div className="card">
              <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                <Syringe className="w-5 h-5 text-maatri-600" /> {t('immunizations')}
              </h2>
              <div className="space-y-3">
                {immunizations.map((imm, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                    <div className="flex items-center gap-3">
                      <Syringe className="w-5 h-5 text-maatri-500" />
                      <div>
                        <p className="font-medium">{imm.type}</p>
                        <p className="text-xs text-gray-500">{imm.date}</p>
                      </div>
                    </div>
                    <span className={imm.status === 'completed' ? 'badge-green' : 'badge-yellow'}>
                      {imm.status === 'completed' ? t('completed') : 'Due'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vitals Chart placeholder */}
            <div className="card lg:col-span-2">
              <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-maatri-600" /> {t('vitals')}
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-xl bg-maatri-50">
                  <p className="text-2xl font-bold text-maatri-700">63 kg</p>
                  <p className="text-sm text-gray-500">{t('weight')}</p>
                  <p className="text-xs text-sage-600 mt-1">+11kg from start</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-coral-50">
                  <p className="text-2xl font-bold text-coral-700">145/92</p>
                  <p className="text-sm text-gray-500">{t('bloodPressure')}</p>
                  <p className="text-xs text-coral-600 mt-1">High - Refer</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-gold-400/10">
                  <p className="text-2xl font-bold text-gold-500">9.1</p>
                  <p className="text-sm text-gray-500">{t('hemoglobin')}</p>
                  <p className="text-xs text-gold-500 mt-1">Anemia - IFA needed</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
