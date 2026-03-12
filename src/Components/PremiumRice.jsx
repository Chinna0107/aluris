function PremiumRice() {
  const colors = {
    darkGreen: '#0f4d2c',
    deepGreen: '#1b5e3c',
    mediumGreen: '#1b6b3d',
    gold: '#d4af37',
    cream: '#f3eadc',
    textDark: '#333',
    white: '#ffffff',
    background: '#f5f5f5'
  };

  return (
    <div className="about-container" style={{
      width: '100%',
      paddingTop: '110px',
      backgroundColor: colors.background
    }}>
      <style>{`
        @media (max-width: 768px) {
          body {
            margin-top: 0 !important;
          }
          .about-container {
            padding-top: 80px !important;
          }
        }
        @media (max-width: 600px) {
          .proprietor-card {
            padding: 30px 15px !important;
          }
          .proprietor-card h3 {
            font-size: 24px !important;
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
          }
          .proprietor-card > div {
            padding: 20px 15px !important;
          }
        }
      `}</style>
      
      {/* Hero Section */}
      <section style={{
        backgroundImage: 'url(https://res.cloudinary.com/dgyykbmt6/image/upload/v1773291962/g21_jmpmga.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: 'calc(100vh - 80px)',
        width: '100%'
      }}>
      </section>

      {/* Logo Section */}
      {/* Removed logo and company name section */}

      {/* Our Story Section - Content Left, Image Right */}
      <section style={{
        padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5vw, 60px)',
        backgroundColor: colors.cream,
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
          gap: 'clamp(30px, 5vw, 60px)',
          alignItems: 'center'
        }}>
          {/* Left - Content */}
          <div>
            <h2 style={{
              color: colors.darkGreen,
              fontSize: 'clamp(32px, 6vw, 48px)',
              fontWeight: '900',
              marginBottom: '30px',
              fontFamily: 'Georgia, serif',
              letterSpacing: '2px'
            }}>
              Our Story
            </h2>
            <div style={{
              width: '100px',
              height: '5px',
              background: `linear-gradient(90deg, ${colors.gold}, ${colors.mediumGreen})`,
              marginBottom: '30px',
              borderRadius: '3px'
            }}></div>
            <p style={{
              color: colors.textDark,
              fontSize: '20px',
              lineHeight: '2',
              marginBottom: '25px',
              fontWeight: '500'
            }}>
              <strong style={{ color: colors.gold, fontSize: '22px' }}>ALURI'S GLOBAL TRADE</strong> is a premium supplier of rice, millets, and spices based in <strong>Visakhapatnam, India</strong>.
            </p>
            <p style={{
              color: colors.textDark,
              fontSize: '19px',
              lineHeight: '2',
              fontWeight: '500'
            }}>
              We specialize in providing high-quality rice, nutritious millets, and authentic spices directly from mills to buyers without middlemen. Our commitment to quality and direct sourcing ensures the best prices and freshest products for our customers.
            </p>
            <div style={{
              marginTop: '35px',
              padding: '25px',
              background: `linear-gradient(135deg, ${colors.white}, ${colors.cream})`,
              borderRadius: '15px',
              borderLeft: `5px solid ${colors.gold}`
            }}>
              <p style={{
                color: colors.mediumGreen,
                fontSize: '18px',
                fontWeight: '700',
                margin: 0
              }}>
                🌾 Premium Rice: Sona Masoori, BPT 5204, HMT Rice, RNR 15048<br/>
                🌾 Nutritious Millets: Foxtail, Pearl, Finger, Sorghum & More<br/>
                🌶️ Authentic Spices: Turmeric, Chilli, Coriander, Cumin & More
              </p>
            </div>
          </div>

          {/* Right - Image */}
          <div>
            <img 
              src="https://res.cloudinary.com/dgyykbmt6/image/upload/v1773292505/g23_be011k.jpg"
              alt="Premium Rice"
              style={{
                width: '100%',
                borderRadius: '20px',
                boxShadow: `0 15px 50px rgba(0,0,0,0.2), 0 0 0 5px ${colors.gold}40, 0 0 30px ${colors.gold}30`,
                border: `5px solid ${colors.gold}`,
                transition: 'all 0.4s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = `0 25px 70px rgba(0,0,0,0.3), 0 0 0 8px ${colors.gold}, 0 0 50px ${colors.gold}`;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = `0 15px 50px rgba(0,0,0,0.2), 0 0 0 5px ${colors.gold}40, 0 0 30px ${colors.gold}30`;
              }}
            />
          </div>
        </div>
      </section>

      {/* Leadership Section - Image Left, Content Right */}
      <section style={{
        padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5vw, 60px)',
        backgroundColor: colors.white,
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
          gap: 'clamp(30px, 5vw, 60px)',
          alignItems: 'center'
        }}>
          {/* Left - Image */}
          <div style={{ order: window.innerWidth < 900 ? 2 : 1 }}>
            <div className="proprietor-card" style={{
              background: `linear-gradient(135deg, ${colors.darkGreen}20, ${colors.gold}20)`,
              padding: '50px',
              borderRadius: '20px',
              textAlign: 'center',
              boxShadow: `0 15px 50px rgba(0,0,0,0.15), 0 0 0 5px ${colors.gold}40, 0 0 30px ${colors.gold}20`,
              border: `5px solid ${colors.gold}`,
              transition: 'all 0.4s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = `0 25px 70px rgba(0,0,0,0.25), 0 0 0 8px ${colors.gold}, 0 0 50px ${colors.gold}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = `0 15px 50px rgba(0,0,0,0.15), 0 0 0 5px ${colors.gold}40, 0 0 30px ${colors.gold}20`;
            }}
            >
              <div style={{
                fontSize: '120px',
                marginBottom: '20px'
              }}>👤</div>
              <div style={{
                backgroundColor: colors.white,
                padding: '30px',
                borderRadius: '15px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
              }}>
                <p style={{
                  color: colors.mediumGreen,
                  fontSize: '18px',
                  fontWeight: '700',
                  marginBottom: '12px'
                }}>Proprietor</p>
                <h3 style={{
                  color: colors.darkGreen,
                  fontSize: '32px',
                  fontWeight: '900',
                  marginBottom: '12px',
                  fontFamily: 'Georgia, serif'
                }}>M ANNAPURNAMMA</h3>
                <p style={{
                  color: colors.gold,
                  fontSize: '20px',
                  fontWeight: '700',
                  letterSpacing: '1px'
                }}>M.Com, LLB</p>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div style={{ order: window.innerWidth < 900 ? 1 : 2 }}>
            <h2 style={{
              color: colors.darkGreen,
              fontSize: 'clamp(32px, 6vw, 48px)',
              fontWeight: '900',
              marginBottom: '30px',
              fontFamily: 'Georgia, serif',
              letterSpacing: '2px'
            }}>
              Leadership
            </h2>
            <div style={{
              width: '100px',
              height: '5px',
              background: `linear-gradient(90deg, ${colors.gold}, ${colors.mediumGreen})`,
              marginBottom: '30px',
              borderRadius: '3px'
            }}></div>
            <p style={{
              color: colors.textDark,
              fontSize: '20px',
              lineHeight: '2',
              marginBottom: '25px',
              fontWeight: '500'
            }}>
              Under the expert leadership of <strong style={{ color: colors.darkGreen }}>M ANNAPURNAMMA</strong>, our company has established itself as a trusted name in the agricultural trading industry.
            </p>
            <p style={{
              color: colors.textDark,
              fontSize: '19px',
              lineHeight: '2',
              marginBottom: '25px',
              fontWeight: '500'
            }}>
              With qualifications in <strong>M.Com</strong> and <strong>LLB</strong>, she brings both business acumen and legal expertise to ensure transparent and ethical trading practices for rice, millets, and spices.
            </p>
            <div style={{
              marginTop: '35px',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}>
              <div style={{
                padding: '20px',
                background: `linear-gradient(135deg, ${colors.cream}, ${colors.white})`,
                borderRadius: '12px',
                borderLeft: `5px solid ${colors.mediumGreen}`,
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}>
                <span style={{ fontSize: '30px' }}>📞</span>
                <div>
                  <p style={{ margin: 0, color: colors.textDark, fontSize: '16px', fontWeight: '600' }}>Contact</p>
                  <p style={{ margin: 0, color: colors.mediumGreen, fontSize: '22px', fontWeight: '900' }}>80743 46568</p>
                </div>
              </div>
              <div style={{
                padding: '20px',
                background: `linear-gradient(135deg, ${colors.cream}, ${colors.white})`,
                borderRadius: '12px',
                borderLeft: `5px solid ${colors.mediumGreen}`,
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}>
                <span style={{ fontSize: '30px' }}>📍</span>
                <div>
                  <p style={{ margin: 0, color: colors.textDark, fontSize: '16px', fontWeight: '600' }}>Location</p>
                  <p style={{ margin: 0, color: colors.mediumGreen, fontSize: '20px', fontWeight: '700' }}>Visakhapatnam, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section style={{
        padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5vw, 60px)',
        backgroundColor: colors.cream,
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            color: colors.darkGreen,
            fontSize: 'clamp(32px, 6vw, 48px)',
            fontWeight: '900',
            marginBottom: '20px',
            letterSpacing: '2px',
            fontFamily: 'Georgia, serif'
          }}>
            Why Choose Us?
          </h2>
          <div style={{
            width: '120px',
            height: '5px',
            background: `linear-gradient(90deg, ${colors.gold}, ${colors.mediumGreen})`,
            margin: '0 auto 60px',
            borderRadius: '3px'
          }}></div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px',
            marginTop: '50px'
          }}>
            {[
              { 
                title: 'Premium Quality Products', 
                desc: 'High-quality rice, nutritious millets, and authentic spices sourced directly from trusted mills with strict quality control', 
                image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop'
              },
              { 
                title: 'Direct Mill Supply', 
                desc: 'No middlemen involved, ensuring best prices and maximum freshness for customers', 
                image: 'https://i.ytimg.com/vi/WbVPUIXqiLE/sddefault.jpg'
              },
              { 
                title: 'Trusted Service', 
                desc: 'Years of experience in rice trading with a reputation for reliability and integrity', 
                image: 'https://content.jdmagicbox.com/comp/def_content/rice-mills/maxresdefault-rice-mills-7-dpeie.jpg'
              },
              { 
                title: 'Quality Assurance', 
                desc: 'Every batch rigorously tested to meet the highest purity and quality standards', 
                image: 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1773289306/g13_yillze.jpg'
              }
            ].map((item, index) => (
              <div key={index} style={{
                backgroundColor: colors.white,
                borderRadius: '20px',
                border: `4px solid ${colors.gold}40`,
                boxShadow: `0 10px 30px rgba(0,0,0,0.1), 0 0 0 3px ${colors.gold}20, 0 0 20px ${colors.gold}10`,
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                overflow: 'hidden',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-15px) scale(1.03)';
                e.currentTarget.style.borderColor = colors.gold;
                e.currentTarget.style.boxShadow = `0 25px 60px rgba(15,77,44,0.25), 0 0 0 6px ${colors.gold}, 0 0 50px ${colors.gold}80`;
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = `${colors.gold}40`;
                e.currentTarget.style.boxShadow = `0 10px 30px rgba(0,0,0,0.1), 0 0 0 3px ${colors.gold}20, 0 0 20px ${colors.gold}10`;
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1)';
              }}
              >
                <img 
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '220px',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                />
                <div style={{ padding: '30px' }}>
                  <h3 style={{
                    color: colors.darkGreen,
                    fontSize: '26px',
                    fontWeight: '900',
                    marginBottom: '18px',
                    fontFamily: 'Georgia, serif'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    color: colors.textDark,
                    fontSize: '17px',
                    lineHeight: '1.8',
                    fontWeight: '500'
                  }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5vw, 60px)',
        background: `linear-gradient(135deg, ${colors.darkGreen} 0%, ${colors.deepGreen} 100%)`,
        textAlign: 'center',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{
            color: colors.gold,
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: '900',
            marginBottom: '25px',
            fontFamily: 'Georgia, serif',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            Ready to Order Premium Products?
          </h2>
          <p style={{
            color: colors.white,
            fontSize: '20px',
            marginBottom: '40px',
            lineHeight: '1.8'
          }}>
            Contact us today for the best quality rice, millets, and spices at competitive prices
          </p>
          <a href="tel:8074346568" style={{
            background: `linear-gradient(135deg, ${colors.gold} 0%, #e6c14a 100%)`,
            color: colors.darkGreen,
            padding: '20px 50px',
            fontSize: '20px',
            fontWeight: '900',
            borderRadius: '50px',
            textDecoration: 'none',
            boxShadow: '0 8px 25px rgba(212,175,55,0.4)',
            transition: 'all 0.3s ease',
            display: 'inline-block',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-5px) scale(1.05)';
            e.target.style.boxShadow = '0 12px 35px rgba(212,175,55,0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = '0 8px 25px rgba(212,175,55,0.4)';
          }}
          >
            📞 Call Now: 80743 46568
          </a>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/919848930313"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          backgroundColor: '#25D366',
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(37,211,102,0.5)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          textDecoration: 'none',
          zIndex: 1000
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.15)';
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(37,211,102,0.7)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(37,211,102,0.5)';
        }}
      >
        <svg 
          width="38" 
          height="38" 
          viewBox="0 0 24 24" 
          fill="white"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}

export default PremiumRice;
