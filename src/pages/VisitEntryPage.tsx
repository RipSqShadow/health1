import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLanguage } from '@/i18n/LanguageContext';
import { Save, AlertTriangle } from 'lucide-react';

export default function VisitEntryPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    beneficiary: 'Sunita Devi', visitNumber: '3', date: new Date().toISOString().split('T')[0],
    weight: '', bpSystolic: '', bpDiastolic: '', hemoglobin: '', fundalHeight: '', fetalHeartbeat: '', urineTest: 'normal', notes: '',
  });

  const getRiskAlerts = () => {
    const alerts: string[] = [];
    const sys = parseInt(form.bpSystolic);
    const dia = parseInt(form.bpDiastolic);
    const hb = parseFloat(form.hemoglobin);
    if (sys >= 140 || dia >= 90) alerts.push('Hypertension detected (BP ≥ 140/90) - Pre-eclampsia risk');
    if (hb < 11) alerts.push(`Anemia detected (Hb ${hb} < 11 g/dL) - IFA supplementation needed`);
    if (hb < 7) alerts.push('Severe anemia - Immediate referral required');
    return alerts;
  };

  const alerts = getRiskAlerts();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('success'));
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title mb-8">{t('visit')}</h1>
          <form onSubmit={handleSubmit} className="card space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Beneficiary</label>
                <select className="input-field" value={form.beneficiary} onChange={e => setForm({...form, beneficiary: e.target.value})}>
                  <option>Sunita Devi - 30 weeks</option>
                  <option>Priya Sharma - 14 weeks</option>
                  <option>Kavita Singh - 36 weeks</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('visitNumber')}</label>
                <select className="input-field" value={form.visitNumber} onChange={e => setForm({...form, visitNumber: e.target.value})}>
                  {[1,2,3,4].map(n => <option key={n} value={n}>ANC Visit {n}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('date')}</label>
                <input type="date" className="input-field" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('weight')}</label>
                <input type="number" step="0.1" className="input-field" value={form.weight} onChange={e => setForm({...form, weight: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('bloodPressure')} (Systolic)</label>
                <input type="number" className="input-field" value={form.bpSystolic} onChange={e => setForm({...form, bpSystolic: e.target.value})} placeholder="120" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('bloodPressure')} (Diastolic)</label>
                <input type="number" className="input-field" value={form.bpDiastolic} onChange={e => setForm({...form, bpDiastolic: e.target.value})} placeholder="80" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('hemoglobin')}</label>
                <input type="number" step="0.1" className="input-field" value={form.hemoglobin} onChange={e => setForm({...form, hemoglobin: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Fundal Height (cm)</label>
                <input type="number" className="input-field" value={form.fundalHeight} onChange={e => setForm({...form, fundalHeight: e.target.value})} />
              </div>
            </div>

            {alerts.length > 0 && (
              <div className="p-4 rounded-xl bg-coral-50 border border-coral-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-coral-500" />
                  <span className="font-semibold text-coral-700">Auto Risk Alerts</span>
                </div>
                {alerts.map((a, i) => <p key={i} className="text-sm text-coral-600">{a}</p>)}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">{t('notes')}</label>
              <textarea className="input-field h-24" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
            </div>

            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
              <Save className="w-5 h-5" /> {t('save')}
            </button>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
}
