import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import TherapyServices from '@/pages/TherapyServicesPage'
import AuthenticatePage from '@/pages/AuthenticatePage'
import ProfilePage from "./pages/ProfilePage.jsx";
import Questionnaire from "@/pages/UserQuestionnaire.jsx";
import AIExplainer from './components/GoogleAI.jsx';
import AppointmentPage from "./pages/AppointmentPage.jsx";
// import NavBar from './components/NavBar.jsx'

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/therapy-services" element={<TherapyServices />} />
        <Route path="/authenticate" element={<AuthenticatePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/appointment-page" element={<AppointmentPage />} />
        <Route path="/register" element={<Questionnaire />} />
        <Route path="/suggestions" element={<AIExplainer />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
