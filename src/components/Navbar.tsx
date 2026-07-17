import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

import { Link, useLocation } from 'react-router-dom';

import { useLanguage } from '@/i18n/LanguageContext';

import { INDIAN_LANGUAGES } from '@/i18n/translations';

import { useState } from 'react';

import { Menu, X, Globe, ChevronDown } from 'lucide-react';



export default function Navbar() {

  const { t, language, setLanguage } = useLanguage();

  const [mobileOpen, setMobileOpen] = useState(false);

  const [langOpen, setLangOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  const { scrollY } = useScroll();



  useMotionValueEvent(scrollY, 'change', (latest) => {

    setScrolled(latest > 20);

  });



  const navLinks = [

    { to: '/', label: t('home') },

    { to: '/stats', label: t('stats') },

    { to: '/dashboard', label: t('dashboard') },

    { to: '/emergency', label: t('emergency') },

    { to: '/education', label: t('education') },

    { to: '/about', label: t('about') },

    { to: '/contact', label: t('contact') },

  ];



  const currentLang = INDIAN_LANGUAGES.find(l => l.code === language);



  return (

    <motion.nav

      initial={{ y: -80, opacity: 0 }}

      animate={{ y: 0, opacity: 1 }}

      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}

      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${

        scrolled ? 'glass shadow-glass py-0' : 'bg-transparent border-b border-transparent'

      }`}

    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-14' : 'h-16'}`}>

          <Link to="/" className="flex items-center gap-3 group">

            <motion.img

              src="/logo.svg"

              alt="MaatriTrack"

              className="h-10 w-10"

              whileHover={{ scale: 1.12, rotate: 5 }}

              transition={{ type: 'spring', stiffness: 300 }}

            />

            <span className="font-display font-bold text-xl gradient-text hidden sm:block">{t('appName')}</span>

          </Link>



          <div className="hidden lg:flex items-center gap-1">

            {navLinks.map(link => {

              const active = location.pathname === link.to;

              return (

                <Link

                  key={link.to}

                  to={link.to}

                  className={`relative px-3 py-2 rounded-xl text-sm font-medium transition-all ${

                    active

                      ? 'text-maatri-700 bg-maatri-50/80'

                      : 'text-gray-700 hover:text-maatri-700 hover:bg-maatri-50/60'

                  }`}

                >

                  {link.label}

                  {active && (

                    <motion.span

                      layoutId="nav-indicator"

                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-maatri-500"

                    />

                  )}

                </Link>

              );

            })}

          </div>



          <div className="flex items-center gap-3">

            <div className="relative">

              <button

                onClick={() => setLangOpen(!langOpen)}

                className="flex items-center gap-1.5 px-3 py-2 rounded-xl glass text-maatri-700 text-sm font-medium transition-all hover:shadow-glass"

              >

                <Globe className="w-4 h-4" />

                <span className="hidden sm:inline">{currentLang?.nativeName}</span>

                <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />

              </button>

              {langOpen && (

                <motion.div

                  initial={{ opacity: 0, y: -10, scale: 0.95 }}

                  animate={{ opacity: 1, y: 0, scale: 1 }}

                  exit={{ opacity: 0, y: -10 }}

                  className="absolute right-0 mt-2 w-56 max-h-80 overflow-y-auto glass rounded-2xl z-50"

                >

                  {INDIAN_LANGUAGES.map(lang => (

                    <button

                      key={lang.code}

                      onClick={() => { setLanguage(lang.code); setLangOpen(false); }}

                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-maatri-50/80 transition-colors flex justify-between first:rounded-t-2xl last:rounded-b-2xl ${

                        language === lang.code ? 'bg-maatri-50 text-maatri-700 font-semibold' : 'text-gray-700'

                      }`}

                    >

                      <span>{lang.nativeName}</span>

                      <span className="text-gray-400 text-xs">{lang.name}</span>

                    </button>

                  ))}

                </motion.div>

              )}

            </div>



            <Link to="/login" className="btn-primary text-sm !py-2 !px-4 hidden sm:inline-flex">

              {t('login')}

            </Link>



            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-xl hover:bg-maatri-50/80 transition-colors">

              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}

            </button>

          </div>

        </div>

      </div>



      {mobileOpen && (

        <motion.div

          initial={{ opacity: 0, height: 0 }}

          animate={{ opacity: 1, height: 'auto' }}

          exit={{ opacity: 0, height: 0 }}

          className="lg:hidden glass border-t border-white/30"

        >

          <div className="px-4 py-3 space-y-1">

            {navLinks.map((link, i) => (

              <motion.div

                key={link.to}

                initial={{ opacity: 0, x: -20 }}

                animate={{ opacity: 1, x: 0 }}

                transition={{ delay: i * 0.05 }}

              >

                <Link

                  to={link.to}

                  onClick={() => setMobileOpen(false)}

                  className={`block px-4 py-3 rounded-xl font-medium transition-colors ${

                    location.pathname === link.to

                      ? 'bg-maatri-50 text-maatri-700'

                      : 'text-gray-700 hover:bg-maatri-50/60'

                  }`}

                >

                  {link.label}

                </Link>

              </motion.div>

            ))}

            <Link to="/login" onClick={() => setMobileOpen(false)} className="block btn-primary text-center mt-2">

              {t('login')}

            </Link>

          </div>

        </motion.div>

      )}

    </motion.nav>

  );

}

