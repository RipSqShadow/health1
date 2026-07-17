import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  Apple, Droplets, Moon, Smile, Dumbbell, Pill, Scale, Thermometer,
  Calendar, FlaskConical, Brain, Zap, Plus, Target
} from 'lucide-react';

const trackingCategories = [
  { key: 'trackNutrition', icon: Apple, color: 'from-orange-400 to-orange-500', log: 'logMeal', unit: 'calories' },
  { key: 'trackWater', icon: Droplets, color: 'from-blue-400 to-blue-500', log: 'logWater', unit: 'glasses' },
  { key: 'trackSleep', icon: Moon, color: 'from-indigo-400 to-indigo-500', log: 'logSleep', unit: 'hours' },
  { key: 'trackMood', icon: Smile, color: 'from-yellow-400 to-yellow-500', log: 'logMood', unit: 'mood' },
  { key: 'trackExercise', icon: Dumbbell, color: 'from-green-400 to-green-500', log: 'logExercise', unit: 'minutes' },
  { key: 'trackSupplements', icon: Pill, color: 'from-purple-400 to-purple-500', log: 'logSupplement', unit: 'supplement' },
  { key: 'trackMedication', icon: Pill, color: 'from-red-400 to-red-500', log: 'logMedication', unit: 'medication' },
  { key: 'trackWeight', icon: Scale, color: 'from-teal-400 to-teal-500', log: 'logWeight', unit: 'weight' },
  { key: 'trackSymptoms', icon: Thermometer, color: 'from-coral-400 to-coral-500', log: 'logSymptom', unit: 'symptom' },
  { key: 'trackAppointments', icon: Calendar, color: 'from-maatri-400 to-maatri-500', log: 'appointment', unit: 'appointment' },
  { key: 'trackLabs', icon: FlaskConical, color: 'from-cyan-400 to-cyan-500', log: 'labResult', unit: 'labResult' },
  { key: 'trackMentalHealth', icon: Brain, color: 'from-pink-400 to-pink-500', log: 'stress', unit: 'stress' },
  { key: 'trackEnergy', icon: Zap, color: 'from-amber-400 to-amber-500', log: 'energy', unit: 'energy' },
];

const dailyProgress = [
  { label: 'trackWater', current: 6, target: 8, unit: 'glasses' },
  { label: 'trackNutrition', current: 1800, target: 2200, unit: 'calories' },
  { label: 'trackSleep', current: 7, target: 8, unit: 'hours' },
  { label: 'trackSupplements', current: 1, target: 1, unit: 'supplement' },
];

export default function WellnessTrackerPage() {
  const { t } = useLanguage();
  const [activeLog, setActiveLog] = useState<string | null>(null);

  return (
    <Layout show3D variant3D="minimal">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title mb-2">{t('wellnessDashboard')}</h1>
          <p className="text-gray-600 mb-8">{t('maternalDashboard')}</p>

          {/* Daily Progress */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {dailyProgress.map((item, i) => (
              <div key={i} className="card">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">{t(item.label as 'trackWater')}</span>
                  <Target className="w-4 h-4 text-maatri-500" />
                </div>
                <p className="text-2xl font-bold text-maatri-900">{item.current}<span className="text-sm text-gray-400">/{item.target}</span></p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-gradient-to-r from-maatri-500 to-sage-500 h-2 rounded-full"
                    style={{ width: `${Math.min((item.current / item.target) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">{t(item.unit as 'glasses')}</p>
              </div>
            ))}
          </div>

          {/* Tracking Categories Grid */}
          <h2 className="font-display font-bold text-xl text-maatri-900 mb-4">{t('quickActions')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {trackingCategories.map((cat) => (
              <motion.button
                key={cat.key}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveLog(cat.key)}
                className={`card-hover text-center ${activeLog === cat.key ? 'ring-2 ring-maatri-500' : ''}`}
              >
                <div className={`w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                  <cat.icon className="w-7 h-7 text-white" />
                </div>
                <p className="font-medium text-sm text-maatri-900">{t(cat.key as 'trackNutrition')}</p>
                <p className="text-xs text-maatri-600 mt-1 flex items-center justify-center gap-1">
                  <Plus className="w-3 h-3" /> {t(cat.log as 'logMeal')}
                </p>
              </motion.button>
            ))}
          </div>

          {/* Log Modal */}
          {activeLog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setActiveLog(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="card w-full max-w-md"
                onClick={e => e.stopPropagation()}
              >
                <h3 className="font-display font-bold text-lg mb-4">
                  {t(trackingCategories.find(c => c.key === activeLog)?.log as 'logMeal' || 'logMeal')}
                </h3>
                <input type="text" className="input-field mb-4" placeholder={t('notes')} />
                <input type="number" className="input-field mb-4" placeholder={t('target')} />
                <div className="flex gap-3">
                  <button onClick={() => setActiveLog(null)} className="btn-secondary flex-1">{t('cancel')}</button>
                  <button onClick={() => { setActiveLog(null); alert(t('success')); }} className="btn-primary flex-1">{t('save')}</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}
