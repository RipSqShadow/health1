import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  Apple, Droplets, Moon, Smile, Dumbbell, Pill, Scale, Thermometer,
  Calendar, FlaskConical, Brain, Zap, Plus, Target, AlertTriangle, Activity, CheckCircle2, Check
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
];

const dangerSignsList = [
  "Severe headache or blurry vision",
  "Swelling of hands and face",
  "Severe abdominal pain",
  "Vaginal bleeding",
  "Reduced fetal movement",
  "High fever or chills",
  "Difficulty breathing"
];

const mealPlan = [
  { time: "Morning", meal: "1 glass milk, 2 boiled eggs, handful of almonds" },
  { time: "Lunch", meal: "Dal, spinach (palak), 2 roti, curd" },
  { time: "Evening", meal: "Roasted chana with jaggery (gur) - Iron boost!" },
  { time: "Dinner", meal: "Mixed vegetable sabzi, brown rice, salad" }
];

export default function WellnessTrackerPage() {
  const { t } = useLanguage();
  const userStr = localStorage.getItem('maatritrack-user');
  const user = userStr ? JSON.parse(userStr) : null;

  const [activeLog, setActiveLog] = useState<string | null>(null);
  const [checkedSigns, setCheckedSigns] = useState<string[]>([]);
  const [ifaTaken, setIfaTaken] = useState(false);

  useEffect(() => {
    const activePhone = user?.phone;
    if (!activePhone) return;

    fetch(`/api/wellness?phone=${encodeURIComponent(activePhone)}`)
      .then(res => res.ok ? res.json() : Promise.reject('API error'))
      .then(data => {
        if (data) {
          if (data.checkedSigns) setCheckedSigns(data.checkedSigns);
          if (data.ifaTaken !== undefined) setIfaTaken(data.ifaTaken);
        }
      })
      .catch(() => {
        const saved = localStorage.getItem('maatritrack-wellness');
        if (saved) {
          try {
            const data = JSON.parse(saved);
            if (data.checkedSigns) setCheckedSigns(data.checkedSigns);
            if (data.ifaTaken !== undefined) setIfaTaken(data.ifaTaken);
          } catch (e) { /* ignore */ }
        }
      });
  }, []);

  const saveWellnessData = async (newSigns: string[], newIfa: boolean) => {
    // Always save to localStorage as backup
    localStorage.setItem('maatritrack-wellness', JSON.stringify({ checkedSigns: newSigns, ifaTaken: newIfa }));

    try {
      const activePhone = user?.phone || '+919876543210';
      await fetch('/api/wellness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: activePhone, checkedSigns: newSigns, ifaTaken: newIfa }),
      });
    } catch (err) {
      console.warn('API unavailable, saved locally:', err);
    }
  };

  const toggleSign = (sign: string) => {
    const nextSigns = checkedSigns.includes(sign)
      ? checkedSigns.filter(s => s !== sign)
      : [...checkedSigns, sign];
    setCheckedSigns(nextSigns);
    saveWellnessData(nextSigns, ifaTaken);
  };

  const handleIfaToggle = () => {
    const nextIfa = !ifaTaken;
    setIfaTaken(nextIfa);
    saveWellnessData(checkedSigns, nextIfa);
  };

  return (
    <Layout show3D variant3D="minimal">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title mb-2">{t('wellnessDashboard')}</h1>
          <p className="text-gray-600 mb-8">{t('maternalDashboard')}</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* Danger Signs Self-Checker */}
            <div className="card border-2 border-coral-200 lg:col-span-1">
              <h2 className="font-display font-bold text-xl text-coral-600 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" /> Danger Signs
              </h2>
              <p className="text-sm text-gray-600 mb-4">Select any symptoms you are experiencing today:</p>
              <div className="space-y-2 mb-4">
                {dangerSignsList.map((sign, i) => (
                  <label key={i} onClick={() => toggleSign(sign)} className="flex items-start gap-3 cursor-pointer group">
                    <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors ${checkedSigns.includes(sign) ? 'bg-coral-500 border-coral-500' : 'border-gray-300 group-hover:border-coral-400'}`}>
                      {checkedSigns.includes(sign) && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span className="text-sm text-gray-700">{sign}</span>
                  </label>
                ))}
              </div>
              {checkedSigns.length > 0 && (
                <div className="p-3 bg-coral-50 rounded-xl border border-coral-200 text-coral-700 text-sm font-medium animate-pulse">
                  Warning: You have selected critical danger signs. Please contact your ASHA worker or go to the nearest hospital immediately.
                </div>
              )}
            </div>

            {/* Anemia/Iron Tracker */}
            <div className="card lg:col-span-1">
              <h2 className="font-display font-bold text-xl text-maatri-900 mb-4 flex items-center gap-2">
                <Activity className="w-6 h-6 text-coral-500" /> Anemia Tracker
              </h2>
              <div className="bg-maatri-50 rounded-2xl p-4 mb-4 text-center">
                <p className="text-sm text-gray-500 mb-1">Latest Hemoglobin (Hb)</p>
                <p className="text-3xl font-bold text-coral-500">10.2 <span className="text-sm font-medium text-gray-500">g/dL</span></p>
                <p className="text-xs text-coral-600 mt-1 font-medium">Mild Anemia - IFA Supplementation Required</p>
              </div>
              
              <div className="border-t border-gray-100 pt-4">
                <p className="text-sm font-medium text-gray-700 mb-3">Daily IFA (Iron Folic Acid) Pill</p>
                <button 
                  onClick={handleIfaToggle}
                  className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all ${ifaTaken ? 'bg-sage-100 text-sage-600 border border-sage-200' : 'bg-white border-2 border-dashed border-gray-300 text-gray-500 hover:border-maatri-300 hover:text-maatri-600'}`}
                >
                  {ifaTaken ? <CheckCircle2 className="w-5 h-5" /> : <Pill className="w-5 h-5" />}
                  {ifaTaken ? 'Taken Today' : 'Log IFA Pill'}
                </button>
              </div>
            </div>

            {/* Meal Plan Module */}
            <div className="card lg:col-span-1">
              <h2 className="font-display font-bold text-xl text-maatri-900 mb-4 flex items-center gap-2">
                <Apple className="w-6 h-6 text-maatri-600" /> Today's Meal Plan
              </h2>
              <div className="space-y-3">
                {mealPlan.map((meal, i) => (
                  <div key={i} className="flex gap-3 items-start p-3 rounded-xl bg-gray-50">
                    <div className="w-1.5 h-1.5 rounded-full bg-maatri-500 mt-2 shrink-0"></div>
                    <div>
                      <p className="text-xs font-semibold text-maatri-600 uppercase tracking-wider mb-0.5">{meal.time}</p>
                      <p className="text-sm text-gray-700">{meal.meal}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Daily Progress */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
