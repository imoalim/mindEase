import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import TherapyServices from '@/pages/TherapyServicesPage'
import AppointmentPage from "./pages/AppointmentPage.jsx";
import {AuthProvider} from "./services/AuthProvider.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PrivateRoutes from "./components/PrivateRoutes.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import TherapistsAppointmentsPage from "@/pages/TherapistsAppointmentsPage.jsx";
import BookAppointmentPage from "./pages/BookAppointmentPage.jsx";
// import NavBar from './components/NavBar.jsx'

import QuestionnairePage from './pages/UserQuestionnairePage.jsx';
import RecommendationsPage from './pages/RecommendationsPage.jsx';
import ResourcesPage from './pages/Resources.jsx';
import CompleteProfilePage from "./pages/CompleteProfilePage.jsx";
import AdminsPage from "@/pages/AdminsPage.jsx";
import RoleRoute from "@/components/RoleRoute.jsx";
import UsersPage from './pages/UsersPage.jsx';
import DisplayProfessionalsPage from "@/pages/DisplayProfessionalsPage.jsx";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />} >
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/book-appointments" element={<BookAppointmentPage />} />
              <Route element={<RoleRoute allowed_roles={["THERAPIST", "PSYCHOLOGY_STUDENT"]}/>}>
                  <Route path="/appointments" element={<TherapistsAppointmentsPage/>}/>
              </Route>

              <Route element={<RoleRoute allowed_roles={["ADMIN"]}/>}>
                  <Route path="/admin/therapists-verification" element={<AdminsPage/>} />
              </Route>
          </Route>

          <Route path="/therapists" element={<DisplayProfessionalsPage/>} />
          <Route path="/" element={<HomePage />} />
          <Route path="/therapy-services" element={<TherapyServices />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/appointment-page" element={<AppointmentPage />} />
          <Route path="/complete-profile" element={<CompleteProfilePage />} />
          <Route path="/questionnaire" element={<QuestionnairePage />} />
          <Route path="/suggestions" element={<RecommendationsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
