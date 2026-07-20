import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import Scene3D from '@/components/Scene3D';
import { useLanguage } from '@/i18n/LanguageContext';
import {
    AlertTriangle, FileText, HeartCrack, EyeOff,
    Smartphone, ShieldAlert, Users, Wifi, Globe, Phone,
    ArrowRight, CheckCircle2, Baby, Stethoscope, Building2
} from 'lucide-react';

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
};

export default function LandingPage() {
    const { t } = useLanguage();

    const problems = [
        { icon: AlertTriangle, title: t('problem1Title'), desc: t('problem1Desc'), color: 'text-coral-500 bg-coral-400/10' },
        { icon: FileText, title: t('problem2Title'), desc: t('problem2Desc'), color: 'text-gold-500 bg-gold-400/10' },
        { icon: HeartCrack, title: t('problem3Title'), desc: t('problem3Desc'), color: 'text-coral-600 bg-coral-400/10' },
        { icon: EyeOff, title: t('problem4Title'), desc: t('problem4Desc'), color: 'text-gray-500 bg-gray-400/10' },
    ];

    const solutions = [
        { icon: Smartphone, title: t('solution1Title'), desc: t('solution1Desc') },
        { icon: ShieldAlert, title: t('solution2Title'), desc: t('solution2Desc') },
        { icon: Users, title: t('solution3Title'), desc: t('solution3Desc') },
        { icon: Phone, title: t('solution4Title'), desc: t('solution4Desc') },
        { icon: Wifi, title: t('solution5Title'), desc: t('solution5Desc') },
        { icon: Globe, title: t('solution6Title'), desc: t('solution6Desc') },
    ];

    const roles = [
        { icon: Baby, title: t('pregnantWomen'), color: 'from-coral-400 to-coral-500' },
        { icon: Users, title: t('ashaRole'), color: 'from-maatri-400 to-maatri-500' },
        { icon: Stethoscope, title: t('anmRole'), color: 'from-sage-400 to-sage-500' },
        { icon: Building2, title: t('doctorRole'), color: 'from-gold-400 to-gold-500' },
    ];

    return (
        <Layout>
            {/* Hero Section with 3D */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                <Scene3D variant="hero" className="opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-b from-maatri-50/80 via-transparent to-maatri-50" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <motion.div {...fadeUp} className="text-center max-w-4xl mx-auto">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-maatri-100 text-maatri-700 text-sm font-semibold mb-6">
                            {t('sdg')}
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-maatri-900 leading-tight mb-6">
                            {t('heroTitle')}
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            {t('heroSubtitle')}
                        </p>
                        {/* ===== BUTTONS: Get Started + Call Now ONLY ===== */}
                        {/* "Statistics" button has been removed as requested */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/dashboard" className="btn-primary text-lg inline-flex items-center justify-center gap-2">
                                {t('getStarted')} <ArrowRight className="w-5 h-5" />
                            </Link>
                            <a href="tel:108" className="btn-emergency text-lg inline-flex items-center justify-center gap-2">
                                <Phone className="w-5 h-5" /> {t('callNow')}
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Problems Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp} className="text-center mb-16">
                        <h2 className="section-title mb-4">{t('problemTitle')}</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t('problems')}</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {problems.map((p, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="card-hover flex gap-5"
                            >
                                <div className={`p-4 rounded-2xl ${p.color} shrink-0`}>
                                    <p.icon className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-xl text-maatri-900 mb-2">{p.title}</h3>
                                    <p className="text-gray-600">{p.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Solutions Section */}
            <section className="py-20 bg-gradient-to-br from-maatri-50 to-sage-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp} className="text-center mb-16">
                        <h2 className="section-title mb-4">{t('solutionTitle')}</h2>
                        <p className="text-gray-600 text-lg">{t('solutions')}</p>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {solutions.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="card-hover text-center"
                            >
                                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-maatri-100 flex items-center justify-center">
                                    <s.icon className="w-8 h-8 text-maatri-600" />
                                </div>
                                <h3 className="font-display font-bold text-lg text-maatri-900 mb-2">{s.title}</h3>
                                <p className="text-gray-600 text-sm">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Emergency CTA */}
            <section className="py-16 bg-gradient-to-r from-coral-500 to-coral-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-display font-bold text-white mb-4">{t('emergency')}</h2>
                    <p className="text-white/90 mb-8 text-lg">{t('familyEmergency')} &bull; {t('publicHealth')}</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a href="tel:108" className="bg-white text-coral-600 font-bold py-4 px-8 rounded-2xl hover:shadow-lg transition-all text-lg">
                            {t('ambulance')}
                        </a>
                        <a href="tel:102" className="bg-white/20 text-white font-bold py-4 px-8 rounded-2xl hover:bg-white/30 transition-all text-lg border border-white/30">
                            {t('maternalHelpline')}
                        </a>
                        <a href="tel:181" className="bg-white/20 text-white font-bold py-4 px-8 rounded-2xl hover:bg-white/30 transition-all text-lg border border-white/30">
                            {t('womenHelpline')}
                        </a>
                        <a href="tel:104" className="bg-white/20 text-white font-bold py-4 px-8 rounded-2xl hover:bg-white/30 transition-all text-lg border border-white/30">
                            {t('healthHelpline')}
                        </a>
                    </div>
                </div>
            </section>

            {/* Who Is This For */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp} className="text-center mb-16">
                        <h2 className="section-title mb-4">{t('whoFor')}</h2>
                    </motion.div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {roles.map((r, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                className="card text-center"
                            >
                                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${r.color} flex items-center justify-center`}>
                                    <r.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="font-semibold text-maatri-900">{r.title}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-maatri-900 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <CheckCircle2 className="w-16 h-16 text-maatri-400 mx-auto mb-6" />
                    <h2 className="text-3xl font-display font-bold text-white mb-4">{t('heroTitle')}</h2>
                    <p className="text-maatri-200 mb-8 text-lg">{t('tagline')}</p>
                    <Link to="/dashboard" className="btn-primary text-lg inline-flex items-center gap-2">
                        {t('getStarted')} <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </Layout>
    );
}