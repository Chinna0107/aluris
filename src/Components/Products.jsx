import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Products() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedQuantities, setSelectedQuantities] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
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

  const products = {
    rice: [
      {
        name: 'RNR 15048',
        description: 'Premium quality long grain rice with excellent cooking properties',
        image: 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1773289305/g11_fzss7c.jpg',
        features: ['Long Grain', 'High Quality', 'Best Aroma'],
        quantities: [
          { weight: '25 kg', price: '₹1,200' },
          { weight: '50 kg', price: '₹2,300' },
          { weight: '100 kg', price: '₹4,500' }
        ]
      },
      {
        name: 'BPT 5204',
        description: 'High-quality parboiled rice perfect for daily consumption',
        image: 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1773289305/g10_atwwuz.jpg',
        features: ['Parboiled rice', 'Nutritious', 'Easy to Cook'],
        quantities: [
          { weight: '25 kg', price: '₹1,100' },
          { weight: '50 kg', price: '₹2,100' },
          { weight: '100 kg', price: '₹4,000' }
        ]
      },
      {
        name: 'SONA MASOORI',
        description: 'Premium aromatic rice, light and fluffy when cooked',
        image: 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1773289305/g9_kdvfro.jpg',
        features: ['Aromatic', 'Low Starch', 'Premium Grade'],
        quantities: [
          { weight: '25 kg', price: '₹1,350' },
          { weight: '50 kg', price: '₹2,600' },
          { weight: '100 kg', price: '₹5,000' }
        ]
      },
      {
        name: 'HMT RICE',
        description: 'Traditional favorite with superior taste and texture',
        image: 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1773289305/g8_eqnfcu.jpg',
        features: ['Traditional', 'Soft Texture', 'Rich Flavor'],
        quantities: [
          { weight: '25 kg', price: '₹1,250' },
          { weight: '50 kg', price: '₹2,400' },
          { weight: '100 kg', price: '₹4,700' }
        ]
      }
    ],
    spices: [
      {
        name: 'Turmeric Powder',
        description: 'Pure and natural turmeric powder with high curcumin content',
        image: 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1773289305/g7_clxmr7.jpg',
        features: ['Pure & Natural', 'High Curcumin', 'Anti-inflammatory'],
        quantities: [
          { weight: '100 g', price: '₹50' },
          { weight: '500 g', price: '₹220' },
          { weight: '1 kg', price: '₹400' }
        ]
      },
      {
        name: 'Red Chilli Powder',
        description: 'Premium quality red chilli powder with perfect heat and color',
        image: 'https://5.imimg.com/data5/ANDROID/Default/2024/1/378418449/GQ/SN/UL/19256287/product-jpeg.jpg',
        features: ['Spicy & Hot', 'Rich Color', 'Premium Quality'],
        quantities: [
          { weight: '100 g', price: '₹60' },
          { weight: '500 g', price: '₹270' },
          { weight: '1 kg', price: '₹500' }
        ]
      },
      {
        name: 'Coriander Powder',
        description: 'Aromatic coriander powder ground from premium quality seeds',
        image: 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1773289304/g5_woar2u.jpg',
        features: ['Aromatic', 'Fresh Ground', 'Pure Quality'],
        quantities: [
          { weight: '100 g', price: '₹45' },
          { weight: '500 g', price: '₹200' },
          { weight: '1 kg', price: '₹380' }
        ]
      },
      {
        name: 'Jeera Powder',
        description: 'Premium whole Jeera  powder from the best cumin seeds for authentic flavor',
        image: 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1773289304/g4_kbzzjl.jpg',
        features: ['Whole Seeds', 'Strong Aroma', 'Premium Grade'],
        quantities: [
          { weight: '100 g', price: '₹70' },
          { weight: '500 g', price: '₹320' },
          { weight: '1 kg', price: '₹600' }
        ]
      },
      {
        name: 'Garam Masala',
        description: 'Traditional blend of aromatic spices for authentic Indian flavor',
        image: 'https://www.shutterstock.com/image-photo/garam-masala-spices-indian-curry-260nw-2521904937.jpg',
        features: ['Authentic Blend', 'Aromatic', 'Traditional Recipe'],
        quantities: [
          { weight: '50 g', price: '₹60' },
          { weight: '100 g', price: '₹110' },
          { weight: '250 g', price: '₹250' }
        ]
      },
      {
        name: 'Black Pepper',
        description: 'Premium quality whole black pepper with intense flavor',
        image: 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1773289304/g2_ggjqxh.jpg',
        features: ['Whole Pepper', 'Intense Flavor', 'Premium Quality'],
        quantities: [
          { weight: '100 g', price: '₹120' },
          { weight: '250 g', price: '₹280' },
          { weight: '500 g', price: '₹530' }
        ]
      }
    ],
    millets: [
      {
        name: 'Foxtail Millet (Kangni)',
        description: 'Nutritious and gluten-free ancient grain rich in fiber',
        image: 'https://naturechoice.in/eeghoacm/2022/07/Foxtail_millet-1.jpg',
        features: ['High Fiber', 'Gluten-Free', 'Rich in Iron'],
        quantities: [
          { weight: '1 kg', price: '₹120' },
          { weight: '5 kg', price: '₹550' },
          { weight: '10 kg', price: '₹1,000' }
        ]
      },
      {
        name: 'Pearl Millet (Bajra)',
        description: 'Energy-rich millet perfect for healthy diet',
        image: 'https://5.imimg.com/data5/SELLER/Default/2024/3/398591092/MM/DW/NO/4351922/domestic-pearl-millet.jpg',
        features: ['Energy Rich', 'High Protein', 'Diabetic Friendly'],
        quantities: [
          { weight: '1 kg', price: '₹100' },
          { weight: '5 kg', price: '₹450' },
          { weight: '10 kg', price: '₹850' }
        ]
      },
      {
        name: 'Finger Millet (Ragi)',
        description: 'Calcium-rich superfood ideal for bone health',
        image: 'https://www.milletmaagicmeal.in/cdn/shop/articles/image1.webp?v=1729496969&width=1100',
        features: ['High Calcium', 'Superfood', 'Natural Coolant'],
        quantities: [
          { weight: '1 kg', price: '₹110' },
          { weight: '5 kg', price: '₹500' },
          { weight: '10 kg', price: '₹950' }
        ]
      },
      {
        name: 'Sorghum (Jowar)',
        description: 'Versatile grain packed with antioxidants and nutrients',
        image: 'https://jallikatt.in/wp-content/uploads/2023/02/Cholam--scaled.jpg',
        features: ['Antioxidants', 'Gluten-Free', 'Heart Healthy'],
        quantities: [
          { weight: '1 kg', price: '₹95' },
          { weight: '5 kg', price: '₹425' },
          { weight: '10 kg', price: '₹800' }
        ]
      },
      {
        name: 'Proso Millet',
        description: 'Quick-cooking millet with mild flavor and high nutrition',
        image: 'https://nuttyyogi.com/cdn/shop/products/Proso_Millet__DSC5342.jpg?v=1606373494',
        features: ['Quick Cook', 'Mild Flavor', 'High Protein'],
        quantities: [
          { weight: '1 kg', price: '₹125' },
          { weight: '5 kg', price: '₹575' },
          { weight: '10 kg', price: '₹1,100' }
        ]
      },
      {
        name: 'Little Millet (Kutki)',
        description: 'Small grain packed with vitamins and minerals',
        image: 'https://dhatuorganics.com/wp-content/uploads/2024/09/Stock-Iamges-04.jpg',
        features: ['Vitamin Rich', 'Low GI', 'Easy Digest'],
        quantities: [
          { weight: '1 kg', price: '₹130' },
          { weight: '5 kg', price: '₹600' },
          { weight: '10 kg', price: '₹1,150' }
        ]
      },
      {
        name: 'Kodo Millet',
        description: 'Nutritious grain excellent for weight management',
        image: 'https://www.puremart.in/images/products/323-kodo-millet-500-gms-pack-of-250-gm-x-2-1600771999.jpeg',
        features: ['Weight Loss', 'High Fiber', 'Low Fat'],
        quantities: [
          { weight: '1 kg', price: '₹135' },
          { weight: '5 kg', price: '₹625' },
          { weight: '10 kg', price: '₹1,200' }
        ]
      },
      {
        name: 'Barnyard Millet (Sanwa)',
        description: 'Fast-growing millet ideal for fasting and healthy eating',
        image: 'https://nuttyyogi.com/cdn/shop/products/Barnyard_Millet_DSC5318.jpg?v=1606373486',
        features: ['Fasting Food', 'Low Calorie', 'Iron Rich'],
        quantities: [
          { weight: '1 kg', price: '₹140' },
          { weight: '5 kg', price: '₹650' },
          { weight: '10 kg', price: '₹1,250' }
        ]
      }
    ]
  };

  const allProducts = [...products.rice, ...products.millets, ...products.spices];
  const displayProducts = activeCategory === 'all' ? allProducts : products[activeCategory];

  return (
    <div style={{
      width: '100%',
      paddingTop: '80px',
      backgroundColor: colors.background,
      minHeight: '100vh'
    }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @media (max-width: 768px) {
          div[style*="paddingTop: '110px'"] {
            padding-top: 0 !important;
          }
          .product-card {
            grid-template-columns: 1fr !important;
          }
          .product-card img {
            height: 200px !important;
            min-height: 200px !important;
          }
        }
        @media (min-width: 1024px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .product-card {
            grid-template-columns: 1fr !important;
          }
          .product-card img {
            height: 350px !important;
            min-height: 350px !important;
          }
        }
      `}</style>
      {/* Logo Section */}
      <section style={{
        padding: 'clamp(30px, 5vw, 50px) clamp(20px, 5vw, 60px) clamp(20px, 3vw, 30px)',
        backgroundColor: colors.white,
        textAlign: 'center'
      }}>
        <div style={{
          display: 'inline-block',
          position: 'relative'
        }}>
          <img 
            src='https://res.cloudinary.com/dgyykbmt6/image/upload/v1773131814/g1_l8mfz2.jpg'
            alt="Aluri's Global Trade Logo"
            style={{
              width: 'clamp(120px, 30vw, 180px)',
              height: 'clamp(120px, 30vw, 180px)',
              objectFit: 'cover',
              borderRadius: '20px',
              boxShadow: `0 10px 40px rgba(0,0,0,0.15), 0 0 0 5px ${colors.gold}, 0 0 20px ${colors.gold}80`,
              border: `5px solid ${colors.gold}`,
              marginBottom: '20px',
              transition: 'all 0.4s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1) rotate(5deg)';
              e.target.style.boxShadow = `0 20px 60px rgba(0,0,0,0.25), 0 0 0 8px ${colors.gold}, 0 0 40px ${colors.gold}`;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1) rotate(0deg)';
              e.target.style.boxShadow = `0 10px 40px rgba(0,0,0,0.15), 0 0 0 5px ${colors.gold}, 0 0 20px ${colors.gold}80`;
            }}
          />
        </div>
        <h1 style={{
          color: colors.gold,
          fontSize: 'clamp(28px, 6vw, 48px)',
          fontWeight: '900',
          letterSpacing: '3px',
          fontFamily: '"Cinzel", serif',
          marginBottom: '8px'
        }}>
          ALURI'S GLOBAL TRADE
        </h1>
        <p style={{
          color: colors.darkGreen,
          fontSize: '20px',
          fontWeight: '600',
          letterSpacing: '2px'
        }}>
          Premium Quality
        </p>
      </section>

      {/* Hero Section */}
      {/* <section style={{
        background: `linear-gradient(135deg, ${colors.darkGreen}f0 0%, ${colors.deepGreen}f0 100%), url('https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1600') center/cover`,
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(40px, 6vw, 80px) clamp(20px, 5vw, 60px)',
        textAlign: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: 'inset 0 0 100px rgba(0,0,0,0.4)',
        animation: 'fadeIn 0.8s ease-in'
      }}>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          @media (max-width: 768px) {
            .product-card {
              grid-template-columns: 1fr !important;
            }
            .product-card img {
              height: 240px !important;
              min-height: 240px !important;
            }
          }
        `}</style>
        <div style={{ maxWidth: '900px', zIndex: 1, animation: 'slideUp 1s ease-out' }}>
          <p style={{
            color: colors.white,
            fontSize: 'clamp(18px, 4vw, 24px)',
            fontWeight: '600',
            textShadow: '2px 2px 6px rgba(0,0,0,0.5)',
            lineHeight: '1.6'
          }}>
            Quality Rice & Millets Directly from Mills
          </p>
        </div>
      </section> */}

      {/* Category Tabs */}
      <section style={{
        padding: 'clamp(20px, 4vw, 40px) clamp(20px, 5vw, 60px) 0',
        backgroundColor: colors.white,
        animation: 'fadeIn 1.2s ease-in'
      }}>
        <style>{`
          @media (min-width: 1024px) {
            .category-buttons {
              justify-content: center !important;
            }
          }
        `}</style>
        <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
          <div className="category-buttons" style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-start',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            marginBottom: '30px',
            padding: '10px 5px',
            scrollbarWidth: 'thin',
            scrollbarColor: `${colors.gold} ${colors.cream}`,
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: '-ms-autohiding-scrollbar'
          }}>
            <button
              onClick={() => setActiveCategory('all')}
              style={{
                background: activeCategory === 'all' 
                  ? `linear-gradient(135deg, ${colors.darkGreen}, ${colors.mediumGreen})`
                  : `linear-gradient(135deg, ${colors.white}, ${colors.cream})`,
                color: activeCategory === 'all' ? colors.white : colors.darkGreen,
                border: `3px solid ${activeCategory === 'all' ? colors.gold : colors.mediumGreen}`,
                padding: 'clamp(10px, 2vw, 14px) clamp(20px, 4vw, 32px)',
                fontSize: 'clamp(12px, 2.5vw, 16px)',
                fontWeight: '900',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: activeCategory === 'all' 
                  ? `0 8px 25px rgba(15,77,44,0.4), 0 0 30px ${colors.gold}60, inset 0 2px 10px rgba(255,255,255,0.2)`
                  : '0 4px 15px rgba(0,0,0,0.12)',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                fontFamily: '"Cinzel", Georgia, serif',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== 'all') {
                  e.target.style.transform = 'translateY(-3px) scale(1.05)';
                  e.target.style.boxShadow = `0 8px 25px rgba(0,0,0,0.2), 0 0 20px ${colors.gold}40`;
                  e.target.style.borderColor = colors.gold;
                  e.target.style.background = `linear-gradient(135deg, ${colors.cream}, ${colors.white})`;
                } else {
                  e.target.style.transform = 'translateY(-3px) scale(1.05)';
                  e.target.style.boxShadow = `0 12px 35px rgba(15,77,44,0.5), 0 0 40px ${colors.gold}80`;
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== 'all') {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.12)';
                  e.target.style.borderColor = colors.mediumGreen;
                  e.target.style.background = `linear-gradient(135deg, ${colors.white}, ${colors.cream})`;
                } else {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = `0 8px 25px rgba(15,77,44,0.4), 0 0 30px ${colors.gold}60, inset 0 2px 10px rgba(255,255,255,0.2)`;
                }
              }}
            >
              All
            </button>
            <button
              onClick={() => setActiveCategory('rice')}
              style={{
                background: activeCategory === 'rice' 
                  ? `linear-gradient(135deg, ${colors.darkGreen}, ${colors.mediumGreen})`
                  : `linear-gradient(135deg, ${colors.white}, ${colors.cream})`,
                color: activeCategory === 'rice' ? colors.white : colors.darkGreen,
                border: `3px solid ${activeCategory === 'rice' ? colors.gold : colors.mediumGreen}`,
                padding: 'clamp(10px, 2vw, 14px) clamp(20px, 4vw, 32px)',
                fontSize: 'clamp(12px, 2.5vw, 16px)',
                fontWeight: '900',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: activeCategory === 'rice' 
                  ? `0 8px 25px rgba(15,77,44,0.4), 0 0 30px ${colors.gold}60, inset 0 2px 10px rgba(255,255,255,0.2)`
                  : '0 4px 15px rgba(0,0,0,0.12)',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                fontFamily: '"Cinzel", Georgia, serif',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== 'rice') {
                  e.target.style.transform = 'translateY(-3px) scale(1.05)';
                  e.target.style.boxShadow = `0 8px 25px rgba(0,0,0,0.2), 0 0 20px ${colors.gold}40`;
                  e.target.style.borderColor = colors.gold;
                  e.target.style.background = `linear-gradient(135deg, ${colors.cream}, ${colors.white})`;
                } else {
                  e.target.style.transform = 'translateY(-3px) scale(1.05)';
                  e.target.style.boxShadow = `0 12px 35px rgba(15,77,44,0.5), 0 0 40px ${colors.gold}80`;
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== 'rice') {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.12)';
                  e.target.style.borderColor = colors.mediumGreen;
                  e.target.style.background = `linear-gradient(135deg, ${colors.white}, ${colors.cream})`;
                } else {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = `0 8px 25px rgba(15,77,44,0.4), 0 0 30px ${colors.gold}60, inset 0 2px 10px rgba(255,255,255,0.2)`;
                }
              }}
            >
               Rice
            </button>
            <button
              onClick={() => setActiveCategory('millets')}
              style={{
                background: activeCategory === 'millets' 
                  ? `linear-gradient(135deg, ${colors.darkGreen}, ${colors.mediumGreen})`
                  : `linear-gradient(135deg, ${colors.white}, ${colors.cream})`,
                color: activeCategory === 'millets' ? colors.white : colors.darkGreen,
                border: `3px solid ${activeCategory === 'millets' ? colors.gold : colors.mediumGreen}`,
                padding: 'clamp(10px, 2vw, 14px) clamp(20px, 4vw, 32px)',
                fontSize: 'clamp(12px, 2.5vw, 16px)',
                fontWeight: '900',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: activeCategory === 'millets' 
                  ? `0 8px 25px rgba(15,77,44,0.4), 0 0 30px ${colors.gold}60, inset 0 2px 10px rgba(255,255,255,0.2)`
                  : '0 4px 15px rgba(0,0,0,0.12)',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                fontFamily: '"Cinzel", Georgia, serif',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== 'millets') {
                  e.target.style.transform = 'translateY(-3px) scale(1.05)';
                  e.target.style.boxShadow = `0 8px 25px rgba(0,0,0,0.2), 0 0 20px ${colors.gold}40`;
                  e.target.style.borderColor = colors.gold;
                  e.target.style.background = `linear-gradient(135deg, ${colors.cream}, ${colors.white})`;
                } else {
                  e.target.style.transform = 'translateY(-3px) scale(1.05)';
                  e.target.style.boxShadow = `0 12px 35px rgba(15,77,44,0.5), 0 0 40px ${colors.gold}80`;
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== 'millets') {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.12)';
                  e.target.style.borderColor = colors.mediumGreen;
                  e.target.style.background = `linear-gradient(135deg, ${colors.white}, ${colors.cream})`;
                } else {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = `0 8px 25px rgba(15,77,44,0.4), 0 0 30px ${colors.gold}60, inset 0 2px 10px rgba(255,255,255,0.2)`;
                }
              }}
            >
               Millets
            </button>
            <button
              onClick={() => setActiveCategory('spices')}
              style={{
                background: activeCategory === 'spices' 
                  ? `linear-gradient(135deg, ${colors.darkGreen}, ${colors.mediumGreen})`
                  : `linear-gradient(135deg, ${colors.white}, ${colors.cream})`,
                color: activeCategory === 'spices' ? colors.white : colors.darkGreen,
                border: `3px solid ${activeCategory === 'spices' ? colors.gold : colors.mediumGreen}`,
                padding: 'clamp(10px, 2vw, 14px) clamp(20px, 4vw, 32px)',
                fontSize: 'clamp(12px, 2.5vw, 16px)',
                fontWeight: '900',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: activeCategory === 'spices' 
                  ? `0 8px 25px rgba(15,77,44,0.4), 0 0 30px ${colors.gold}60, inset 0 2px 10px rgba(255,255,255,0.2)`
                  : '0 4px 15px rgba(0,0,0,0.12)',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                fontFamily: '"Cinzel", Georgia, serif',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== 'spices') {
                  e.target.style.transform = 'translateY(-3px) scale(1.05)';
                  e.target.style.boxShadow = `0 8px 25px rgba(0,0,0,0.2), 0 0 20px ${colors.gold}40`;
                  e.target.style.borderColor = colors.gold;
                  e.target.style.background = `linear-gradient(135deg, ${colors.cream}, ${colors.white})`;
                } else {
                  e.target.style.transform = 'translateY(-3px) scale(1.05)';
                  e.target.style.boxShadow = `0 12px 35px rgba(15,77,44,0.5), 0 0 40px ${colors.gold}80`;
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== 'spices') {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.12)';
                  e.target.style.borderColor = colors.mediumGreen;
                  e.target.style.background = `linear-gradient(135deg, ${colors.white}, ${colors.cream})`;
                } else {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = `0 8px 25px rgba(15,77,44,0.4), 0 0 30px ${colors.gold}60, inset 0 2px 10px rgba(255,255,255,0.2)`;
                }
              }}
            >
               Spices
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section style={{
        padding: 'clamp(20px, 4vw, 40px) clamp(20px, 5vw, 60px) clamp(20px, 4vw, 40px)',
        backgroundColor: colors.white,
        animation: 'fadeIn 1.4s ease-in'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            color: colors.darkGreen,
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: '900',
            marginBottom: '35px',
            fontFamily: 'Georgia, serif',
            letterSpacing: '2px'
          }}>
            {activeCategory === 'all' ? '🌾 All Products' : activeCategory === 'rice' ? '🌾 Premium Rice Varieties' : activeCategory === 'millets' ? '🌾 Nutritious Millets' : '🌶️ Premium Spices'}
          </h2>

          <div className="products-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'clamp(20px, 4vw, 50px)'
          }}>
            {displayProducts.map((product, index) => (
              <div key={index} className="product-card" style={{
                backgroundColor: colors.white,
                borderRadius: 'clamp(12px, 3vw, 20px)',
                overflow: 'hidden',
                boxShadow: `0 10px 30px rgba(0,0,0,0.1), 0 0 0 3px ${colors.gold}20`,
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                border: `clamp(2px, 0.5vw, 4px) solid ${colors.gold}40`,
                animation: `scaleIn 0.6s ease-out ${index * 0.1}s backwards`,
                display: 'grid',
                gridTemplateColumns: '1fr',
                alignItems: 'start'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = colors.gold;
                e.currentTarget.style.boxShadow = `0 20px 50px rgba(15,77,44,0.2), 0 0 0 4px ${colors.gold}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = `${colors.gold}40`;
                e.currentTarget.style.boxShadow = `0 10px 30px rgba(0,0,0,0.1), 0 0 0 3px ${colors.gold}20`;
              }}
              >
                <img 
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: 'clamp(200px, 40vw, 350px)',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ padding: 'clamp(12px, 3vw, 20px)' }}>
                  <h3 style={{
                    color: colors.darkGreen,
                    fontSize: 'clamp(20px, 4vw, 26px)',
                    fontWeight: '900',
                    marginBottom: 'clamp(12px, 2.5vw, 15px)',
                    fontFamily: 'Georgia, serif'
                  }}>
                    {product.name}
                  </h3>
                  <p style={{
                    color: colors.textDark,
                    fontSize: 'clamp(15px, 3vw, 17px)',
                    lineHeight: '1.8',
                    marginBottom: '15px',
                    fontWeight: '500'
                  }}>
                    {product.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 'clamp(6px, 2vw, 10px)',
                    marginBottom: 'clamp(12px, 2.5vw, 15px)'
                  }}>
                    {product.features.map((feature, idx) => (
                      <span key={idx} style={{
                        backgroundColor: colors.white,
                        color: colors.mediumGreen,
                        padding: 'clamp(6px, 1.5vw, 8px) clamp(10px, 2.5vw, 16px)',
                        borderRadius: 'clamp(15px, 3vw, 20px)',
                        fontSize: 'clamp(11px, 2.5vw, 13px)',
                        fontWeight: '700',
                        border: `2px solid ${colors.mediumGreen}40`,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                      }}>
                        ✓ {feature}
                      </span>
                    ))}
                  </div>
                  {product.quantities && (
                    <div style={{ marginBottom: 'clamp(12px, 2.5vw, 15px)' }}>
                      <label style={{ display: 'block', color: colors.darkGreen, fontSize: 'clamp(14px, 3vw, 16px)', marginBottom: 'clamp(8px, 2vw, 10px)', fontWeight: '800' }}>Select Quantity:</label>
                      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <select 
                          value={selectedQuantities[index] || 0}
                          onChange={(e) => setSelectedQuantities({...selectedQuantities, [index]: parseInt(e.target.value)})}
                          style={{
                            flex: 1,
                            padding: 'clamp(10px, 2.5vw, 12px) clamp(12px, 3vw, 15px)',
                            fontSize: 'clamp(14px, 3vw, 16px)',
                            fontWeight: '700',
                            color: colors.darkGreen,
                            backgroundColor: colors.white,
                            border: `2px solid ${colors.gold}`,
                            borderRadius: 'clamp(6px, 1.5vw, 8px)',
                            cursor: 'pointer',
                            outline: 'none'
                          }}
                        >
                          {product.quantities.map((qty, idx) => (
                            <option key={idx} value={idx}>{qty.weight} - {qty.price}</option>
                          ))}
                        </select>
                        <div style={{
                          padding: 'clamp(12px, 3vw, 15px)',
                          backgroundColor: colors.lightGold || colors.cream,
                          borderRadius: 'clamp(6px, 1.5vw, 8px)',
                          textAlign: 'center',
                          border: `2px solid ${colors.gold}`,
                          minWidth: '120px'
                        }}>
                          <span style={{ fontSize: 'clamp(20px, 4vw, 24px)', fontWeight: '900', color: colors.mediumGreen }}>
                            {product.quantities[selectedQuantities[index] || 0].price}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  <Link to="/quote" style={{ textDecoration: 'none' }}>
                    <button style={{
                      width: '100%',
                      background: `linear-gradient(135deg, ${colors.mediumGreen}, ${colors.darkGreen})`,
                      color: colors.white,
                      border: 'none',
                      padding: 'clamp(12px, 3vw, 14px)',
                      borderRadius: 'clamp(8px, 2vw, 12px)',
                      fontSize: 'clamp(14px, 3vw, 16px)',
                      fontWeight: '900',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textTransform: 'uppercase',
                      letterSpacing: 'clamp(0.5px, 0.2vw, 1px)',
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
                      📞 Get Quote
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: 'clamp(50px, 8vw, 80px) clamp(20px, 5vw, 60px)',
        background: `linear-gradient(135deg, ${colors.darkGreen} 0%, ${colors.deepGreen} 100%)`,
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{
            color: colors.gold,
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: '900',
            marginBottom: '20px',
            fontFamily: 'Georgia, serif',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            Interested in Our Products?
          </h2>
          <p style={{
            color: colors.white,
            fontSize: 'clamp(16px, 3vw, 20px)',
            marginBottom: '35px',
            lineHeight: '1.8'
          }}>
            Contact us for bulk orders and competitive pricing
          </p>
          <a href="tel:8074346568" style={{
            background: `linear-gradient(135deg, ${colors.gold} 0%, #e6c14a 100%)`,
            color: colors.darkGreen,
            padding: 'clamp(16px, 3vw, 20px) clamp(35px, 6vw, 50px)',
            fontSize: 'clamp(16px, 3vw, 20px)',
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
            📞 Call: 80743 46568
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
          bottom: 'clamp(20px, 4vw, 30px)',
          right: 'clamp(20px, 4vw, 30px)',
          backgroundColor: '#25D366',
          width: 'clamp(55px, 12vw, 70px)',
          height: 'clamp(55px, 12vw, 70px)',
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

export default Products;
