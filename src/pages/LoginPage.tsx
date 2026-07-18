import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLanguage } from '@/i18n/LanguageContext';
import { User, Baby, Stethoscope, Shield } from 'lucide-react';

const roles = [
  { id: 'pregnant_woman', icon: Baby, label: 'pregnantWomen' },
  { id: 'asha', icon: User, label: 'ashaRole' },
  { id: 'anm', icon: Stethoscope, label: 'anmRole' },
  { id: 'doctor', icon: Stethoscope, label: 'doctorRole' },
  { id: 'admin', icon: Shield, label: 'adminRole' },
];

export default function LoginPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!selectedRole) {
      setError('Please select a role first');
      return;
    }
    if (phone.replace(/\D/g, '').length >= 10) {
      setOtpSent(true);
    } else {
      setError('Please enter a valid 10-digit phone number');
    }
  };

  const saveUserAndRedirect = (user: Record<string, unknown>) => {
    localStorage.setItem('maatritrack-user', JSON.stringify(user));
    navigate('/dashboard');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const userData = {
      phone: phone.replace(/\D/g, ''),
      role: selectedRole,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: userData.phone, role: selectedRole }),
      });

      if (res.ok) {
        const user = await res.json();
        saveUserAndRedirect(user);
        return;
      }
    } catch (err) {
      console.warn('API unavailable, using local storage:', err);
    } finally {
      setLoading(false);
    }

    saveUserAndRedirect(userData);
  };

  return (
    <Layout show3D variant3D="hero">
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card w-full max-w-md"
        >
          <div className="text-center mb-8">
            <img src="/logo.svg" alt="MaatriTrack" className="h-16 w-16 mx-auto mb-4" />
            <h1 className="font-display font-bold text-2xl gradient-text">{t('appName')}</h1>
            <p className="text-gray-500 mt-2">{t('login')}</p>
          </div>

          <form onSubmit={otpSent ? handleLogin : handleSendOtp} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('selectRole')}</label>
              <div className="grid grid-cols-2 gap-2">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-3 rounded-xl border-2 text-sm font-medium transition-all flex flex-col items-center gap-1 ${
                      selectedRole === role.id
                        ? 'border-maatri-500 bg-maatri-50 text-maatri-700'
                        : 'border-gray-200 hover:border-maatri-200'
                    }`}
                  >
                    <role.icon className="w-5 h-5" />
                    {t(role.label as 'ashaRole')}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('phone')}</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                className="input-field"
                required
              />
            </div>

            {otpSent && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter any 6-digit OTP (demo: 123456)"
                  className="input-field"
                  maxLength={6}
                  minLength={6}
                  required
                />
                <p className="text-xs text-gray-400 mt-1">Demo mode: enter any 6 digits to continue</p>
              </motion.div>
            )}

            {error && (
              <p className="text-sm text-coral-600 bg-coral-50 border border-coral-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
              {loading ? 'Logging in...' : otpSent ? t('login') : 'Send OTP'}
            </button>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
}
