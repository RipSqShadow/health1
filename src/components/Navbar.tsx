import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { INDIAN_LANGUAGES } from '@/i18n/translations';
import { useState, useRef, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown, MessageCircle, UserPlus } from 'lucide-react';

export default function Navbar() {
    const { t, language, setLanguage } = useLanguage();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { scrollY } = useScroll();
    const navRef = useRef<HTMLElement>(null);

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setScrolled(latest > 20);
    });

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [location]);

    const navLinks = [
        { to: '/', label: t('home') },
        { to: '/wellness', label: t('wellness') },
        { to: '/dashboard', label: t('dashboard') },
        { to: '/emergency', label: t('emergency') },
        { to: '/education', label: t('education') },
        { to: '/contact', label: t('contact') },
        { to: '/subscription', label: 'Subscription' },
    ];

    const currentLang = INDIAN_LANGUAGES.find(l => l.code === language);

    return (
        <motion.nav
            ref={navRef}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-glass py-0' : 'bg-transparent border-b border-transparent'
                }`}
        >
            <div className="w-full px-2 sm:px-4 lg:px-6">
                <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-12' : 'h-14'
                    }`}>

                    {/* ===== LEFT: Logo ===== */}
                    <Link to="/" className="flex items-center gap-1.5 flex-shrink-0 group">
                        <motion.img
                            src="/logo.svg"
                            alt="MaatriTrack"
                            className="h-6 sm:h-8 w-6 sm:w-8"
                            whileHover={{ scale: 1.1, rotate: 3 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            onError={(e) => {
                                // Fallback if logo.svg doesn't exist
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                        <span className="font-display font-bold text-sm sm:text-base gradient-text hidden sm:block whitespace-nowrap">
                            {t('appName')}
                        </span>
                    </Link>

                    {/* ===== CENTER: Nav Links ===== */}
                    <div className="hidden lg:flex items-center flex-1 justify-center px-2 overflow-visible">
                        <div className="flex items-center gap-0 whitespace-nowrap">
                            {navLinks.map(link => {
                                const active = location.pathname === link.to;
                                return (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        className={`relative px-1.5 xl:px-2.5 py-1.5 rounded-lg text-[11px] xl:text-sm font-medium transition-all whitespace-nowrap ${active
                                                ? 'text-maatri-700 bg-maatri-50/80'
                                                : 'text-gray-600 hover:text-maatri-700 hover:bg-maatri-50/60'
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
                    </div>

                    {/* ===== RIGHT: Actions ===== */}
                    <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
                        {/* Language Selector */}
                        <div className="relative">
                            <button
                                onClick={() => setLangOpen(!langOpen)}
                                className="flex items-center gap-0.5 px-1.5 sm:px-2 py-1.5 rounded-lg glass text-maatri-700 text-xs sm:text-sm font-medium transition-all hover:shadow-glass"
                            >
                                <Globe className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline text-xs">{currentLang?.nativeName}</span>
                                <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''
                                    }`} />
                            </button>
                            {langOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute right-0 mt-2 w-48 max-h-80 overflow-y-auto glass rounded-xl z-50 shadow-lg"
                                >
                                    {INDIAN_LANGUAGES.map(lang => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                setLanguage(lang.code);
                                                setLangOpen(false);
                                            }}
                                            className={`w-full text-left px-3 py-2 text-sm hover:bg-maatri-50/80 transition-colors flex justify-between first:rounded-t-xl last:rounded-b-xl ${language === lang.code
                                                    ? 'bg-maatri-50 text-maatri-700 font-semibold'
                                                    : 'text-gray-700'
                                                }`}
                                        >
                                            <span>{lang.nativeName}</span>
                                            <span className="text-gray-400 text-xs">{lang.name}</span>
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        {/* ChatGPT */}
                        <a
                            href="https://chatgpt.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:flex items-center gap-0.5 px-1.5 sm:px-2 py-1.5 rounded-lg glass text-sage-700 text-xs sm:text-sm font-medium transition-all hover:shadow-glass hover:bg-sage-50 whitespace-nowrap"
                        >
                            <MessageCircle className="w-3.5 h-3.5 text-sage-600" />
                            <span className="hidden xl:inline text-xs">ChatGPT</span>
                        </a>

                        {/* Sign Up */}
                        <Link
                            to="/signup"
                            className="hidden sm:flex items-center gap-0.5 px-2 sm:px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-maatri-50 text-maatri-700 border border-maatri-200 hover:bg-maatri-100 transition-all whitespace-nowrap"
                        >
                            <UserPlus className="w-3.5 h-3.5" />
                            <span className="hidden xs:inline">Sign Up</span>
                        </Link>

                        {/* Login */}
                        <Link
                            to="/login"
                            className="btn-primary text-xs sm:text-sm !py-1.5 !px-2 sm:!px-3 hidden sm:inline-flex whitespace-nowrap"
                        >
                            {t('login')}
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden p-1.5 rounded-lg hover:bg-maatri-50/80 transition-colors relative z-50"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* ===== MOBILE MENU ===== */}
            {mobileOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="lg:hidden glass border-t border-white/30 max-h-[calc(100vh-56px)] overflow-y-auto"
                    style={{
                        position: 'fixed',
                        top: scrolled ? '48px' : '56px',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 40,
                    }}
                >
                    <div className="px-4 py-3 space-y-0.5">
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.to}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.04 }}
                            >
                                <Link
                                    to={link.to}
                                    onClick={() => setMobileOpen(false)}
                                    className={`block px-4 py-3 rounded-lg font-medium transition-colors text-sm ${location.pathname === link.to
                                            ? 'bg-maatri-50 text-maatri-700'
                                            : 'text-gray-700 hover:bg-maatri-50/60'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}

                        <div className="h-px bg-gray-200 my-2" />

                        <div className="grid grid-cols-2 gap-3 pt-1">
                            <Link
                                to="/signup"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-sm bg-maatri-50 text-maatri-700 border border-maatri-200 hover:bg-maatri-100 transition-all"
                            >
                                <UserPlus className="w-4 h-4" />
                                Sign Up
                            </Link>
                            <Link
                                to="/login"
                                onClick={() => setMobileOpen(false)}
                                className="btn-primary text-center py-3 rounded-lg font-medium text-sm"
                            >
                                {t('login')}
                            </Link>
                        </div>

                        <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-gray-200/50">
                            <a
                                href="https://chatgpt.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg glass text-sage-700 text-sm font-medium"
                            >
                                <MessageCircle className="w-4 h-4 text-sage-600" />
                                <span>ChatGPT</span>
                            </a>
                            <button
                                onClick={() => setLangOpen(!langOpen)}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg glass text-maatri-700 text-sm font-medium"
                            >
                                <Globe className="w-4 h-4" />
                                <span>{currentLang?.nativeName}</span>
                                <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''
                                    }`} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            <style>{`
                /* Full width navbar */
                .max-w-7xl {
                    max-width: 100% !important;
                }
                
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                
                @media (max-width: 640px) {
                    .glass {
                        backdrop-filter: blur(8px);
                        -webkit-backdrop-filter: blur(8px);
                    }
                }

                /* Ensure nav links stay in one line */
                .whitespace-nowrap {
                    white-space: nowrap !important;
                }

                /* Prevent wrapping on all screen sizes */
                .flex-wrap {
                    flex-wrap: nowrap !important;
                }
            `}</style>
        </motion.nav>
    );
}