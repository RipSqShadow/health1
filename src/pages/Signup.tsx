import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLanguage } from '@/i18n/LanguageContext';
import {
    User, Baby, Stethoscope, Shield, Mail, MapPin, Lock, Eye, EyeOff,
    CheckCircle2, AlertCircle
} from 'lucide-react';

const roles = [
    { id: 'pregnant_woman', icon: Baby, label: 'pregnantWomen' },
    { id: 'asha', icon: User, label: 'ashaRole' },
    { id: 'anm', icon: Stethoscope, label: 'anmRole' },
    { id: 'doctor', icon: Stethoscope, label: 'doctorRole' },
    { id: 'admin', icon: Shield, label: 'adminRole' },
];

export default function SignupPage() {
    const { t } = useLanguage();
    const navigate = useNavigate();

    // ---- Form state ----
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [village, setVillage] = useState('');
    const [district, setDistrict] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // ---- OTP state ----
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);

    // ---- UI state ----
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const DUMMY_OTP = '123456';

    // ---- Validations ----
    const validatePhone = (val: string) => /^[0-9]{10}$/.test(val.replace(/\D/g, ''));
    const validatePassword = (val: string) => val.length >= 8;
    const validateName = (val: string) => val.trim().length >= 2;
    const validateVillage = (val: string) => val.trim().length >= 2;
    const validateDistrict = (val: string) => val.trim().length >= 2;

    // ---- Send OTP ----
    const handleSendOtp = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!selectedRole) {
            setError('Please select your role');
            return;
        }
        if (!validateName(fullName)) {
            setError('Please enter your full name');
            return;
        }
        if (!validatePhone(phone)) {
            setError('Please enter a valid 10-digit phone number');
            return;
        }
        if (!validateVillage(village)) {
            setError('Please enter your village/area');
            return;
        }
        if (!validateDistrict(district)) {
            setError('Please enter your district');
            return;
        }
        if (!validatePassword(password)) {
            setError('Password must be at least 8 characters');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Simulate sending OTP
        setOtpSent(true);
        setSuccess('OTP sent successfully! (Dummy: 123456)');
    };

    // ---- Verify OTP ----
    const handleVerifyOtp = () => {
        setError('');
        if (otp === DUMMY_OTP) {
            setOtpVerified(true);
            setSuccess('OTP verified successfully!');
        } else {
            setError('Invalid OTP. Please try again.');
        }
    };

    // ---- Submit registration ----
    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!otpVerified) {
            setError('Please verify your OTP first');
            return;
        }

        setLoading(true);
        setError('');

        const userData = {
            fullName: fullName.trim(),
            phone: phone.replace(/\D/g, ''),
            role: selectedRole,
            village: village.trim(),
            district: district.trim(),
            createdAt: new Date().toISOString(),
        };

        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...userData, password }),
            });

            if (res.ok) {
                const user = await res.json();
                localStorage.setItem('maatritrack-user', JSON.stringify(user));
                setSuccess('Account created successfully!');
                setTimeout(() => navigate('/dashboard'), 1500);
                return;
            }
        } catch (err) {
            console.warn('API unavailable, saving locally:', err);
        }

        // Fallback: save locally
        localStorage.setItem('maatritrack-user', JSON.stringify(userData));
        setSuccess('Account created successfully!');
        setTimeout(() => navigate('/dashboard'), 1500);
        setLoading(false);
    };

    // ---- Render ----
    return (
        <Layout show3D variant3D="hero">
            <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card w-full max-w-lg p-6 sm:p-8"
                >
                    {/* Header */}
                    <div className="text-center mb-6">
                        <img src="/logo.svg" alt="MaatriTrack" className="h-14 w-14 mx-auto mb-3" />
                        <h1 className="font-display font-bold text-2xl gradient-text">Create Account</h1>
                        <p className="text-gray-500 text-sm mt-1">Join MaatriTrack — Save lives, track health</p>
                    </div>

                    <form onSubmit={otpSent ? (otpVerified ? handleSignup : handleVerifyOtp) : handleSendOtp} className="space-y-4">

                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-coral-500">*</span></label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="e.g. Priya Sharma"
                                className="input-field"
                                required
                            />
                        </div>

                        {/* Role Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select your role <span className="text-coral-500">*</span></label>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                {roles.map((role) => (
                                    <button
                                        key={role.id}
                                        type="button"
                                        onClick={() => setSelectedRole(role.id)}
                                        className={`p-2 rounded-xl border-2 text-xs font-medium transition-all flex flex-col items-center gap-0.5 ${selectedRole === role.id
                                                ? 'border-maatri-500 bg-maatri-50 text-maatri-700'
                                                : 'border-gray-200 hover:border-maatri-200'
                                            }`}
                                    >
                                        <role.icon className="w-5 h-5" />
                                        <span className="text-[10px]">{t(role.label as 'ashaRole')}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-coral-500">*</span></label>
                            <div className="flex items-center">
                                <span className="inline-flex items-center px-3 py-2.5 bg-gray-100 border border-r-0 border-gray-300 rounded-l-xl text-gray-600 text-sm">
                                    +91
                                </span>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                    placeholder="9876543210"
                                    className="input-field rounded-l-none flex-1"
                                    maxLength={10}
                                    required
                                />
                            </div>
                        </div>

                        {/* Village & District */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Village / Area <span className="text-coral-500">*</span></label>
                                <input
                                    type="text"
                                    value={village}
                                    onChange={(e) => setVillage(e.target.value)}
                                    placeholder="e.g. Rampur"
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">District <span className="text-coral-500">*</span></label>
                                <input
                                    type="text"
                                    value={district}
                                    onChange={(e) => setDistrict(e.target.value)}
                                    placeholder="e.g. Gorakhpur"
                                    className="input-field"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password & Confirm Password */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password <span className="text-coral-500">*</span></label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Min 8 characters"
                                        className="input-field pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password <span className="text-coral-500">*</span></label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Re-enter password"
                                        className="input-field pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* OTP Section */}
                        {otpSent && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP <span className="text-coral-500">*</span></label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                            placeholder="6-digit OTP"
                                            className="input-field flex-1"
                                            maxLength={6}
                                            required
                                            disabled={otpVerified}
                                        />
                                        {!otpVerified && (
                                            <button
                                                type="button"
                                                onClick={handleVerifyOtp}
                                                className="btn-secondary px-4 py-2 text-sm whitespace-nowrap"
                                            >
                                                Verify
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">Dummy OTP: 123456</p>
                                </div>
                                {otpVerified && (
                                    <div className="flex items-center gap-2 text-sage-600 bg-sage-50 border border-sage-200 rounded-lg px-3 py-2 text-sm">
                                        <CheckCircle2 className="w-4 h-4" />
                                        <span>OTP verified successfully!</span>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Error & Success messages */}
                        {error && (
                            <div className="flex items-center gap-2 text-coral-600 bg-coral-50 border border-coral-100 rounded-lg px-3 py-2 text-sm">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}
                        {success && (
                            <div className="flex items-center gap-2 text-sage-600 bg-sage-50 border border-sage-200 rounded-lg px-3 py-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                                <span>{success}</span>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating account...' : otpSent && otpVerified ? 'Create Account' : otpSent ? 'Verify OTP' : 'Send OTP'}
                        </button>

                        {/* Login link */}
                        <p className="text-center text-sm text-gray-500 mt-2">
                            Already have an account?{' '}
                            <Link to="/login" className="text-maatri-600 font-semibold hover:underline">
                                Log in
                            </Link>
                        </p>
                    </form>
                </motion.div>
            </div>
        </Layout>
    );
}