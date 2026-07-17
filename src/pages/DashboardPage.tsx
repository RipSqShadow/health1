import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  AlertTriangle, Calendar, Users, CheckCircle2, Clock, ArrowRight,
  Plus, FileText, Syringe, Phone, Activity, Bell, MapPin
} from 'lucide-react';

const actionsNeeded = [
  { id: 1, type: 'critical', title: 'Sunita Devi - BP 150/95', village: 'Rampur', action: 'Immediate referral to CHC', time: '2h ago' },
  { id: 2, type: 'high', title: 'Priya Sharma - Hb 8.2 g/dL', village: 'Sitapur', action: 'IFA supplementation + follow-up', time: '4h ago' },
  { id: 3, type: 'medium', title: 'Kavita Singh - Missed ANC Visit 3', village: 'Deoria', action: 'ASHA home visit scheduled', time: '6h ago' },
  { id: 4, type: 'high', title: 'Meena Patel - Age 17', village: 'Ballia', action: 'High-risk adolescent pregnancy protocol', time: '1d ago' },
];

const coverageGaps = [
  { village: 'Azamgarh', ancCoverage: 62, target: 90, gap: 28 },
  { village: 'Mau', ancCoverage: 71, target: 90, gap: 19 },
  { village: 'Jaunpur', ancCoverage: 78, target: 90, gap: 12 },
];

const upcomingVisits = [
  { name: 'Rekha Yadav', week: 28, date: 'Today', village: 'Rampur' },
  { name: 'Anjali Verma', week: 14, date: 'Tomorrow', village: 'Sitapur' },
  { name: 'Pooja Rai', week: 36, date: 'Mar 20', village: 'Gorakhpur' },
];

const resolvedToday = [
  { title: 'TT2 vaccination completed - Geeta Kumari', time: '10:30 AM' },
  { title: 'Referral accepted at CHC - Sunita Devi', time: '11:45 AM' },
  { title: 'ANC Visit 2 recorded - Radha Devi', time: '2:15 PM' },
];

export default function DashboardPage() {
  const { t } = useLanguage();

  const summaryCards = [
    { icon: Users, label: t('totalPregnancies'), value: '47', sub: t('active'), color: 'bg-maatri-500' },
    { icon: AlertTriangle, label: t('casesRequiringAttention'), value: '8', sub: t('highRisk'), color: 'bg-coral-500' },
    { icon: Calendar, label: t('upcomingVisits'), value: '12', sub: t('weekly'), color: 'bg-gold-500' },
    { icon: CheckCircle2, label: t('resolvedToday'), value: '6', sub: t('completed'), color: 'bg-sage-500' },
  ];

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'critical': return 'badge-red';
      case 'high': return 'badge-red';
      case 'medium': return 'badge-yellow';
      default: return 'badge-green';
    }
  };

  return (
    <Layout show3D variant3D="minimal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title mb-2">{t('problemSolving')}</h1>
          <p className="text-gray-600 mb-8">{t('welcome')}! {t('actionsNeeded')}</p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {summaryCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="card"
            >
              <div className="flex items-center gap-3">
                <div className={`${card.color} p-3 rounded-xl`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-maatri-900">{card.value}</p>
                  <p className="text-sm text-gray-500">{card.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Actions Needed - Main Problem Solving Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-xl text-maatri-900 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-coral-500" /> {t('actionsNeeded')}
                </h2>
                <Link to="/high-risk" className="text-maatri-600 text-sm font-medium hover:underline flex items-center gap-1">
                  {t('viewAll')} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-3">
                {actionsNeeded.map((action) => (
                  <div key={action.id} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-maatri-50 transition-colors">
                    <div className="shrink-0 mt-1">
                      <AlertTriangle className={`w-5 h-5 ${action.type === 'critical' ? 'text-coral-600' : action.type === 'high' ? 'text-coral-500' : 'text-gold-500'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">{action.title}</h3>
                        <span className={getTypeBadge(action.type)}>{action.type}</span>
                      </div>
                      <p className="text-sm text-gray-600">{action.action}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {action.village}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {action.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coverage Gaps */}
            <div className="card">
              <h2 className="font-display font-bold text-xl text-maatri-900 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-gold-500" /> {t('coverageGaps')}
              </h2>
              <div className="space-y-4">
                {coverageGaps.map((gap, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{gap.village}</span>
                      <span className="text-gray-500">{gap.ancCoverage}% / {gap.target}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-maatri-500 to-sage-500 h-3 rounded-full transition-all"
                        style={{ width: `${gap.ancCoverage}%` }}
                      />
                    </div>
                    <p className="text-xs text-coral-500 mt-1">{t('remaining')}: {gap.gap}% {t('coverageGaps').toLowerCase()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="card">
              <h2 className="font-display font-bold text-lg text-maatri-900 mb-4">{t('quickActions')}</h2>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/register" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-maatri-50 hover:bg-maatri-100 transition-colors">
                  <Plus className="w-6 h-6 text-maatri-600" />
                  <span className="text-xs font-medium text-center">{t('register')}</span>
                </Link>
                <Link to="/visit" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-maatri-50 hover:bg-maatri-100 transition-colors">
                  <FileText className="w-6 h-6 text-maatri-600" />
                  <span className="text-xs font-medium text-center">{t('visit')}</span>
                </Link>
                <Link to="/immunization" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-maatri-50 hover:bg-maatri-100 transition-colors">
                  <Syringe className="w-6 h-6 text-maatri-600" />
                  <span className="text-xs font-medium text-center">{t('immunization')}</span>
                </Link>
                <a href="tel:108" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-coral-50 hover:bg-coral-100 transition-colors">
                  <Phone className="w-6 h-6 text-coral-600" />
                  <span className="text-xs font-medium text-center">{t('emergency')}</span>
                </a>
              </div>
            </div>

            {/* Upcoming Visits */}
            <div className="card">
              <h2 className="font-display font-bold text-lg text-maatri-900 mb-4">{t('upcomingVisits')}</h2>
              <div className="space-y-3">
                {upcomingVisits.map((visit, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                    <div>
                      <p className="font-medium text-sm">{visit.name}</p>
                      <p className="text-xs text-gray-500">{visit.village} &bull; {visit.week} {t('weeks')}</p>
                    </div>
                    <span className="text-xs font-semibold text-maatri-600 bg-maatri-50 px-2 py-1 rounded-lg">{visit.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resolved Today */}
            <div className="card">
              <h2 className="font-display font-bold text-lg text-maatri-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-sage-500" /> {t('resolvedToday')}
              </h2>
              <div className="space-y-3">
                {resolvedToday.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-sage-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-700">{item.title}</p>
                      <p className="text-xs text-gray-400">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
