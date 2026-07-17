import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLanguage } from '@/i18n/LanguageContext';
import { Phone, PhoneCall, AlertCircle, Heart, Shield, Ambulance, Users } from 'lucide-react';

const emergencyNumbers = [
  { number: '108', label: 'ambulance', icon: Ambulance, color: 'from-coral-500 to-coral-600', desc: 'Free ambulance service across India' },
  { number: '102', label: 'maternalHelpline', icon: Heart, color: 'from-maatri-500 to-maatri-600', desc: 'Maternal and child health helpline' },
  { number: '181', label: 'womenHelpline', icon: Shield, color: 'from-purple-500 to-purple-600', desc: '24/7 women distress helpline' },
  { number: '104', label: 'healthHelpline', icon: PhoneCall, color: 'from-sage-500 to-sage-600', desc: 'Health information and advice' },
];

const localContacts = [
  { name: 'Dr. Priya Sharma', role: 'PHC Medical Officer', phone: '+91 98765 43210', village: 'Rampur PHC' },
  { name: 'Sunita Devi', role: 'ASHA Worker', phone: '+91 98765 43211', village: 'Rampur' },
  { name: 'ANM Kavita Singh', role: 'ANM', phone: '+91 98765 43212', village: 'Sitapur SC' },
  { name: 'CHC Gorakhpur', role: 'Community Health Center', phone: '+91 98765 43213', village: 'Gorakhpur' },
];

export default function EmergencyPage() {
  const { t } = useLanguage();
  const [familyPhone, setFamilyPhone] = useState('');

  return (
    <Layout show3D variant3D="minimal">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <AlertCircle className="w-16 h-16 text-coral-500 mx-auto mb-4" />
          <h1 className="section-title mb-4">{t('emergency')}</h1>
          <p className="text-gray-600 text-lg">{t('familyEmergency')} &bull; {t('publicHealth')}</p>
        </motion.div>

        {/* Emergency Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {emergencyNumbers.map((item, i) => (
            <motion.a
              key={i}
              href={`tel:${item.number}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`block p-6 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg`}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <item.icon className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-3xl font-display font-bold">{item.number}</p>
                  <p className="font-semibold">{t(item.label as 'ambulance')}</p>
                  <p className="text-sm text-white/80 mt-1">{item.desc}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Family Emergency Call */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-8 border-2 border-coral-200"
        >
          <h2 className="font-display font-bold text-xl text-coral-600 mb-4 flex items-center gap-2">
            <Users className="w-6 h-6" /> {t('familyEmergency')}
          </h2>
          <p className="text-gray-600 mb-4">Save your family member's number for quick emergency access during pregnancy complications.</p>
          <div className="flex gap-3">
            <input
              type="tel"
              placeholder={t('phone')}
              value={familyPhone}
              onChange={(e) => setFamilyPhone(e.target.value)}
              className="input-field flex-1"
            />
            <a
              href={familyPhone ? `tel:${familyPhone}` : '#'}
              className={`btn-emergency !animate-none flex items-center gap-2 ${!familyPhone ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <Phone className="w-5 h-5" /> {t('callNow')}
            </a>
          </div>
        </motion.div>

        {/* Public Health Support / Local Contacts */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card">
          <h2 className="font-display font-bold text-xl text-maatri-900 mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6 text-maatri-600" /> {t('publicHealth')}
          </h2>
          <div className="space-y-4">
            {localContacts.map((contact, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-maatri-50 hover:bg-maatri-100 transition-colors">
                <div>
                  <p className="font-semibold text-gray-900">{contact.name}</p>
                  <p className="text-sm text-gray-500">{contact.role} &bull; {contact.village}</p>
                </div>
                <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="btn-primary !py-2 !px-4 text-sm flex items-center gap-2">
                  <Phone className="w-4 h-4" /> {t('callNow')}
                </a>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
