import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Main from './components/Main'
import Staff from './components/Staff'
import Complaints from './components/Complaints'
import Factions from './components/Factions'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/factions" element={<Factions />} />
      </Routes>
    </Router>
  )
}

export default App
