import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/i18n/LanguageContext';
import LandingPage from '@/pages/LandingPage';
import StatsPage from '@/pages/StatsPage';
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
import AboutSDG3Page from '@/pages/AboutSDG3Page';
import ContactFeedbackPage from '@/pages/ContactFeedbackPage';
import WellnessTrackerPage from '@/pages/WellnessTrackerPage';

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/stats" element={<StatsPage />} />
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
          <Route path="/about" element={<AboutSDG3Page />} />
          <Route path="/contact" element={<ContactFeedbackPage />} />
          <Route path="/wellness" element={<WellnessTrackerPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
