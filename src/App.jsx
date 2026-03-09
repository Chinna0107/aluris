import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Components/Home'
import PremiumRice from './Components/PremiumRice'
import Footer from './Components/Footer'
import Products from './Components/Products'
import Contact from './Components/Contact'
import Quality from './Components/Quality'
import Quote from './Components/Quote'


function App() {
  return (
    <Router>
      <div style={{ margin: 0, padding: 0, width: '100%', overflow: 'hidden' }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
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
