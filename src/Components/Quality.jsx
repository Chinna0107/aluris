import { useEffect } from 'react';

function Quality() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const colors = {
    darkGreen: '#0f4d2c',
    mediumGreen: '#1b6b3d',
    gold: '#d4af37',
    white: '#ffffff',
    background: '#f4f4f4'
  };

  const qualityCards = [
    { 
      image: 'https://i.ytimg.com/vi/WbVPUIXqiLE/sddefault.jpg', 
      title: 'Direct Supply From Trusted Mills',
      description: 'We partner with certified mills to ensure consistent quality and supply of rice, millets, and spices. Our direct sourcing eliminates middlemen, guaranteeing fresh products and competitive pricing for bulk orders.'
    },
    { 
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=600', 
      title: 'Bulk Orders Ready for Dispatch',
      description: 'Our well-stocked warehouses maintain large inventories of premium rice, millets, and spices. We ensure quick processing and dispatch of bulk orders with efficient logistics and timely delivery across regions.'
    },
    { 
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600', 
      title: 'Quality Products From Trusted Farmers',
      description: 'We source premium paddy, millets, and spices directly from experienced farmers who follow sustainable farming practices. Our quality checks begin at the farm level to ensure only the best grains and spices reach our mills.'
    },
    { 
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600', 
      title: 'Modern Milling & Sortex Technology',
      description: 'Equipped with state-of-the-art milling machinery and advanced Sortex technology, we ensure precise sorting, cleaning, and grading of rice, millets, and spices. This guarantees uniform quality and removes impurities effectively.'
    },
    { 
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600', 
      title: 'Direct Mill to Buyer Supply',
      description: 'By eliminating intermediaries, we offer factory-fresh rice, millets, and spices directly to buyers. This ensures better pricing, fresher products, and complete transparency in quality and sourcing.'
    },
    { 
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600', 
      title: 'Bulk Supply & Fast Delivery Across Regions',
      description: 'Our extensive distribution network covers Vizag, Prakasam, and Nellore regions. We handle large-scale orders with dedicated logistics support ensuring timely delivery to your doorstep.'
    }
  ];

  return (
    <div style={{ marginTop: '80px', minHeight: '60vh', animation: 'fadeIn 0.8s ease-in', backgroundColor: colors.background }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          body {
            margin-top: 0 !important;
          }
        }
      `}</style>
      
      {/* Hero Section */}
      <section style={{ background: `linear-gradient(135deg, ${colors.darkGreen} 0%, ${colors.mediumGreen} 100%)`, padding: '60px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <img 
          src='https://res.cloudinary.com/dgyykbmt6/image/upload/v1773131814/g1_l8mfz2.jpg'
          alt="Aluri's Global Rice Logo" 
          style={{
            height: '120px',
            width: '120px',
            objectFit: 'cover',
            borderRadius: '16px',
            backgroundColor: colors.white,
            padding: '10px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
            border: `4px solid ${colors.gold}`
          }}
        />
        <h1 style={{ color: colors.gold, fontSize: '48px', marginBottom: '10px', fontFamily: 'Georgia, serif', fontWeight: '900' }}>ALURI'S GLOBAL TRADE</h1>
        <p style={{ color: colors.white, fontSize: '24px', fontWeight: '700', marginBottom: '10px' }}>Quality Assurance</p>
        <p style={{ color: colors.white, fontSize: '20px', fontWeight: '600' }}>📞 98489 30313</p>
      </section>

      {/* Quality Cards Alternating Layout */}
      <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <style>{`
          @media (max-width: 768px) {
            .quality-card {
              grid-template-columns: 1fr !important;
            }
            .quality-card img {
              order: -1 !important;
            }
          }
        `}</style>
        {qualityCards.map((card, index) => (
          <div key={index} className="quality-card" style={{
            display: 'grid',
            gridTemplateColumns: index % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
            gap: '40px',
            marginBottom: '60px',
            alignItems: 'center',
            backgroundColor: colors.white,
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
            padding: '0'
          }}>
            {index % 2 === 0 ? (
              <>
                <img src={card.image} alt={card.title} style={{ width: '100%', height: '350px', objectFit: 'cover' }} />
                <div style={{ padding: '40px' }}>
                  <h3 style={{ color: colors.darkGreen, fontSize: '28px', fontWeight: '900', marginBottom: '20px' }}>{card.title}</h3>
                  <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.8' }}>{card.description}</p>
                </div>
              </>
            ) : (
              <>
                <div style={{ padding: '40px' }}>
                  <h3 style={{ color: colors.darkGreen, fontSize: '28px', fontWeight: '900', marginBottom: '20px' }}>{card.title}</h3>
                  <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.8' }}>{card.description}</p>
                </div>
                <img src={card.image} alt={card.title} style={{ width: '100%', height: '350px', objectFit: 'cover' }} />
              </>
            )}
          </div>
        ))}
      </section>

      {/* Payment Methods */}
      {/* <section style={{ padding: '40px 20px', backgroundColor: colors.white }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ color: colors.darkGreen, fontSize: '32px', marginBottom: '30px', fontWeight: '900' }}>Payment Methods Accepted</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ padding: '20px 40px', backgroundColor: colors.background, borderRadius: '12px', border: `3px solid ${colors.mediumGreen}`, minWidth: '120px' }}>
              <p style={{ color: colors.darkGreen, fontSize: '20px', fontWeight: '900', margin: 0 }}>RTGS</p>
            </div>
            <div style={{ padding: '20px 40px', backgroundColor: colors.background, borderRadius: '12px', border: `3px solid ${colors.mediumGreen}`, minWidth: '120px' }}>
              <p style={{ color: colors.darkGreen, fontSize: '20px', fontWeight: '900', margin: 0 }}>NEFT</p>
            </div>
            <div style={{ padding: '20px 40px', backgroundColor: colors.background, borderRadius: '12px', border: `3px solid ${colors.mediumGreen}`, minWidth: '120px' }}>
              <p style={{ color: colors.darkGreen, fontSize: '20px', fontWeight: '900', margin: 0 }}>PhonePe</p>
            </div>
            <div style={{ padding: '20px 40px', backgroundColor: colors.background, borderRadius: '12px', border: `3px solid ${colors.mediumGreen}`, minWidth: '120px' }}>
              <p style={{ color: colors.darkGreen, fontSize: '20px', fontWeight: '900', margin: 0 }}>UPI</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Bottom Banner */}
      <section style={{ background: `linear-gradient(135deg, ${colors.darkGreen} 0%, ${colors.mediumGreen} 100%)`, padding: '40px 20px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <h2 style={{ color: colors.gold, fontSize: '32px', fontWeight: '900', margin: 0, fontFamily: 'Georgia, serif' }}>ALURI'S GLOBAL TRADE</h2>
          <p style={{ color: colors.white, fontSize: '24px', fontWeight: '700', margin: 0 }}>Supplying Vizag | Prakasam | Nellore</p>
        </div>
      </section>
    </div>
  );
}

export default Quality;
