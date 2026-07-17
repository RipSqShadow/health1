import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLanguage } from '@/i18n/LanguageContext';
import { Download, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const reportData = [
  { village: 'Rampur', registered: 45, anc4: 38, highRisk: 5, delivered: 12 },
  { village: 'Sitapur', registered: 38, anc4: 32, highRisk: 3, delivered: 10 },
  { village: 'Deoria', registered: 52, anc4: 40, highRisk: 8, delivered: 15 },
  { village: 'Ballia', registered: 30, anc4: 25, highRisk: 2, delivered: 8 },
  { village: 'Gorakhpur', registered: 48, anc4: 42, highRisk: 4, delivered: 14 },
];

export default function ReportsPage() {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="section-title">{t('reports')}</h1>
              <p className="text-gray-600">{t('villageCoverage')}</p>
            </div>
            <button className="btn-primary flex items-center gap-2">
              <Download className="w-5 h-5" /> {t('export')}
            </button>
          </div>

          <div className="card mb-6">
            <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-maatri-600" /> Village-wise Summary
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={reportData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="village" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="registered" fill="#14b8a6" name="Registered" />
                <Bar dataKey="anc4" fill="#059669" name="4+ ANC" />
                <Bar dataKey="highRisk" fill="#f43f5e" name="High Risk" />
                <Bar dataKey="delivered" fill="#f59e0b" name="Delivered" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-maatri-100">
                  <th className="text-left py-3 px-4 font-semibold">{t('village')}</th>
                  <th className="text-center py-3 px-4 font-semibold">Registered</th>
                  <th className="text-center py-3 px-4 font-semibold">4+ ANC</th>
                  <th className="text-center py-3 px-4 font-semibold">{t('highRisk')}</th>
                  <th className="text-center py-3 px-4 font-semibold">{t('delivered')}</th>
                  <th className="text-center py-3 px-4 font-semibold">Coverage %</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((row, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-maatri-50">
                    <td className="py-3 px-4 font-medium">{row.village}</td>
                    <td className="text-center py-3 px-4">{row.registered}</td>
                    <td className="text-center py-3 px-4">{row.anc4}</td>
                    <td className="text-center py-3 px-4"><span className="badge-red">{row.highRisk}</span></td>
                    <td className="text-center py-3 px-4">{row.delivered}</td>
                    <td className="text-center py-3 px-4">
                      <span className="badge-green">{Math.round((row.anc4 / row.registered) * 100)}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
