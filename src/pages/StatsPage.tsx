import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Area, AreaChart
} from 'recharts';
import {
  Users, Heart, AlertTriangle, Building2, MapPin, TrendingUp, Shield, Activity
} from 'lucide-react';

const monthlyData = [
  { month: 'Jan', pregnancies: 120, visits: 95, deliveries: 28 },
  { month: 'Feb', pregnancies: 135, visits: 110, deliveries: 32 },
  { month: 'Mar', pregnancies: 148, visits: 125, deliveries: 35 },
  { month: 'Apr', pregnancies: 160, visits: 140, deliveries: 38 },
  { month: 'May', pregnancies: 172, visits: 155, deliveries: 42 },
  { month: 'Jun', pregnancies: 185, visits: 168, deliveries: 45 },
];

const riskData = [
  { name: 'Low', value: 62, color: '#10b981' },
  { name: 'Medium', value: 23, color: '#f59e0b' },
  { name: 'High', value: 11, color: '#f43f5e' },
  { name: 'Critical', value: 4, color: '#e11d48' },
];

const villageData = [
  { village: 'Rampur', coverage: 92 },
  { village: 'Sitapur', coverage: 87 },
  { village: 'Deoria', coverage: 78 },
  { village: 'Ballia', coverage: 85 },
  { village: 'Gorakhpur', coverage: 91 },
  { village: 'Azamgarh', coverage: 74 },
  { village: 'Mau', coverage: 88 },
  { village: 'Jaunpur', coverage: 82 },
];

const impactData = [
  { quarter: 'Q1', saved: 12, reduced: 18 },
  { quarter: 'Q2', saved: 19, reduced: 25 },
  { quarter: 'Q3', saved: 24, reduced: 32 },
  { quarter: 'Q4', saved: 31, reduced: 41 },
];

export default function StatsPage() {
  const { t } = useLanguage();

  const statCards = [
    { icon: Users, label: t('totalPregnancies'), value: '1,247', change: '+12%', color: 'from-maatri-500 to-maatri-600' },
    { icon: Activity, label: t('ancCoverage'), value: '87.3%', change: '+5.2%', color: 'from-sage-500 to-sage-600' },
    { icon: AlertTriangle, label: t('highRiskCases'), value: '89', change: '-8%', color: 'from-coral-400 to-coral-500' },
    { icon: Building2, label: t('institutionalDelivery'), value: '94.1%', change: '+3.1%', color: 'from-gold-400 to-gold-500' },
    { icon: MapPin, label: t('villagesCovered'), value: '156', change: '+8', color: 'from-maatri-400 to-maatri-500' },
    { icon: Heart, label: t('ashaWorkers'), value: '342', change: '+15', color: 'from-coral-500 to-coral-600' },
    { icon: Shield, label: t('riskReduced'), value: '41%', change: '+7%', color: 'from-sage-400 to-sage-500' },
    { icon: TrendingUp, label: t('livesSaved'), value: '86', change: '+12', color: 'from-maatri-600 to-maatri-700' },
  ];

  return (
    <Layout show3D variant3D="minimal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="section-title mb-4">{t('statsTitle')}</h1>
          <p className="text-gray-600 text-lg">{t('statsSubtitle')}</p>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {statCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="card-hover"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-display font-bold text-maatri-900">{card.value}</p>
              <p className="text-sm text-gray-500 mt-1">{card.label}</p>
              <span className="text-xs font-semibold text-sage-600 mt-1 inline-block">{card.change}</span>
            </motion.div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card"
          >
            <h3 className="font-display font-bold text-lg text-maatri-900 mb-4">{t('monthlyTrend')}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Area type="monotone" dataKey="pregnancies" stackId="1" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.3} />
                <Area type="monotone" dataKey="visits" stackId="2" stroke="#059669" fill="#059669" fillOpacity={0.3} />
                <Area type="monotone" dataKey="deliveries" stackId="3" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card"
          >
            <h3 className="font-display font-bold text-lg text-maatri-900 mb-4">{t('riskDistribution')}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {riskData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2">
              {riskData.map((r, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: r.color }} />
                  <span>{r.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card"
          >
            <h3 className="font-display font-bold text-lg text-maatri-900 mb-4">{t('villageCoverage')}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={villageData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" domain={[0, 100]} stroke="#6b7280" />
                <YAxis dataKey="village" type="category" width={80} stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="coverage" fill="#14b8a6" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card"
          >
            <h3 className="font-display font-bold text-lg text-maatri-900 mb-4">{t('impact')}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={impactData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="quarter" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Line type="monotone" dataKey="saved" stroke="#f43f5e" strokeWidth={3} dot={{ r: 6 }} />
                <Line type="monotone" dataKey="reduced" stroke="#14b8a6" strokeWidth={3} dot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-2 text-sm">
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-coral-500" /> {t('livesSaved')}</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-maatri-500" /> {t('riskReduced')}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
