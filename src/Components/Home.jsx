import { Link } from 'react-router-dom';

function Home() {
  const colors = {
    darkGreen: '#0f4d2c',
    mediumGreen: '#1b6b3d',
    gold: '#d4af37',
    white: '#ffffff',
    background: '#f5f5f5'
  };

  const products = [
    {
      name: 'Sona Masoori Rice',
      description: 'Premium quality aromatic rice, perfect for daily meals',
      image: '🌾',
      features: ['Light & Fluffy', 'Low Starch', 'Aromatic']
    },
    {
      name: 'BPT 5204 Rice',
      description: 'High-quality parboiled rice with excellent taste',
      image: '🍚',
      features: ['Parboiled rice', 'Nutritious', 'Long Grain']
    },
    {
      name: 'HMT Rice',
      description: 'Traditional favorite with superior cooking quality',
      image: '🌾',
      features: ['Premium Grade', 'Soft Texture', 'Rich Aroma']
    },
    {
      name: 'RNR 15048 Rice',
      description: 'Specially selected variety for authentic taste',
      image: '🍚',
      features: ['High Yield', 'Quality Grain', 'Best Value']
    }
  ];

  return (
    <div style={{ width: '100%', paddingTop: '110px' }}>
      {/* Hero Section */}
      <section style={{
        background: `linear-gradient(135deg, ${colors.darkGreen}dd 0%, ${colors.mediumGreen}dd 100%), url('https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1200') center/cover`,
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(30px, 5vw, 60px)',
        textAlign: 'center',
        position: 'relative',
        boxShadow: 'inset 0 0 100px rgba(0,0,0,0.3)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        boxSizing: 'border-box'
      }}>
        <div style={{ maxWidth: '900px', zIndex: 1 }}>
          <h2 style={{
            color: colors.white,
            fontSize: 'clamp(32px, 6vw, 52px)',
            fontWeight: '900',
            marginBottom: '25px',
            textShadow: '3px 3px 6px rgba(0,0,0,0.5)',
            letterSpacing: '2px'
          }}>
            🌾 Premium Quality Rice
          </h2>
          <p style={{
            color: colors.gold,
            fontSize: 'clamp(18px, 4vw, 24px)',
            fontWeight: '600',
            marginBottom: '35px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            lineHeight: '1.6'
          }}>
            From Our Fields to Your Home - Experience the Finest Rice Varieties from Visakhapatnam
          </p>
          <Link to="/quote" style={{ textDecoration: 'none' }}>
            <button style={{
              background: `linear-gradient(135deg, ${colors.gold} 0%, #e6c14a 100%)`,
              color: colors.darkGreen,
              border: `3px solid ${colors.white}`,
              padding: '18px 45px',
              fontSize: '20px',
              fontWeight: '900',
              borderRadius: '12px',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '1.5px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px) scale(1.05)';
              e.target.style.boxShadow = '0 10px 30px rgba(212,175,55,0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
            }}
            >
              📞 Contact Us Now
            </button>
          </Link>
        </div>
      </section>

      {/* Products Section */}
      <section style={{
        padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5vw, 60px)',
        backgroundColor: colors.background,
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            color: colors.darkGreen,
            fontSize: '42px',
            fontWeight: '900',
            marginBottom: '20px',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            Our Premium Products
          </h2>
          <div style={{
            width: '100px',
            height: '4px',
            background: `linear-gradient(90deg, ${colors.gold}, ${colors.mediumGreen})`,
            margin: '0 auto 50px',
            borderRadius: '2px'
          }}></div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '35px',
            marginTop: '40px'
          }}>
            {products.map((product, index) => (
              <div key={index} style={{
                backgroundColor: colors.white,
                borderRadius: '16px',
                padding: '35px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                border: `2px solid transparent`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(15,77,44,0.2)';
                e.currentTarget.style.borderColor = colors.gold;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                e.currentTarget.style.borderColor = 'transparent';
              }}
              >
                <div style={{
                  fontSize: '80px',
                  textAlign: 'center',
                  marginBottom: '20px'
                }}>
                  {product.image}
                </div>
                <h3 style={{
                  color: colors.darkGreen,
                  fontSize: '24px',
                  fontWeight: '900',
                  marginBottom: '15px',
                  textAlign: 'center'
                }}>
                  {product.name}
                </h3>
                <p style={{
                  color: '#666',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  marginBottom: '20px',
                  textAlign: 'center'
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
                <Link to="/quote" style={{ textDecoration: 'none' }}>
                  <button style={{
                    width: '100%',
                    marginTop: '25px',
                    background: `linear-gradient(135deg, ${colors.mediumGreen}, ${colors.darkGreen})`,
                    color: colors.white,
                    border: 'none',
                    padding: '14px',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: '900',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = `linear-gradient(135deg, ${colors.gold}, #e6c14a)`;
                    e.target.style.color = colors.darkGreen;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = `linear-gradient(135deg, ${colors.mediumGreen}, ${colors.darkGreen})`;
                    e.target.style.color = colors.white;
                  }}
                  >
                    Get Quote
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
