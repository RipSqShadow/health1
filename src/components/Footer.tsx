import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import { useLanguage } from '@/i18n/LanguageContext';

import { Heart, Phone, MessageCircle } from 'lucide-react';



export default function Footer() {

  const { t } = useLanguage();



  return (

    <footer className="relative mt-20 overflow-hidden">

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-maatri-400/50 to-transparent" />



      <div className="bg-gradient-to-br from-maatri-900 via-maatri-950 to-maatri-900 text-white relative">

        <div className="absolute inset-0 opacity-30">

          <div className="absolute top-0 left-1/4 w-64 h-64 bg-maatri-500/20 rounded-full blur-3xl" />

          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-coral-500/15 rounded-full blur-3xl" />

        </div>



        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

            <motion.div

              initial={{ opacity: 0, y: 20 }}

              whileInView={{ opacity: 1, y: 0 }}

              viewport={{ once: true }}

              className="col-span-1 md:col-span-2"

            >

              <div className="flex items-center gap-3 mb-4">

                <img src="/logo.svg" alt="MaatriTrack" className="h-12 w-12 brightness-0 invert drop-shadow-glow" />

                <span className="font-display font-bold text-2xl">{t('appName')}</span>

              </div>

              <p className="text-maatri-200 mb-4 max-w-md leading-relaxed">{t('footer')}</p>


            </motion.div>



            <motion.div

              initial={{ opacity: 0, y: 20 }}

              whileInView={{ opacity: 1, y: 0 }}

              viewport={{ once: true }}

              transition={{ delay: 0.1 }}

            >

              <h4 className="font-semibold text-lg mb-4">{t('features')}</h4>
              <ul className="space-y-2 text-maatri-200">
                <li><Link to="/dashboard" className="hover:text-white transition-colors hover:translate-x-1 inline-block">{t('dashboard')}</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors hover:translate-x-1 inline-block">{t('register')}</Link></li>
                <li><Link to="/wellness" className="hover:text-white transition-colors hover:translate-x-1 inline-block">{t('wellness')}</Link></li>
                <li><Link to="/education" className="hover:text-white transition-colors hover:translate-x-1 inline-block">{t('education')}</Link></li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <h4 className="font-semibold text-lg mb-4">Services</h4>
              <ul className="space-y-2 text-maatri-200">
                <li><Link to="/schemes" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Govt Schemes</Link></li>
                <li><Link to="/donors" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Blood Donors</Link></li>
                <li><Link to="/appointments" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Appointments</Link></li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="font-semibold text-lg mb-4">{t('emergency')}</h4>

              <ul className="space-y-2 text-maatri-200">

                {[

                  { num: '108', label: t('ambulance') },

                  { num: '102', label: t('maternalHelpline') },

                  { num: '181', label: t('womenHelpline') },

                  { num: '104', label: t('healthHelpline') },

                ].map(({ num, label }) => (

                  <li key={num} className="flex items-center gap-2 group">

                    <Phone className="w-4 h-4 text-coral-400 group-hover:animate-pulse" />

                    <a href={`tel:${num}`} className="hover:text-white transition-colors">{label}</a>

                  </li>

                ))}

              </ul>

            </motion.div>

          </div>



          <div className="border-t border-maatri-700/50 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">

            <p className="text-maatri-300 text-sm flex items-center gap-1">

              <Heart className="w-4 h-4 text-coral-400 animate-pulse-slow" /> {t('allRights')} &copy; 2026

            </p>

            <div className="flex gap-6 text-sm text-maatri-300">

              <span className="hover:text-white transition-colors cursor-pointer">{t('privacy')}</span>

              <span className="hover:text-white transition-colors cursor-pointer">{t('terms')}</span>

            </div>

          </div>

        </div>

      </div>

    </footer>

  );

}

