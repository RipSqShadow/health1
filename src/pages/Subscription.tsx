import React, { useState } from 'react';
import Layout from '@/components/Layout';

// ---- Interface definition ----
interface PlanCard {
    name: string;
    price: string;
    isFree: boolean;
}

const Subscription: React.FC = () => {
    // ---- State ----
    const [isYearly, setIsYearly] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalPlan, setModalPlan] = useState<PlanCard>({
        name: '',
        price: '',
        isFree: false,
    });
    const [activeTab, setActiveTab] = useState<'qr' | 'card'>('qr');
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [cardNumber, setCardNumber] = useState<string>('');
    const [cardExpiry, setCardExpiry] = useState<string>('');
    const [cardCvv, setCardCvv] = useState<string>('');
    const [cardName, setCardName] = useState<string>('');

    // ---- Pricing data ----
    const MONTHLY = { gov: '4,999', hospital: '9,999' };
    const YEARLY = { gov: '47,990', hospital: '95,990' };
    const getGovPrice = (): string => (isYearly ? YEARLY.gov : MONTHLY.gov);
    const getHospitalPrice = (): string => (isYearly ? YEARLY.hospital : MONTHLY.hospital);
    const getPeriod = (): string => (isYearly ? '/year' : '/month');

    // ---- Modal handlers ----
    const openModal = (planName: string, planPrice: string, isFree: boolean): void => {
        setModalPlan({ name: planName, price: planPrice, isFree });
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = (): void => {
        setIsModalOpen(false);
        document.body.style.overflow = '';
        setActiveTab('qr');
        setIsProcessing(false);
    };

    // ---- Payment handlers ----
    const handlePayment = (method: 'qr' | 'card'): void => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            closeModal();
            alert('🎉 Payment successful! Welcome to the Maternal Care family.');
        }, 1800);
    };

    // ---- Card formatting ----
    const formatCardNumber = (value: string): string => {
        let val = value.replace(/\D/g, '');
        if (val.length > 16) val = val.slice(0, 16);
        let formatted = '';
        for (let i = 0; i < val.length; i++) {
            if (i > 0 && i % 4 === 0) formatted += ' ';
            formatted += val[i];
        }
        return formatted;
    };

    const formatExpiry = (value: string): string => {
        let val = value.replace(/\D/g, '');
        if (val.length > 4) val = val.slice(0, 4);
        if (val.length > 2) val = val.slice(0, 2) + ' / ' + val.slice(2);
        return val;
    };

    const formatCvv = (value: string): string => {
        let val = value.replace(/\D/g, '');
        if (val.length > 4) val = val.slice(0, 4);
        return val;
    };

    const validateCard = (): boolean => {
        const num = cardNumber.replace(/\s/g, '');
        const expiry = cardExpiry.replace(/\s/g, '');
        const cvv = cardCvv;
        const name = cardName.trim();
        return num.length === 16 && expiry.length === 5 && cvv.length >= 3 && name.length >= 2;
    };

    const toggleYearly = (): void => setIsYearly(!isYearly);

    // ============================================================
    // RENDER
    // ============================================================
    return (
        <Layout show3D variant3D="minimal">
            <div className="min-h-screen bg-[#f1f5f9] flex items-center justify-center p-4 sm:p-6 font-['Inter',system-ui]">
                <div className="max-w-7xl w-full bg-white rounded-[2.5rem] px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 shadow-lg border border-[#e2e8f0] relative">

                    {/* ===== HEADER ===== */}
                    <div className="flex flex-col items-center text-center mb-10 md:mb-12">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0f172a] leading-tight tracking-tight">
                            Healthcare Plans <span className="bg-gradient-to-r from-[#059669] to-[#10b981] bg-clip-text text-transparent">for Everyone</span>
                        </h1>
                        <p className="text-[#64748b] text-base sm:text-lg max-w-xl mx-auto mt-2">
                            Connecting People, Providers &amp; Programs for Better Maternal Health
                        </p>
                    </div>

                    {/* ===== TOGGLE ===== */}
                    <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 md:mb-8">
                        <span className={`text-sm font-medium ${!isYearly ? 'text-[#0f172a] font-bold' : 'text-[#94a3b8]'}`}>Monthly</span>
                        <button
                            onClick={toggleYearly}
                            className={`w-12 h-6 rounded-full transition-colors duration-300 relative flex-shrink-0 ${isYearly ? 'bg-[#10b981]' : 'bg-[#e2e8f0]'}`}
                            aria-label="Toggle billing"
                        >
                            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ${isYearly ? 'translate-x-6' : ''}`} />
                        </button>
                        <span className={`text-sm font-medium ${isYearly ? 'text-[#0f172a] font-bold' : 'text-[#94a3b8]'}`}>Yearly</span>
                        <span className="bg-[#ecfdf5] text-[#059669] text-[0.65rem] font-bold px-2.5 py-0.5 rounded-full border border-[#a7f3d0] ml-1">Save 20%</span>
                    </div>

                    {/* ===== PLANS ===== */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                        {/* Plan 1: FREE */}
                        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 md:p-7 flex flex-col h-full transition-all duration-300 hover:-translate-y-1.5 hover:border-[#10b981] hover:shadow-lg shadow-sm">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-[#0f172a]">Pregnant Women &amp; Families</span>
                            </div>
                            <div className="text-3xl md:text-4xl font-extrabold text-[#0f172a]">
                                <span className="text-lg font-semibold text-[#94a3b8] align-super mr-0.5">₹</span>0<span className="text-sm font-medium text-[#94a3b8] ml-1">/month</span>
                            </div>
                            <p className="text-[#64748b] text-sm mt-1">For rural pregnant women and their families. Always free, always accessible.</p>
                            <div className="w-14 h-0.5 bg-gradient-to-r from-[#10b981] to-transparent rounded my-3" />
                            <ul className="space-y-1.5 flex-1 my-4">
                                {['Pregnancy month tracker', 'ANC appointment reminders', 'Vaccination schedule', 'Nutrition guidance', 'Emergency SOS', 'Multilingual support', 'AI health chatbot', 'Health education videos'].map((feature) => (
                                    <li key={feature} className="flex items-start gap-2 text-[#475569] text-sm py-1 border-b border-[#f1f5f9] last:border-0">
                                        <span className="text-[#10b981] flex-shrink-0 w-4 h-4 bg-[#ecfdf5] rounded-full flex items-center justify-center text-[0.6rem] font-bold mt-0.5">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => openModal('Pregnant Women & Families', '₹0 / month', true)}
                                className="w-full py-3 px-5 rounded-full font-bold text-sm bg-[#0f172a] text-white shadow-md hover:bg-[#1e293b] hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                Start for Free
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>

                        {/* Plan 2: POPULAR */}
                        <div className="bg-[#fafefe] border border-[#10b981] rounded-2xl p-6 md:p-7 flex flex-col h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-6 bg-gradient-to-r from-[#059669] to-[#10b981] text-white text-[0.6rem] font-bold uppercase tracking-wide px-3 py-1 rounded-b-lg shadow-md">Most Popular</div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-[#0f172a]">Government &amp; NGOs</span>
                            </div>
                            <div className="text-3xl md:text-4xl font-extrabold text-[#0f172a]">
                                <span className="text-lg font-semibold text-[#94a3b8] align-super mr-0.5">₹</span>
                                <span>{getGovPrice()}</span>
                                <span className="text-sm font-medium text-[#94a3b8] ml-1">{getPeriod()}</span>
                            </div>
                            <p className="text-[#64748b] text-sm mt-1">For PHCs, District Hospitals, NGOs, ASHA Supervisors &amp; Health Departments.</p>
                            <div className="w-14 h-0.5 bg-gradient-to-r from-[#10b981] to-transparent rounded my-3" />
                            <ul className="space-y-1.5 flex-1 my-4">
                                {['Village-wise pregnancy dashboard', 'High-risk pregnancy analytics', 'Maternal mortality reports', 'ASHA worker performance', 'District health analytics', 'GIS heatmaps', 'Export reports (PDF/Excel)', 'API integration'].map((feature) => (
                                    <li key={feature} className="flex items-start gap-2 text-[#475569] text-sm py-1 border-b border-[#f1f5f9] last:border-0">
                                        <span className="text-[#10b981] flex-shrink-0 w-4 h-4 bg-[#ecfdf5] rounded-full flex items-center justify-center text-[0.6rem] font-bold mt-0.5">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => openModal('Government & NGOs', `₹${getGovPrice()} ${getPeriod()}`, false)}
                                className="w-full py-3 px-5 rounded-full font-bold text-sm bg-[#0f172a] text-white shadow-md hover:bg-[#1e293b] hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                Pay Now
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>

                        {/* Plan 3: HOSPITALS */}
                        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 md:p-7 flex flex-col h-full transition-all duration-300 hover:-translate-y-1.5 hover:border-[#10b981] hover:shadow-lg shadow-sm">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-[#0f172a]">Hospitals &amp; Partners</span>
                            </div>
                            <div className="text-3xl md:text-4xl font-extrabold text-[#0f172a]">
                                <span className="text-lg font-semibold text-[#94a3b8] align-super mr-0.5">₹</span>
                                <span>{getHospitalPrice()}</span>
                                <span className="text-sm font-medium text-[#94a3b8] ml-1">{getPeriod()}</span>
                            </div>
                            <p className="text-[#64748b] text-sm mt-1">For hospitals, clinics, labs and healthcare providers.</p>
                            <div className="w-14 h-0.5 bg-gradient-to-r from-[#10b981] to-transparent rounded my-3" />
                            <ul className="space-y-1.5 flex-1 my-4">
                                <li className="flex items-start gap-2 text-[#475569] text-sm py-1 border-b border-[#f1f5f9]">
                                    <span className="text-[#10b981] flex-shrink-0 w-4 h-4 bg-[#ecfdf5] rounded-full flex items-center justify-center text-[0.6rem] font-bold mt-0.5">✓</span>
                                    <div><strong className="text-[#0f172a]">Starter</strong> <span className="text-[#94a3b8]">· Up to 200 patients · Appointment management · Patient records · SMS reminders</span></div>
                                </li>
                                <li className="flex items-start gap-2 text-[#475569] text-sm py-1 border-b border-[#f1f5f9]">
                                    <span className="text-[#10b981] flex-shrink-0 w-4 h-4 bg-[#ecfdf5] rounded-full flex items-center justify-center text-[0.6rem] font-bold mt-0.5">✓</span>
                                    <div><strong className="text-[#0f172a]">Professional</strong> <span className="text-[#94a3b8]">· Unlimited patients · AI risk prediction · Telemedicine · Analytics dashboard · Staff management</span></div>
                                </li>
                                <li className="flex items-start gap-2 text-[#475569] text-sm py-1 border-b border-[#f1f5f9] last:border-0">
                                    <span className="text-[#10b981] flex-shrink-0 w-4 h-4 bg-[#ecfdf5] rounded-full flex items-center justify-center text-[0.6rem] font-bold mt-0.5">✓</span>
                                    <div><strong className="text-[#0f172a]">Enterprise</strong> <span className="text-[#94a3b8]">· Multi-hospital support · API integration · Dedicated support · White-label solution</span></div>
                                </li>
                            </ul>
                            <button
                                onClick={() => openModal('Hospitals & Partners', `₹${getHospitalPrice()} ${getPeriod()}`, false)}
                                className="w-full py-3 px-5 rounded-full font-bold text-sm bg-transparent border-2 border-[#10b981] text-[#059669] hover:bg-[#ecfdf5] hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                Pay Now
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="text-center mt-10 md:mt-12">
                        <p className="text-sm text-[#94a3b8] tracking-wide">
                            <span className="inline-block mx-2">•</span>
                            All plans include free updates &amp; priority support
                            <span className="inline-block mx-2">•</span>
                            No hidden fees — cancel anytime
                        </p>
                    </div>
                </div>
            </div>

            {/* ===== MODAL ===== */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-[#0f172a]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={(e) => e.target === e.currentTarget && closeModal()}
                >
                    <div className="bg-white border border-[#e2e8f0] rounded-3xl max-w-2xl w-full p-6 sm:p-8 md:p-10 shadow-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-5 right-6 bg-[#f1f5f9] border-none text-[#94a3b8] text-2xl w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#e2e8f0] hover:text-[#0f172a] transition-colors"
                        >
                            ✕
                        </button>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                            <span className="text-lg font-bold text-[#0f172a]">{modalPlan.name}</span>
                            <span className="text-[#059669] font-extrabold text-xl">{modalPlan.price}</span>
                        </div>
                        <p className="text-sm text-[#94a3b8] mb-4">
                            {modalPlan.isFree ? 'Confirm your free registration below.' : 'Complete your subscription to start saving lives.'}
                        </p>

                        {!modalPlan.isFree ? (
                            <>
                                <div className="flex gap-2 bg-[#f8fafc] p-1.5 rounded-xl border border-[#e2e8f0] mb-4">
                                    <button
                                        className={`flex-1 py-2.5 text-center rounded-lg font-semibold text-sm ${activeTab === 'qr' ? 'bg-white text-[#0f172a] shadow-sm border border-[#e2e8f0]' : 'bg-transparent text-[#94a3b8] hover:text-[#0f172a]'} transition-colors`}
                                        onClick={() => setActiveTab('qr')}
                                    >
                                        📱 Scan QR Code
                                    </button>
                                    <button
                                        className={`flex-1 py-2.5 text-center rounded-lg font-semibold text-sm ${activeTab === 'card' ? 'bg-white text-[#0f172a] shadow-sm border border-[#e2e8f0]' : 'bg-transparent text-[#94a3b8] hover:text-[#0f172a]'} transition-colors`}
                                        onClick={() => setActiveTab('card')}
                                    >
                                        💳 Pay with Card
                                    </button>
                                </div>

                                {activeTab === 'qr' && (
                                    <div>
                                        <div className="flex flex-col items-center gap-3 p-5 bg-[#f8fafc] rounded-xl border border-dashed border-[#e2e8f0]">
                                            <img
                                                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=maternalcare@upi&pn=Maternal%20Care%20Foundation&am=0&cu=INR&tn=Donation%20for%20Mothers"
                                                alt="Dummy QR Code"
                                                className="w-40 h-40 rounded-lg bg-white p-2 shadow-sm"
                                            />
                                            <span className="text-sm font-semibold text-[#059669] bg-[#ecfdf5] px-4 py-1.5 rounded-full border border-[#a7f3d0]">
                                                🔹 UPI ID: maternalcare@upi
                                            </span>
                                            <span className="text-xs text-[#94a3b8]">Scan with any UPI app (GPay, PhonePe, Paytm)</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
                                            <span className="text-xs text-[#94a3b8] bg-[#f1f5f9] px-4 py-1.5 rounded-full">🔒 Secured · SSL Encrypted</span>
                                            <span className="text-xs text-[#94a3b8] bg-[#f1f5f9] px-4 py-1.5 rounded-full">⚡ Instant confirmation</span>
                                        </div>
                                        <button
                                            onClick={() => handlePayment('qr')}
                                            disabled={isProcessing}
                                            className="w-full py-3.5 rounded-full font-bold text-base bg-[#0f172a] text-white shadow-md hover:bg-[#1e293b] hover:-translate-y-0.5 transition-all duration-200 mt-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                                        >
                                            {isProcessing ? '⏳ Processing...' : '✅ Confirm & Pay via UPI'}
                                        </button>
                                    </div>
                                )}

                                {activeTab === 'card' && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-[0.7rem] font-semibold text-[#64748b] uppercase tracking-wide mb-1">Card Number</label>
                                            <input
                                                type="text"
                                                placeholder="1234 5678 9012 3456"
                                                maxLength={19}
                                                value={cardNumber}
                                                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                                className="w-full px-4 py-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-[#0f172a] text-sm focus:border-[#10b981] focus:bg-white focus:shadow-[0_0_0_4px_rgba(16,185,129,0.08)] outline-none transition-all"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[0.7rem] font-semibold text-[#64748b] uppercase tracking-wide mb-1">Expiry Date</label>
                                                <input
                                                    type="text"
                                                    placeholder="MM / YY"
                                                    maxLength={7}
                                                    value={cardExpiry}
                                                    onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                                                    className="w-full px-4 py-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-[#0f172a] text-sm focus:border-[#10b981] focus:bg-white focus:shadow-[0_0_0_4px_rgba(16,185,129,0.08)] outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[0.7rem] font-semibold text-[#64748b] uppercase tracking-wide mb-1">CVV</label>
                                                <input
                                                    type="password"
                                                    placeholder="•••"
                                                    maxLength={4}
                                                    value={cardCvv}
                                                    onChange={(e) => setCardCvv(formatCvv(e.target.value))}
                                                    className="w-full px-4 py-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-[#0f172a] text-sm focus:border-[#10b981] focus:bg-white focus:shadow-[0_0_0_4px_rgba(16,185,129,0.08)] outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[0.7rem] font-semibold text-[#64748b] uppercase tracking-wide mb-1">Cardholder Name</label>
                                            <input
                                                type="text"
                                                placeholder="Full name on card"
                                                value={cardName}
                                                onChange={(e) => setCardName(e.target.value)}
                                                className="w-full px-4 py-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-[#0f172a] text-sm focus:border-[#10b981] focus:bg-white focus:shadow-[0_0_0_4px_rgba(16,185,129,0.08)] outline-none transition-all"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-xs text-[#94a3b8] bg-[#f1f5f9] px-4 py-1.5 rounded-full">🔒 256-bit encryption</span>
                                            <span className="text-xs text-[#94a3b8]">We do not store your card details</span>
                                        </div>
                                        <button
                                            onClick={() => {
                                                if (!validateCard()) {
                                                    alert('⚠️ Please fill all card details correctly.');
                                                    return;
                                                }
                                                handlePayment('card');
                                            }}
                                            disabled={isProcessing}
                                            className="w-full py-3.5 rounded-full font-bold text-base bg-[#0f172a] text-white shadow-md hover:bg-[#1e293b] hover:-translate-y-0.5 transition-all duration-200 mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                                        >
                                            {isProcessing ? '⏳ Processing...' : '💳 Pay Securely'}
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-4">
                                <div className="w-16 h-16 bg-[#ecfdf5] rounded-full flex items-center justify-center mx-auto mb-3 text-[#059669]">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-[#0f172a]">Free Plan Confirmation</h3>
                                <p className="text-[#64748b] mt-2 max-w-sm mx-auto">
                                    You are registering for the <strong>Pregnant Women &amp; Families</strong> plan.
                                    <br />No payment details are required.
                                </p>
                                <button
                                    onClick={() => {
                                        closeModal();
                                        alert('🎉 You have successfully started the Free Plan! Welcome to the Maternal Care family.');
                                    }}
                                    className="w-full py-3.5 rounded-full font-bold text-base bg-[#0f172a] text-white shadow-md hover:bg-[#1e293b] hover:-translate-y-0.5 transition-all duration-200 mt-6"
                                >
                                    ✅ Confirm &amp; Start Free
                                </button>
                            </div>
                        )}

                        <p className="text-center text-xs text-[#94a3b8] mt-5">
                            By proceeding, you agree to our <a href="#" className="text-[#059669] font-semibold hover:underline">Terms of Service</a> and <a href="#" className="text-[#059669] font-semibold hover:underline">Privacy Policy</a>.
                        </p>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Subscription;