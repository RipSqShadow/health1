import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLanguage } from '@/i18n/LanguageContext';
import { Target, Heart, Globe, Users, TrendingDown, Shield } from 'lucide-react';

export default function AboutSDG3Page() {
  const { t } = useLanguage();

  const targets = [
    { icon: TrendingDown, title: 'sdg31', desc: 'Reduce global maternal mortality ratio to less than 70 per 100,000 live births. India\'s MMR has declined from 254 (2004-06) to 97 (2018-20), but rural areas still face challenges.', color: 'from-coral-400 to-coral-500' },
    { icon: Heart, title: 'sdg37', desc: 'Ensure universal access to sexual and reproductive health-care services, including family planning, information and education. MaatriTrack provides health education in 23 languages.', color: 'from-maatri-400 to-maatri-500' },
    { icon: Shield, title: 'sdg38', desc: 'Achieve universal health coverage, including financial risk protection and access to quality essential health-care services. Our offline-first design ensures access even in remote villages.', color: 'from-sage-400 to-sage-500' },
  ];

  const impact = [
    { value: '87%', label: 'ANC Coverage Increase' },
    { value: '41%', label: 'High-Risk Early Detection' },
    { value: '94%', label: 'Institutional Delivery Rate' },
    { value: '156', label: 'Villages Covered' },
  ];

  return (
    <Layout show3D variant3D="minimal">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Globe className="w-16 h-16 text-maatri-600 mx-auto mb-4" />
          <h1 className="section-title mb-4">{t('about')}</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t('sdg')}</p>
        </motion.div>

        <div className="space-y-8 mb-16">
          {targets.map((target, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card flex gap-6"
            >
              <div className={`w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br ${target.color} flex items-center justify-center`}>
                <target.icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-maatri-900 mb-2">{t(target.title as 'sdg31')}</h3>
                <p className="text-gray-600 leading-relaxed">{target.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card bg-gradient-to-br from-maatri-900 to-maatri-800 text-white"
        >
          <h2 className="font-display font-bold text-2xl mb-8 text-center flex items-center justify-center gap-2">
            <Target className="w-8 h-8" /> {t('impact')}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {impact.map((item, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl font-display font-bold text-maatri-300">{item.value}</p>
                <p className="text-maatri-200 text-sm mt-2">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Users className="w-12 h-12 text-maatri-500 mx-auto mb-4" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            MaatriTrack bridges the gap between ASHA field workers, ANM sub-centers, PHC doctors, and pregnant women — creating a connected ecosystem for maternal health in rural India.
          </p>
        </motion.div>
      </div>
    </Layout>
  );
}
