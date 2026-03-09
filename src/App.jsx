import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import PremiumRice from './components/PremiumRice'
import Footer from './components/Footer'
import Products from './components/Products'
import Contact from './components/Contact'
import Quality from './Components/Quality'
import Quote from './components/Quote'


function App() {
  return (
    <Router>
      <div style={{ margin: 0, padding: 0, width: '100%', overflow: 'hidden' }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<PremiumRice />} />
          <Route path="/products" element={<Products />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quote" element={<Quote />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
