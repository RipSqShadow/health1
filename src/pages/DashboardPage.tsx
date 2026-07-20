import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useLanguage } from '@/i18n/LanguageContext';
import {
    Plus, FileText, Syringe, Phone, Landmark, Droplet, ClipboardList, Baby, Calendar
} from 'lucide-react';

// Remove these unused arrays since they're not being used
// const actionsNeeded = [...]
// const coverageGaps = [...]
// const upcomingVisits = [...]
// const resolvedToday = [...]

export default function DashboardPage() {
    const { t } = useLanguage();

    // Remove summaryCards since it's not being used
    // const summaryCards = [...]

    // Remove getTypeBadge since it's not being used
    // const getTypeBadge = (type: string) => {...}

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