import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import TherapyServices from '@/pages/TherapyServicesPage'
import AuthenticatePage from '@/pages/AuthenticatePage'
import PostAuthPage from "./pages/PostAuthPage.jsx";
import Questionnaire from "@/pages/UserQuestionnaire.jsx";
import AIExplainer from './components/GoogleAI.jsx';
import AppointmentPage from "./pages/AppointmentPage.jsx";
import {AuthProvider} from "./services/AuthProvider.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PrivateRoutes from "./components/PrivateRoutes.jsx";
import Resources from "./components/Resources.jsx";
// import NavBar from './components/NavBar.jsx'

const App = () => {
  return (
      <>
          <AuthProvider>
              <Router>
                  <Routes>
                      <Route element={<PrivateRoutes />} >
                          <Route path="/profile" element={<ProfilePage />} />
                      </Route>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/therapy-services" element={<TherapyServices />} />
                      <Route path="/authenticate" element={<AuthenticatePage />} />
                      <Route path="/post-auth" element={<PostAuthPage />} />
                      <Route path="/appointment-page" element={<AppointmentPage />} />
                      <Route path="/register" element={<Questionnaire />} />
                      <Route path="/suggestions" element={<AIExplainer />} />
                      <Route path="/resources" element={<Resources />} />
                  </Routes>
              </Router>
          </AuthProvider>
      </>
  )
}

export default App
