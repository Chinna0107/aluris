import { useEffect, useState } from 'react';

function Quote() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    product: '',
    quantity: '',
    message: ''
  });

  const colors = {
    darkGreen: '#0f4d2c',
    mediumGreen: '#1b6b3d',
    gold: '#d4af37',
    white: '#ffffff',
    background: '#f4f4f4'
  };

  const priceRanges = [
    { product: 'RNR 15048', range: '₹45 - ₹55 per kg' },
    { product: 'BPT 5204', range: '₹40 - ₹50 per kg' },
    { product: 'Sona Masoori', range: '₹50 - ₹60 per kg' },
    { product: 'HMT Rice', range: '₹48 - ₹58 per kg' },
    { product: 'Foxtail Millet', range: '₹100 - ₹130 per kg' },
    { product: 'Pearl Millet', range: '₹85 - ₹110 per kg' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create WhatsApp message with proper encoding
    let message = `Quote Request from ${formData.name}\n\n`;
    message += `Phone: ${formData.phone}\n`;
    if (formData.email) {
      message += `Email: ${formData.email}\n`;
    }
    message += `Product: ${formData.product}\n`;
    message += `Quantity: ${formData.quantity} kg\n`;
    if (formData.message) {
      message += `\nMessage:\n${formData.message}`;
    }
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Redirect to WhatsApp
    window.open(`https://wa.me/918074346568?text=${encodedMessage}`, '_blank');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ marginTop: '70px', minHeight: '60vh', animation: 'fadeIn 0.8s ease-in', backgroundColor: colors.background }}>
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
        @media (max-width: 768px) {
          .quote-container {
            grid-template-columns: 1fr !important;
          }
        }
        input:focus, select:focus, textarea:focus {
          border-color: ${colors.gold} !important;
          box-shadow: 0 0 0 3px ${colors.gold}30 !important;
        }
        input, select, textarea {
          transition: all 0.3s ease;
        }
      `}</style>

      {/* Hero Section */}
      <section style={{ 
        backgroundImage: 'url(https://media.istockphoto.com/id/2162451866/photo/beautiful-sunrise-view-on-foggy-forest-in-tuscany-italy-with-green-hills-and-cypress-trees-on.jpg?s=612x612&w=0&k=20&c=-l2f3yL6TP2M6qx7umgReJB3acHy2CfnRZDitafsKtQ=)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '80px 20px', 
        textAlign: 'center', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{ color: colors.gold, fontSize: 'clamp(36px, 6vw, 56px)', marginBottom: '20px', fontFamily: 'Georgia, serif', fontWeight: '900', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>Get a Quote</h1>
        <p style={{ color: colors.white, fontSize: 'clamp(16px, 3vw, 22px)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Fill out the form and we'll get back to you with the best prices</p>
      </section>

      {/* Main Content */}
      <section style={{ padding: 'clamp(40px, 5vw, 60px) 20px', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="quote-container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '50px', alignItems: 'start' }}>
          
          {/* Left Side - Form */}
          <div style={{ backgroundColor: colors.white, padding: '50px', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.12)', border: `3px solid ${colors.gold}20` }}>
            <div style={{ marginBottom: '35px' }}>
              <h2 style={{ color: colors.darkGreen, fontSize: '32px', fontWeight: '900', marginBottom: '10px', fontFamily: 'Georgia, serif' }}>Request Quote</h2>
              <p style={{ color: '#666', fontSize: '15px' }}>Fill in your details and we'll contact you shortly</p>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <div>
                <label style={{ display: 'block', color: colors.darkGreen, fontSize: '15px', fontWeight: '700', marginBottom: '10px', letterSpacing: '0.5px' }}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  style={{ width: '100%', padding: '14px 16px', fontSize: '16px', border: `2px solid ${colors.background}`, borderRadius: '10px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: colors.darkGreen, fontSize: '15px', fontWeight: '700', marginBottom: '10px', letterSpacing: '0.5px' }}>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  style={{ width: '100%', padding: '14px 16px', fontSize: '16px', border: `2px solid ${colors.background}`, borderRadius: '10px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: colors.darkGreen, fontSize: '15px', fontWeight: '700', marginBottom: '10px', letterSpacing: '0.5px' }}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email (optional)"
                  style={{ width: '100%', padding: '14px 16px', fontSize: '16px', border: `2px solid ${colors.background}`, borderRadius: '10px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: colors.darkGreen, fontSize: '15px', fontWeight: '700', marginBottom: '10px', letterSpacing: '0.5px' }}>Select Product *</label>
                <select
                  name="product"
                  required
                  value={formData.product}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '14px 16px', fontSize: '16px', border: `2px solid ${colors.background}`, borderRadius: '10px', outline: 'none', boxSizing: 'border-box', cursor: 'pointer' }}
                >
                  <option value="">Choose a product</option>
                  <option value="RNR 15048">RNR 15048</option>
                  <option value="BPT 5204">BPT 5204</option>
                  <option value="Sona Masoori">Sona Masoori</option>
                  <option value="HMT Rice">HMT Rice</option>
                  <option value="Foxtail Millet">Foxtail Millet</option>
                  <option value="Pearl Millet">Pearl Millet</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', color: colors.darkGreen, fontSize: '15px', fontWeight: '700', marginBottom: '10px', letterSpacing: '0.5px' }}>Quantity (kg) *</label>
                <input
                  type="number"
                  name="quantity"
                  required
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g., 100"
                  min="1"
                  style={{ width: '100%', padding: '14px 16px', fontSize: '16px', border: `2px solid ${colors.background}`, borderRadius: '10px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: colors.darkGreen, fontSize: '15px', fontWeight: '700', marginBottom: '10px', letterSpacing: '0.5px' }}>Additional Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Any specific requirements or questions?"
                  style={{ width: '100%', padding: '14px 16px', fontSize: '16px', border: `2px solid ${colors.background}`, borderRadius: '10px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }}
                />
              </div>
              <button
                type="submit"
                style={{
                  background: `linear-gradient(135deg, ${colors.mediumGreen}, ${colors.darkGreen})`,
                  color: colors.white,
                  padding: '18px',
                  fontSize: '18px',
                  fontWeight: '900',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(15,77,44,0.3)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginTop: '10px'
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
                📤 Submit Request
              </button>
            </form>
          </div>

          {/* Right Side - Price Ranges & Notice */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* Price Ranges */}
            <div style={{ backgroundColor: colors.white, padding: '40px', borderRadius: '16px', boxShadow: '0 6px 20px rgba(0,0,0,0.1)' }}>
              <h2 style={{ color: colors.darkGreen, fontSize: '28px', fontWeight: '900', marginBottom: '30px' }}>Price Ranges</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {priceRanges.map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '15px',
                    backgroundColor: colors.background,
                    borderRadius: '8px',
                    border: `2px solid ${colors.gold}40`
                  }}>
                    <span style={{ color: colors.darkGreen, fontWeight: '700', fontSize: '16px' }}>{item.product}</span>
                    <span style={{ color: colors.mediumGreen, fontWeight: '800', fontSize: '16px' }}>{item.range}</span>
                  </div>
                ))}
              </div>
              <p style={{ color: '#666', fontSize: '14px', marginTop: '20px', fontStyle: 'italic' }}>
                * Prices may vary based on quantity and market conditions
              </p>
            </div>

            {/* Notice */}
            <div style={{ backgroundColor: colors.gold, padding: '30px', borderRadius: '16px', boxShadow: '0 6px 20px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: colors.darkGreen, fontSize: '24px', fontWeight: '900', marginBottom: '15px' }}>📢 Important Notice</h3>
              <ul style={{ color: colors.darkGreen, fontSize: '15px', lineHeight: '1.8', paddingLeft: '20px' }}>
                <li>Minimum order quantity: 10 tonnes</li>
                <li>Bulk discounts available for orders above 15 tonnes</li>
                <li>Free delivery for orders above 15 tonnes</li>
                <li>Payment: RTGS, NEFT, UPI, PhonePe accepted</li>
                <li>Delivery time: 2-5 business days</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div style={{ backgroundColor: colors.mediumGreen, padding: '30px', borderRadius: '16px', boxShadow: '0 6px 20px rgba(0,0,0,0.1)', textAlign: 'center' }}>
              <h3 style={{ color: colors.gold, fontSize: '22px', fontWeight: '900', marginBottom: '15px' }}>Need Help?</h3>
              <p style={{ color: colors.white, fontSize: '18px', marginBottom: '10px' }}>📞 Call us: 80743 46568</p>
              <p style={{ color: colors.white, fontSize: '16px' }}>📧 Email: info@alurisglobaltrade.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Quote;
