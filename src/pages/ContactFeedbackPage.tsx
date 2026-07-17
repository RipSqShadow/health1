import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLanguage } from '@/i18n/LanguageContext';
import { Send, MessageSquare, Mail } from 'lucide-react';

export default function ContactFeedbackPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', role: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-8">
            <MessageSquare className="w-12 h-12 text-maatri-600 mx-auto mb-4" />
            <h1 className="section-title mb-2">{t('contact')}</h1>
            <p className="text-gray-600">{t('feedback')}</p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="card text-center py-12"
            >
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-sage-600" />
              </div>
              <h2 className="font-display font-bold text-xl text-maatri-900 mb-2">{t('success')}</h2>
              <p className="text-gray-600">Thank you for your feedback. We will get back to you soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="card space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">{t('name')}</label>
                <input className="input-field" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('role')}</label>
                <select className="input-field" value={form.role} onChange={e => setForm({...form, role: e.target.value})} required>
                  <option value="">{t('selectRole')}</option>
                  <option value="pregnant_woman">{t('pregnantWomen')}</option>
                  <option value="asha">{t('ashaRole')}</option>
                  <option value="anm">{t('anmRole')}</option>
                  <option value="doctor">{t('doctorRole')}</option>
                  <option value="admin">{t('adminRole')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('phone')}</label>
                <input type="tel" className="input-field" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('message')}</label>
                <textarea className="input-field h-32" value={form.message} onChange={e => setForm({...form, message: e.target.value})} required />
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                <Mail className="w-5 h-5" /> {t('sendMessage')}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}
