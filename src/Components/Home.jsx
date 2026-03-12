import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

function Home() {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  
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

  const products = [
    {
      name: 'SONA MASOORI',
      description: 'Premium aromatic rice, light and fluffy when cooked',
      image: 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1773289305/g9_kdvfro.jpg',
      category: 'Rice',
      features: ['Aromatic', 'Low Starch', 'Premium Grade']
    },
    {
      name: 'BPT 5204',
      description: 'High-quality parboiled rice perfect for daily consumption',
      image: 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1773289305/g10_atwwuz.jpg',
      category: 'Rice',
      features: ['Parboiled', 'Nutritious', 'Easy to Cook']
    },
    {
      name: 'HMT RICE',
      description: 'Traditional favorite with superior taste and texture',
      image: 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1773289305/g8_eqnfcu.jpg',
      category: 'Rice',
      features: ['Traditional', 'Soft Texture', 'Rich Flavor']
    },
    {
      name: 'RNR 15048',
      description: 'Premium quality long grain rice with excellent cooking properties',
      image: 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1773289305/g11_fzss7c.jpg',
      category: 'Rice',
      features: ['Long Grain', 'High Quality', 'Best Aroma']
    },
    {
      name: 'Foxtail Millet',
      description: 'Nutritious and gluten-free ancient grain rich in fiber',
      image: 'https://naturechoice.in/eeghoacm/2022/07/Foxtail_millet-1.jpg',
      category: 'Millets',
      features: ['High Fiber', 'Gluten-Free', 'Iron Rich']
    },
    {
      name: 'Pearl Millet',
      description: 'Energy-rich millet perfect for healthy diet',
      image: 'https://5.imimg.com/data5/SELLER/Default/2024/3/398591092/MM/DW/NO/4351922/domestic-pearl-millet.jpg',
      category: 'Millets',
      features: ['Energy Rich', 'High Protein', 'Diabetic Friendly']
    },
    {
      name: 'Finger Millet',
      description: 'Calcium-rich superfood ideal for bone health',
      image: 'https://www.milletmaagicmeal.in/cdn/shop/articles/image1.webp?v=1729496969&width=1100',
      category: 'Millets',
      features: ['High Calcium', 'Superfood', 'Natural Coolant']
    },
    {
      name: 'Turmeric Powder',
      description: 'Pure and natural turmeric powder with high curcumin content',
      image: 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1773289305/g7_clxmr7.jpg',
      category: 'Spices',
      features: ['Pure & Natural', 'High Curcumin', 'Anti-inflammatory']
    },
    {
      name: 'Red Chilli Powder',
      description: 'Premium quality red chilli powder with perfect heat and color',
      image: 'https://5.imimg.com/data5/ANDROID/Default/2024/1/378418449/GQ/SN/UL/19256287/product-jpeg.jpg',
      category: 'Spices',
      features: ['Spicy & Hot', 'Rich Color', 'Premium Quality']
    },
    {
      name: 'Black Pepper',
      description: 'Premium quality whole black pepper with intense flavor',
      image: 'https://www.jalaramagri.com/wp-content/uploads/2025/06/Black-Papper-5.jpg',
      category: 'Spices',
      features: ['Whole Pepper', 'Intense Flavor', 'Premium Quality']
    }
  ];

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
              src='https://res.cloudinary.com/dgyykbmt6/image/upload/v1773131814/g1_l8mfz2.jpg'
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
            GLOBAL TRADE
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

      {/* Products Section */}
      <section style={{
        padding: 'clamp(60px, 10vw, 100px) 0',
        background: `linear-gradient(180deg, ${colors.background} 0%, #e8e8e8 100%)`,
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '100%', margin: '0 auto', padding: '0 clamp(20px, 5vw, 60px)' }}>
          <h2 style={{
            textAlign: 'center',
            color: colors.darkGreen,
            fontSize: 'clamp(36px, 6vw, 52px)',
            fontWeight: '900',
            marginBottom: '15px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontFamily: 'Cinzel, Georgia, serif',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}>
            Our Premium Products
          </h2>
          <p style={{
            textAlign: 'center',
            color: colors.mediumGreen,
            fontSize: 'clamp(16px, 3vw, 20px)',
            marginBottom: '40px',
            fontFamily: 'Playfair Display, Georgia, serif',
            fontStyle: 'italic'
          }}>
            Rice, Millets & Authentic Spices
          </p>
          <div style={{
            width: '150px',
            height: '5px',
            background: `linear-gradient(90deg, ${colors.gold}, ${colors.mediumGreen}, ${colors.gold})`,
            margin: '0 auto 60px',
            borderRadius: '3px',
            boxShadow: `0 0 20px ${colors.gold}60`
          }}></div>

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
            {[...products, ...products].map((product, index) => (
              <div key={index} style={{
                minWidth: 'clamp(260px, 30vw, 320px)',
                backgroundColor: colors.white,
                borderRadius: '20px',
                padding: '35px',
                boxShadow: `0 10px 30px rgba(0,0,0,0.1), 0 0 0 3px ${colors.gold}20, 0 0 20px ${colors.gold}10`,
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                border: `3px solid ${colors.gold}40`,
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-15px) scale(1.03)';
                e.currentTarget.style.boxShadow = `0 20px 50px rgba(15,77,44,0.25), 0 0 0 5px ${colors.gold}, 0 0 40px ${colors.gold}80`;
                e.currentTarget.style.borderColor = colors.gold;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = `0 10px 30px rgba(0,0,0,0.1), 0 0 0 3px ${colors.gold}20, 0 0 20px ${colors.gold}10`;
                e.currentTarget.style.borderColor = `${colors.gold}40`;
              }}
              >
                {/* Category Badge */}
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  backgroundColor: colors.gold,
                  color: colors.darkGreen,
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: '900',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  boxShadow: '0 3px 10px rgba(0,0,0,0.2)'
                }}>
                  {product.category}
                </div>
                
                <img 
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '15px',
                    marginBottom: '20px',
                    marginTop: '20px'
                  }}
                />
                <h3 style={{
                  color: colors.darkGreen,
                  fontSize: 'clamp(20px, 3vw, 24px)',
                  fontWeight: '900',
                  marginBottom: '15px',
                  textAlign: 'center',
                  fontFamily: 'Cinzel, Georgia, serif'
                }}>
                  {product.name}
                </h3>
                <p style={{
                  color: '#666',
                  fontSize: 'clamp(14px, 2vw, 16px)',
                  lineHeight: '1.6',
                  marginBottom: '20px',
                  textAlign: 'center',
                  minHeight: '50px'
                }}>
                  {product.description}
                </p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                  justifyContent: 'center',
                  marginTop: '20px'
                }}>
                  {product.features.map((feature, idx) => (
                    <span key={idx} style={{
                      backgroundColor: `${colors.mediumGreen}15`,
                      color: colors.mediumGreen,
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: '700',
                      border: `1px solid ${colors.mediumGreen}30`
                    }}>
                      ✓ {feature}
                    </span>
                  ))}
                </div>
                <Link to="/products" style={{ textDecoration: 'none' }}>
                  <button style={{
                    width: '100%',
                    marginTop: '25px',
                    background: `linear-gradient(135deg, ${colors.mediumGreen}, ${colors.darkGreen})`,
                    color: colors.white,
                    border: 'none',
                    padding: '14px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '900',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    boxShadow: '0 4px 15px rgba(15,77,44,0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = `linear-gradient(135deg, ${colors.gold}, #e6c14a)`;
                    e.target.style.color = colors.darkGreen;
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(212,175,55,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = `linear-gradient(135deg, ${colors.mediumGreen}, ${colors.darkGreen})`;
                    e.target.style.color = colors.white;
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(15,77,44,0.3)';
                  }}
                  >
                    View Details
                  </button>
                </Link>
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
