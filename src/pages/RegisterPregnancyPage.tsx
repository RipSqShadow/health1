import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLanguage } from '@/i18n/LanguageContext';
import { Save, AlertTriangle } from 'lucide-react';

export default function RegisterPregnancyPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: '', age: '', phone: '', village: '', lmp: '',
    gravida: '1', para: '0', prevCSection: false, multipleGestation: false,
  });

  const calculateEDD = (lmp: string) => {
    if (!lmp) return '';
    const date = new Date(lmp);
    date.setDate(date.getDate() + 280);
    return date.toISOString().split('T')[0];
  };

  const calculateGestationalAge = (lmp: string) => {
    if (!lmp) return 0;
    const diff = Date.now() - new Date(lmp).getTime();
    return Math.floor(diff / (7 * 24 * 60 * 60 * 1000));
  };

  const getRiskFlags = () => {
    const flags: string[] = [];
    const age = parseInt(form.age);
    if (age < 18) flags.push('Adolescent pregnancy (<18)');
    if (age > 35) flags.push('Advanced maternal age (>35)');
    if (form.prevCSection) flags.push('Previous C-section');
    if (form.multipleGestation) flags.push('Multiple gestation');
    return flags;
  };

  const edd = calculateEDD(form.lmp);
  const weeks = calculateGestationalAge(form.lmp);
  const riskFlags = getRiskFlags();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('success'));
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title mb-8">{t('register')}</h1>

          <form onSubmit={handleSubmit} className="card space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t('name')}</label>
                <input className="input-field" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('age')}</label>
                <input type="number" className="input-field" value={form.age} onChange={e => setForm({...form, age: e.target.value})} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('phone')}</label>
                <input type="tel" className="input-field" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('village')}</label>
                <input className="input-field" value={form.village} onChange={e => setForm({...form, village: e.target.value})} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('lmp')}</label>
                <input type="date" className="input-field" value={form.lmp} onChange={e => setForm({...form, lmp: e.target.value})} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('edd')}</label>
                <input type="date" className="input-field bg-gray-50" value={edd} readOnly />
              </div>
            </div>

            {form.lmp && (
              <div className="p-4 rounded-xl bg-maatri-50 flex items-center justify-between">
                <span className="font-medium text-maatri-700">{t('gestationalAge')}:</span>
                <span className="text-2xl font-bold text-maatri-900">{weeks} {t('weeks')}</span>
              </div>
            )}

            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.prevCSection} onChange={e => setForm({...form, prevCSection: e.target.checked})} className="w-4 h-4 rounded" />
                <span className="text-sm">Previous C-section</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.multipleGestation} onChange={e => setForm({...form, multipleGestation: e.target.checked})} className="w-4 h-4 rounded" />
                <span className="text-sm">Multiple gestation (twins+)</span>
              </label>
            </div>

            {riskFlags.length > 0 && (
              <div className="p-4 rounded-xl bg-coral-50 border border-coral-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-coral-500" />
                  <span className="font-semibold text-coral-700">{t('highRisk')} - Auto Detected</span>
                </div>
                <ul className="space-y-1">
                  {riskFlags.map((flag, i) => (
                    <li key={i} className="text-sm text-coral-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-coral-500" /> {flag}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
              <Save className="w-5 h-5" /> {t('save')}
            </button>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
}
