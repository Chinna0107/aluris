import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import config from '../config';

function Home() {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [products, setProducts] = useState([]);

  // Restart scroll animation whenever products load
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || products.length === 0) return;
    scrollContainer.scrollLeft = 0;
  }, [products]);
  
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId;
    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollContainer.scrollLeft += 2;
        
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };
    
    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  const colors = {
    darkGreen: '#0f4d2c',
    mediumGreen: '#1b6b3d',
    gold: '#d4af37',
    white: '#ffffff',
    background: '#f5f5f5'
  };

  useEffect(() => {
    fetch(`${config.API_URL}/api/products`)
      .then(r => r.json())
      .then(data => {
        const list = data.success ? data.products : Array.isArray(data) ? data : [];
        setProducts(list.map(p => ({ ...p, features: p.features ?? [], quantities: p.quantities ?? [] })));
      })
      .catch(() => setProducts([]));
  }, []);

  return (
    <div style={{ width: '100%', paddingTop: 'clamp(70px, 12vw, 110px)' }}>
      {/* Hero Section */}
      <section style={{
        background: ` url('https://res.cloudinary.com/dgyykbmt6/image/upload/v1773289306/g17_pvrur3.jpg') `,
        minHeight: 'calc(100vh - clamp(70px, 12vw, 110px))',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(20px, 3vw, 40px) clamp(20px, 4vw, 40px) clamp(40px, 6vw, 80px)',
        textAlign: 'center',
        position: 'relative',
        boxShadow: 'inset 0 0 150px rgba(0,0,0,0.4)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
        boxSizing: 'border-box'
      }}>
        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          fontSize: '80px',
          opacity: '0.1',
          animation: 'float 6s ease-in-out infinite'
        }}>🌾</div>
        <div style={{
          position: 'absolute',
          bottom: '15%',
          right: '8%',
          fontSize: '80px',
          opacity: '0.1',
          animation: 'float 8s ease-in-out infinite'
        }}>🌾</div>
        
        <div style={{ 
          maxWidth: '1000px', 
          width: '100%',
          zIndex: 1
        }}>
          {/* Logo */}
          <div style={{ 
            marginBottom: 'clamp(15px, 2vw, 25px)',
            animation: 'fadeInDown 1s ease-out'
          }}>
            <img 
              src='https://res.cloudinary.com/dgyykbmt6/image/upload/v1774612536/WhatsApp_Image_2026-03-27_at_17.19.16_yyi5ms.jpg'
              alt="Aluri's Global Trade Logo"
              style={{
                width: 'clamp(80px, 15vw, 120px)',
                height: 'clamp(80px, 15vw, 120px)',
                objectFit: 'cover',
                borderRadius: '20px',
                boxShadow: `0 15px 50px rgba(0,0,0,0.4), 0 0 0 5px ${colors.gold}, 0 0 40px ${colors.gold}, inset 0 0 20px rgba(255,255,255,0.1)`,
                border: `5px solid ${colors.gold}`,
                transition: 'all 0.5s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.1) rotate(5deg)';
                e.target.style.boxShadow = `0 25px 70px rgba(0,0,0,0.5), 0 0 0 8px ${colors.gold}, 0 0 60px ${colors.gold}`;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1) rotate(0deg)';
                e.target.style.boxShadow = `0 15px 50px rgba(0,0,0,0.4), 0 0 0 5px ${colors.gold}, 0 0 40px ${colors.gold}, inset 0 0 20px rgba(255,255,255,0.1)`;
              }}
            />
          </div>
          
          {/* Company Name */}
          <h1 style={{
            color: colors.gold,
            fontSize: 'clamp(28px, 6vw, 56px)',
            fontWeight: '900',
            marginBottom: 'clamp(8px, 1vw, 12px)',
            textShadow: `4px 4px 10px rgba(0,0,0,0.7), 0 0 30px ${colors.gold}80`,
            letterSpacing: 'clamp(3px, 1vw, 6px)',
            fontFamily: 'Cinzel, Georgia, serif',
            textTransform: 'uppercase',
            animation: 'fadeInUp 1.2s ease-out',
            lineHeight: '1.2'
          }}>
            ALURI'S
          </h1>
          <h2 style={{
            color: colors.white,
            fontSize: 'clamp(22px, 4.5vw, 42px)',
            fontWeight: '700',
            marginBottom: 'clamp(12px, 2vw, 20px)',
            textShadow: `3px 3px 8px rgba(0,0,0,0.2), 0 0 20px rgba(223, 32, 32, 0.3)`,
            letterSpacing: 'clamp(4px, 1.5vw, 8px)',
            fontFamily: 'Cinzel, Georgia, serif',
            fontVariant: 'small-caps',
            animation: 'fadeInUp 1.4s ease-out',
            lineHeight: '1.2'
          }}>
            GLOBAL TRADE<sup style={{ fontSize: '0.5em', verticalAlign: 'super' }}>™</sup>
          </h2>
          
          {/* Decorative Line */}
          <div style={{
            width: 'clamp(120px, 30vw, 200px)',
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${colors.gold}, transparent)`,
            margin: 'clamp(12px, 2vw, 20px) auto',
            boxShadow: `0 0 20px ${colors.gold}`
          }}></div>
          
          {/* Tagline */}
          <p style={{
            color: colors.gold,
            fontSize: 'clamp(16px, 3vw, 24px)',
            fontWeight: '700',
            marginBottom: 'clamp(20px, 3vw, 30px)',
            textShadow: '3px 3px 8px rgba(0,0,0,0.7)',
            lineHeight: '1.6',
            fontFamily: 'Playfair Display, Georgia, serif',
            fontStyle: 'italic',
            letterSpacing: '1.5px',
            animation: 'fadeInUp 1.2s ease-out'
          }}>
            From Fields to Your Home
          </p>
          
          {/* Premium Quality */}
          <h3 style={{
            color: colors.white,
            fontSize: 'clamp(20px, 4vw, 36px)',
            fontWeight: '800',
            marginBottom: 'clamp(20px, 3vw, 35px)',
            textShadow: `4px 4px 8px rgba(0,0,0,0.6), 0 0 25px rgba(255,255,255,0.2)`,
            letterSpacing: 'clamp(2px, 0.5vw, 4px)',
            fontFamily: 'Cinzel, Georgia, serif',
            fontVariant: 'small-caps',
            animation: 'fadeInUp 1.8s ease-out',
            borderTop: `2px solid ${colors.gold}40`,
            borderBottom: `2px solid ${colors.gold}40`,
            padding: 'clamp(12px, 2vw, 18px) 0',
            lineHeight: '1.3'
          }}>
            Premium Quality Rice , Millets & Spices
          </h3>
          <Link to="/products" style={{ textDecoration: 'none' }}>
            <button style={{
              background: `linear-gradient(135deg, ${colors.gold} 0%, #f4e4b8 50%, ${colors.gold} 100%)`,
              color: colors.darkGreen,
              border: `3px solid ${colors.white}`,
              padding: 'clamp(12px, 2vw, 18px) clamp(30px, 5vw, 50px)',
              fontSize: 'clamp(14px, 2.5vw, 20px)',
              fontWeight: '900',
              borderRadius: '50px',
              cursor: 'pointer',
              boxShadow: `0 8px 30px rgba(0,0,0,0.4), 0 0 40px ${colors.gold}60, inset 0 2px 10px rgba(255,255,255,0.3)`,
              transition: 'all 0.4s ease',
              textTransform: 'uppercase',
              letterSpacing: 'clamp(1px, 0.3vw, 2px)',
              fontFamily: 'Cinzel, Georgia, serif'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px) scale(1.05)';
              e.target.style.boxShadow = `0 12px 40px rgba(212,175,55,0.7), 0 0 60px ${colors.gold}, inset 0 2px 15px rgba(255,255,255,0.5)`;
              e.target.style.background = `linear-gradient(135deg, #f4e4b8 0%, ${colors.gold} 50%, #f4e4b8 100%)`;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = `0 8px 30px rgba(0,0,0,0.4), 0 0 40px ${colors.gold}60, inset 0 2px 10px rgba(255,255,255,0.3)`;
              e.target.style.background = `linear-gradient(135deg, ${colors.gold} 0%, #f4e4b8 50%, ${colors.gold} 100%)`;
            }}
            >
              📞 Contact Us Now
            </button>
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        .home-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Products Section */}
      <section style={{
        padding: 'clamp(60px, 10vw, 100px) 0',
        background: 'linear-gradient(180deg, #0a1f0f 0%, #071508 50%, #0a1f0f 100%)',
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Decorative bg glow */}
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: '300px', height: '300px', borderRadius: '50%', background: `radial-gradient(circle, ${colors.gold}08 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '400px', height: '400px', borderRadius: '50%', background: `radial-gradient(circle, ${colors.mediumGreen}15 0%, transparent 70%)`, pointerEvents: 'none' }} />

        <div style={{ maxWidth: '100%', margin: '0 auto', padding: '0 clamp(20px, 5vw, 60px)', position: 'relative', zIndex: 1 }}>
          {/* Section heading */}
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <p style={{ color: colors.gold, fontSize: '12px', fontWeight: '700', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>— Straight from the Farm —</p>
            <h2 style={{
              color: colors.white,
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: '900',
              marginBottom: '12px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              fontFamily: 'Cinzel, Georgia, serif',
              background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.gold} 50%, ${colors.white} 100%)`,
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'shimmer 4s linear infinite',
            }}>
              Our Premium Products
            </h2>
            <div style={{ width: '80px', height: '2px', background: `linear-gradient(90deg, transparent, ${colors.gold}, transparent)`, margin: '0 auto 12px', boxShadow: `0 0 12px ${colors.gold}` }} />
            <p style={{ color: '#7aab8a', fontSize: 'clamp(14px, 2vw, 17px)', fontStyle: 'italic', fontFamily: 'Georgia, serif', letterSpacing: '1px' }}>Rice · Millets · Authentic Spices</p>
          </div>

          {/* Horizontal Scrollable Products */}
          <div 
            ref={scrollRef}
            style={{
            display: 'flex',
            gap: 'clamp(20px, 3vw, 35px)',
            overflowX: 'auto',
            overflowY: 'hidden',
            padding: '20px 10px 40px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          >
            {products.map((product, index) => (
              <div key={index} style={{
                minWidth: '185px', maxWidth: '185px',
                background: 'linear-gradient(160deg, #0f3d20 0%, #071a0d 100%)',
                borderRadius: '18px', overflow: 'hidden',
                boxShadow: `0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)`,
                transition: 'all 0.45s cubic-bezier(0.34,1.56,0.64,1)',
                cursor: 'pointer', flexShrink: 0, position: 'relative',
                border: `1px solid rgba(212,175,55,0.25)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-14px) scale(1.04)';
                e.currentTarget.style.boxShadow = `0 28px 56px rgba(0,0,0,0.5), 0 0 0 1.5px ${colors.gold}, 0 0 50px ${colors.gold}35, inset 0 1px 0 rgba(255,255,255,0.1)`;
                e.currentTarget.style.borderColor = colors.gold;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = `0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)`;
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.25)';
              }}
              >
                {/* Image */}
                <div style={{ position: 'relative', height: '190px', background: 'linear-gradient(180deg, #0a2410 0%, #051008 100%)', overflow: 'hidden' }}>
                  <img src={Array.isArray(product.images) && product.images[0] ? product.images[0] : product.image} alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', padding: '10px', boxSizing: 'border-box', display: 'block', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.75) 100%)' }} />
                  {/* Corner accent */}
                  <div style={{ position: 'absolute', top: 0, right: 0, width: '40px', height: '40px', background: `linear-gradient(225deg, ${colors.gold}40 0%, transparent 60%)`, borderBottomLeftRadius: '40px' }} />
                  <div style={{
                    position: 'absolute', top: '8px', left: '8px',
                    background: `linear-gradient(135deg, ${colors.gold} 0%, #b8860b 100%)`,
                    color: '#0a1f0f', padding: '2px 8px', borderRadius: '20px',
                    fontSize: '8px', fontWeight: '900', textTransform: 'uppercase',
                    letterSpacing: '1px', boxShadow: `0 2px 10px rgba(212,175,55,0.5)`
                  }}>{product.category}</div>
                  <h3 style={{
                    position: 'absolute', bottom: '8px', left: '8px', right: '8px',
                    color: colors.white, fontSize: '11px', fontWeight: '800',
                    margin: 0, fontFamily: 'Cinzel, Georgia, serif',
                    textShadow: '0 2px 10px rgba(0,0,0,1)', textAlign: 'center',
                    letterSpacing: '0.8px', lineHeight: '1.4'
                  }}>{product.name}</h3>
                </div>

                {/* Gold shimmer divider */}
                <div style={{ height: '1px', background: `linear-gradient(90deg, transparent 0%, ${colors.gold}80 30%, ${colors.gold} 50%, ${colors.gold}80 70%, transparent 100%)`, boxShadow: `0 0 8px ${colors.gold}60` }} />

                {/* Content */}
                <div style={{ padding: '10px 10px 12px' }}>
                  <Link to={`/products/${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${product._id || product.id}`} style={{ textDecoration: 'none' }}>
                    <button style={{
                      width: '100%',
                      background: `linear-gradient(135deg, ${colors.gold} 0%, #e8c547 50%, #b8860b 100%)`,
                      color: '#071a0d', border: 'none', padding: '8px 6px',
                      borderRadius: '10px', fontSize: '9px', fontWeight: '900',
                      cursor: 'pointer', transition: 'all 0.3s ease',
                      textTransform: 'uppercase', letterSpacing: '1.2px',
                      boxShadow: `0 4px 16px rgba(212,175,55,0.35), inset 0 1px 0 rgba(255,255,255,0.2)`
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = `linear-gradient(135deg, #f5d76e 0%, ${colors.gold} 100%)`;
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = `0 8px 24px rgba(212,175,55,0.55)`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = `linear-gradient(135deg, ${colors.gold} 0%, #e8c547 50%, #b8860b 100%)`;
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = `0 4px 16px rgba(212,175,55,0.35), inset 0 1px 0 rgba(255,255,255,0.2)`;
                    }}
                    >View Details ›</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {/* View All Button */}
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Link to="/products" style={{ textDecoration: 'none' }}>
              <button style={{
                background: `linear-gradient(135deg, ${colors.darkGreen}, ${colors.mediumGreen})`,
                color: colors.white,
                border: `3px solid ${colors.gold}`,
                padding: 'clamp(14px, 2vw, 18px) clamp(35px, 5vw, 55px)',
                fontSize: 'clamp(16px, 2.5vw, 20px)',
                fontWeight: '900',
                borderRadius: '50px',
                cursor: 'pointer',
                boxShadow: `0 8px 25px rgba(15,77,44,0.3)`,
                transition: 'all 0.4s ease',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontFamily: 'Cinzel, Georgia, serif'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px) scale(1.05)';
                e.target.style.boxShadow = `0 12px 35px rgba(212,175,55,0.5)`;
                e.target.style.background = `linear-gradient(135deg, ${colors.gold}, #e6c14a)`;
                e.target.style.color = colors.darkGreen;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = `0 8px 25px rgba(15,77,44,0.3)`;
                e.target.style.background = `linear-gradient(135deg, ${colors.darkGreen}, ${colors.mediumGreen})`;
                e.target.style.color = colors.white;
              }}
              >
                View All Products →
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
