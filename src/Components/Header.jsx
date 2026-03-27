import logo from '../assets/logo.jpeg';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const colors = {
    darkGreen: '#0f4d2c',
    mediumGreen: '#1b6b3d',
    gold: '#d4af37',
    white: '#ffffff',
    lightGold: '#f4e4b8'
  };

  return (
    <header ref={headerRef} style={{
      background: `linear-gradient(135deg, ${colors.darkGreen} 0%, ${colors.mediumGreen} 100%)`,
      boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      width: '100%',
      padding: '0',
      borderBottom: `3px solid ${colors.gold}`
    }}>
      <div style={{
        width: '100%',
        padding: 'clamp(12px, 2vw, 18px) clamp(15px, 3vw, 20px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 'clamp(70px, 12vw, 90px)',
        flexWrap: 'wrap',
        gap: '15px',
        boxSizing: 'border-box',
        position: 'relative'
      }}>
        {/* Logo/Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 12px)' }}>
          <img 
            src='https://res.cloudinary.com/dgyykbmt6/image/upload/v1774612536/WhatsApp_Image_2026-03-27_at_17.19.16_yyi5ms.jpg'
            alt="Aluri's Global Rice Logo" 
            style={{
              height: 'clamp(50px, 10vw, 70px)',
              width: 'clamp(50px, 10vw, 70px)',
              objectFit: 'cover',
              borderRadius: 'clamp(8px, 2vw, 12px)',
              backgroundColor: colors.white,
              padding: 'clamp(4px, 1vw, 8px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              border: `2px solid ${colors.gold}`,
              display: 'block'
            }}
          />
          <div>
            <h1 style={{
              color: colors.gold,
              fontSize: 'clamp(14px, 3.5vw, 26px)',
              fontWeight: '900',
              margin: 0,
              letterSpacing: 'clamp(0.5px, 0.2vw, 1px)',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              lineHeight: '1.2',
              fontFamily: 'Cinzel, Georgia, serif'
            }}>
              <span style={{ color: colors.gold }}>ALURI'S</span> <span style={{ color: colors.white }}>GLOBAL TRADE</span><sup style={{ fontSize: '0.7em', verticalAlign: 'super' }}>™</sup>
            </h1>
            <p style={{
              color: colors.gold,
              fontSize: 'clamp(8px, 1.8vw, 13px)',
              margin: 0,
              letterSpacing: 'clamp(0.5px, 0.3vw, 2px)',
              fontWeight: '600',
              textTransform: 'uppercase',
              lineHeight: '1.2',
              fontFamily: 'Playfair Display, Georgia, serif',
              fontStyle: 'italic'
            }}>
              ⭐ From fields to Your Home 
            </p>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            backgroundColor: 'transparent',
            border: `2px solid ${colors.gold}`,
            color: colors.gold,
            fontSize: 'clamp(20px, 4vw, 24px)',
            padding: 'clamp(6px, 1.5vw, 8px) clamp(10px, 2vw, 12px)',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
          className="mobile-menu-btn"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        {/* Navigation */}
        <nav style={{ 
          display: menuOpen ? 'flex' : 'flex',
          gap: 'clamp(25px, 4vw, 40px)', 
          alignItems: 'center', 
          flexWrap: 'wrap',
          width: menuOpen ? '100%' : 'auto'
        }} className={menuOpen ? "desktop-nav open" : "desktop-nav"}>
          <Link
            to="/"
            onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{
              color: colors.white,
              textDecoration: 'none',
              fontSize: 'clamp(14px, 2.5vw, 16px)',
              fontWeight: '900',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              paddingBottom: '8px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = colors.gold;
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.borderBottom = `3px solid ${colors.gold}`;
            }}
            onMouseLeave={(e) => {
              e.target.style.color = colors.white;
              e.target.style.transform = 'translateY(0)';
              e.target.style.borderBottom = 'none';
            }}
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{
              color: colors.white,
              textDecoration: 'none',
              fontSize: 'clamp(14px, 2.5vw, 16px)',
              fontWeight: '900',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              paddingBottom: '8px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = colors.gold;
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.borderBottom = `3px solid ${colors.gold}`;
            }}
            onMouseLeave={(e) => {
              e.target.style.color = colors.white;
              e.target.style.transform = 'translateY(0)';
              e.target.style.borderBottom = 'none';
            }}
          >
            Products
          </Link>
          <Link
            to="/about-us"
            onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{
              color: colors.white,
              textDecoration: 'none',
              fontSize: 'clamp(14px, 2.5vw, 16px)',
              fontWeight: '900',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              paddingBottom: '8px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = colors.gold;
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.borderBottom = `3px solid ${colors.gold}`;
            }}
            onMouseLeave={(e) => {
              e.target.style.color = colors.white;
              e.target.style.transform = 'translateY(0)';
              e.target.style.borderBottom = 'none';
            }}
          >
            About Us
          </Link>
          <Link
            to="/quality"
            onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{
              color: colors.white,
              textDecoration: 'none',
              fontSize: 'clamp(14px, 2.5vw, 16px)',
              fontWeight: '900',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              paddingBottom: '8px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = colors.gold;
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.borderBottom = `3px solid ${colors.gold}`;
            }}
            onMouseLeave={(e) => {
              e.target.style.color = colors.white;
              e.target.style.transform = 'translateY(0)';
              e.target.style.borderBottom = 'none';
            }}
          >
            Quality
          </Link>
          <Link
            to="/contact"
            onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{
              color: colors.white,
              textDecoration: 'none',
              fontSize: 'clamp(14px, 2.5vw, 16px)',
              fontWeight: '900',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              paddingBottom: '8px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = colors.gold;
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.borderBottom = `3px solid ${colors.gold}`;
            }}
            onMouseLeave={(e) => {
              e.target.style.color = colors.white;
              e.target.style.transform = 'translateY(0)';
              e.target.style.borderBottom = 'none';
            }}
          >
            Contact
          </Link>
          <Link
            to="/quote"
            onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{
              background: `linear-gradient(135deg, ${colors.gold} 0%, #e6c14a 100%)`,
              color: colors.darkGreen,
              border: `2px solid ${colors.white}`,
              padding: 'clamp(10px, 2vw, 14px) clamp(20px, 4vw, 32px)',
              borderRadius: '10px',
              fontSize: 'clamp(13px, 2.5vw, 16px)',
              fontWeight: '900',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(212,175,55,0.4)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              textDecoration: 'none',
              display: 'inline-block'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px) scale(1.05)';
              e.target.style.boxShadow = '0 8px 25px rgba(212,175,55,0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 4px 15px rgba(212,175,55,0.4)';
            }}
          >
            📞 Get Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
