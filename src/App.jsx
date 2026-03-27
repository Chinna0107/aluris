import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Components/Home'
import PremiumRice from './Components/PremiumRice'
import Footer from './Components/Footer'
import Products from './Components/Products'
import Contact from './Components/Contact'
import Quality from './Components/Quality'
import Quote from './Components/Quote'
import Login from './Components/Login'
import AdminProducts from './Components/AdminProducts'

const HIDE_LAYOUT = ['/login', '/admin/products'];

function Layout() {
  const location = useLocation();
  const hideLayout = HIDE_LAYOUT.includes(location.pathname);
  return (
    <div style={{ margin: 0, padding: 0, width: '100%', overflow: 'hidden' }}>
      {!hideLayout && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="/about-us" element={<PremiumRice />} />
        <Route path="/products" element={<Products />} />
        <Route path="/quality" element={<Quality />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/products" element={<AdminProducts />} />
      </Routes>
      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  )
}

export default App
