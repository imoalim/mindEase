import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import TherapyServices from '@/pages/TherapyServicesPage';
import AppointmentPage from '@/pages/AppointmentPage';
import { AuthProvider } from '@/services/AuthProvider';
import ProfilePage from '@/pages/ProfilePage';
import PrivateRoutes from '@/components/PrivateRoutes';
import RegisterPage from '@/pages/RegisterPage';
import LoginPage from '@/pages/LoginPage';
import QuestionnairePage from '@/pages/UserQuestionnairePage';
import RecommendationsPage from '@/pages/RecommendationsPage';
import ResourcesPage from '@/pages/Resources';
import CompleteProfilePage from '@/pages/CompleteProfilePage';
import BookAppointment from '@/pages/BookAppointment';

const App = () => {
  return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="/" element={<HomePage />} />
            <Route path="/therapy-services" element={<TherapyServices />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/appointment-page" element={<AppointmentPage />} />
            <Route path="/complete-profile" element={<CompleteProfilePage />} />
            <Route path="/questionnaire" element={<QuestionnairePage />} />
            <Route path="/suggestions" element={<RecommendationsPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
          </Routes>
        </Router>
      </AuthProvider>
  );
};

export default App;