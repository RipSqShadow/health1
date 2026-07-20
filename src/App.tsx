import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/i18n/LanguageContext';
import LandingPage from '@/pages/LandingPage';
import DashboardPage from '@/pages/DashboardPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPregnancyPage from '@/pages/RegisterPregnancyPage';
import BeneficiaryProfilePage from '@/pages/BeneficiaryProfilePage';
import VisitEntryPage from '@/pages/VisitEntryPage';
import ImmunizationPage from '@/pages/ImmunizationPage';
import HighRiskPage from '@/pages/HighRiskPage';
import ReportsPage from '@/pages/ReportsPage';
import HealthEducationPage from '@/pages/HealthEducationPage';
import EmergencyPage from '@/pages/EmergencyPage';
import ContactFeedbackPage from '@/pages/ContactFeedbackPage';
import WellnessTrackerPage from '@/pages/WellnessTrackerPage';
import GovtSchemesPage from '@/pages/GovtSchemesPage';
import AppointmentsPage from '@/pages/AppointmentsPage';
import BloodDonorPage from '@/pages/BloodDonorPage';
import PostnatalPage from '@/pages/PostnatalPage';
import BirthPreparednessPage from '@/pages/BirthPreparednessPage';
import Subscription from '@/pages/Subscription';
import SignupPage from '@/pages/Signup';

export default function App() {
    return (
        <LanguageProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPregnancyPage />} />
                    <Route path="/profile" element={<BeneficiaryProfilePage />} />
                    <Route path="/visit" element={<VisitEntryPage />} />
                    <Route path="/immunization" element={<ImmunizationPage />} />
                    <Route path="/high-risk" element={<HighRiskPage />} />
                    <Route path="/reports" element={<ReportsPage />} />
                    <Route path="/education" element={<HealthEducationPage />} />
                    <Route path="/emergency" element={<EmergencyPage />} />
                    <Route path="/contact" element={<ContactFeedbackPage />} />
                    <Route path="/subscription" element={<Subscription />} />
                    <Route path="/wellness" element={<WellnessTrackerPage />} />
                    <Route path="/schemes" element={<GovtSchemesPage />} />
                    <Route path="/appointments" element={<AppointmentsPage />} />
                    <Route path="/donors" element={<BloodDonorPage />} />
                    <Route path="/postnatal" element={<PostnatalPage />} />
                    <Route path="/birth-plan" element={<BirthPreparednessPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Routes>
            </BrowserRouter>
        </LanguageProvider>
    );
}