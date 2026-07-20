import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLanguage } from '@/i18n/LanguageContext';
import {
    AlertTriangle, Calendar, Users, CheckCircle2, Clock, ArrowRight,
    Plus, FileText, Syringe, Phone, Activity, Bell, MapPin, Landmark, Droplet, ClipboardList, Baby
} from 'lucide-react';

const actionsNeeded = [
    { id: 1, type: 'critical', title: 'Sunita Devi - BP 150/95', village: 'Rampur', action: 'Immediate referral to CHC', time: '2h ago' },
    { id: 2, type: 'high', title: 'Priya Sharma - Hb 8.2 g/dL', village: 'Sitapur', action: 'IFA supplementation + follow-up', time: '4h ago' },
    { id: 3, type: 'medium', title: 'Kavita Singh - Missed ANC Visit 3', village: 'Deoria', action: 'ASHA home visit scheduled', time: '6h ago' },
    { id: 4, type: 'high', title: 'Meena Patel - Age 17', village: 'Ballia', action: 'High-risk adolescent pregnancy protocol', time: '1d ago' },
];

const coverageGaps = [
    { village: 'Azamgarh', ancCoverage: 62, target: 90, gap: 28 },
    { village: 'Mau', ancCoverage: 71, target: 90, gap: 19 },
    { village: 'Jaunpur', ancCoverage: 78, target: 90, gap: 12 },
];

const upcomingVisits = [
    { name: 'Rekha Yadav', week: 28, date: 'Today', village: 'Rampur' },
    { name: 'Anjali Verma', week: 14, date: 'Tomorrow', village: 'Sitapur' },
    { name: 'Pooja Rai', week: 36, date: 'Mar 20', village: 'Gorakhpur' },
];

const resolvedToday = [
    { title: 'TT2 vaccination completed - Geeta Kumari', time: '10:30 AM' },
    { title: 'Referral accepted at CHC - Sunita Devi', time: '11:45 AM' },
    { title: 'ANC Visit 2 recorded - Radha Devi', time: '2:15 PM' },
];

export default function DashboardPage() {
    const { t } = useLanguage();

    const summaryCards = [
        { icon: Users, label: t('totalPregnancies'), value: '47', sub: t('active'), color: 'bg-maatri-500' },
        { icon: AlertTriangle, label: t('casesRequiringAttention'), value: '8', sub: t('highRisk'), color: 'bg-coral-500' },
        { icon: Calendar, label: t('upcomingVisits'), value: '12', sub: t('weekly'), color: 'bg-gold-500' },
        { icon: CheckCircle2, label: t('resolvedToday'), value: '6', sub: t('completed'), color: 'bg-sage-500' },
    ];

    const getTypeBadge = (type: string) => {
        switch (type) {
            case 'critical': return 'badge-red';
            case 'high': return 'badge-red';
            case 'medium': return 'badge-yellow';
            default: return 'badge-green';
        }
    };

    return (
        <Layout show3D variant3D="minimal">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-6xl mx-auto">
                    <div className="card p-8">
                        <h1 className="text-3xl font-bold mb-2">
                            Quick Actions
                        </h1>
                        <p className="text-gray-500 mb-8">
                            Choose an action to continue.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            <Link to="/register" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-maatri-50 hover:bg-maatri-100 transition-colors">
                                <Plus className="w-5 h-5 text-maatri-600" />
                                <span className="text-[10px] font-medium text-center">{t('register')}</span>
                            </Link>

                            <Link to="/visit" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-maatri-50 hover:bg-maatri-100 transition-colors">
                                <FileText className="w-5 h-5 text-maatri-600" />
                                <span className="text-[10px] font-medium text-center">{t('visit')}</span>
                            </Link>

                            <Link to="/immunization" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-maatri-50 hover:bg-maatri-100 transition-colors">
                                <Syringe className="w-5 h-5 text-maatri-600" />
                                <span className="text-[10px] font-medium text-center">{t('immunization')}</span>
                            </Link>

                            <Link to="/schemes" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors">
                                <Landmark className="w-5 h-5 text-blue-600" />
                                <span className="text-[10px] font-medium text-center">Schemes</span>
                            </Link>

                            <Link to="/appointments" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors">
                                <Calendar className="w-5 h-5 text-purple-600" />
                                <span className="text-[10px] font-medium text-center">Appts</span>
                            </Link>

                            <Link to="/donors" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-red-50 hover:bg-red-100 transition-colors">
                                <Droplet className="w-5 h-5 text-red-600" />
                                <span className="text-[10px] font-medium text-center">Donors</span>
                            </Link>

                            <Link to="/birth-plan" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-coral-50 hover:bg-coral-100 transition-colors">
                                <ClipboardList className="w-5 h-5 text-coral-600" />
                                <span className="text-[10px] font-medium text-center">Birth Plan</span>
                            </Link>

                            <Link to="/postnatal" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-sage-50 hover:bg-sage-100 transition-colors">
                                <Baby className="w-5 h-5 text-sage-600" />
                                <span className="text-[10px] font-medium text-center">Postnatal</span>
                            </Link>

                            <a href="tel:108" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-coral-50 hover:bg-coral-100 transition-colors">
                                <Phone className="w-5 h-5 text-coral-600" />
                                <span className="text-[10px] font-medium text-center">{t('emergency')}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
