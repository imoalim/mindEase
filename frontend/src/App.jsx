import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import TherapyServices from '@/pages/TherapyServicesPage'
import AuthenticatePage from '@/pages/AuthenticatePage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/therapy-services" element={<TherapyServices />} />
        <Route path="/authenticate" element={<AuthenticatePage />} />
      </Routes>
    </Router>
  )
}

export default App
