import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import ServicePage from './pages/services/ServicePage.jsx'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/service/:serviceId" element={<ServicePage />} />
    </Routes>
  )
}

export default App

