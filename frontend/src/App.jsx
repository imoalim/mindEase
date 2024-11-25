import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import TherapyServices from '@/pages/TherapyServicesPage'
import AppointmentPage from "./pages/AppointmentPage.jsx";
import {AuthProvider} from "./services/AuthProvider.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PrivateRoutes from "./components/PrivateRoutes.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import QuestionnairePage from './pages/UserQuestionnairePage.jsx';
import RecommendationsPage from './components/RecommendationsPage.jsx';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />} >
              <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/therapy-services" element={<TherapyServices />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/appointment-page" element={<AppointmentPage />} />
          <Route path="/questionnaire" element={<QuestionnairePage />} />
          <Route path="/suggestions" element={<RecommendationsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
