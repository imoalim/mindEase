import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import TherapyServices from '@/pages/TherapyServicesPage'
import Questionnaire from "@/pages/UserQuestionnaire.jsx";
import AIExplainer from './components/GoogleAI.jsx';
import AppointmentPage from "./pages/AppointmentPage.jsx";
import {AuthProvider} from "./services/AuthProvider.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PrivateRoutes from "./components/PrivateRoutes.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ResourcesPage from "./pages/Resources.jsx";
// import NavBar from './components/NavBar.jsx'

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
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/suggestions" element={<AIExplainer />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
