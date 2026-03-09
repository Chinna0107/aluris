import { useEffect } from 'react';

function Contact() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const colors = {
    darkGreen: '#0f4d2c',
    mediumGreen: '#1b6b3d',
    gold: '#d4af37',
    white: '#ffffff',
    cream: '#f3eadc'
  };

  return (
    <div style={{ marginTop: '120px', padding: '40px 20px', minHeight: '60vh', animation: 'fadeIn 0.8s ease-in', backgroundColor: '#f9f9f9' }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <h1 style={{ textAlign: 'center', color: colors.darkGreen, fontSize: '42px', marginBottom: '50px' }}>Contact Us</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Contact Details */}
        <div style={{ backgroundColor: colors.white, padding: '40px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: colors.darkGreen, fontSize: '28px', marginBottom: '30px' }}>Get In Touch</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div>
              <h3 style={{ color: colors.mediumGreen, fontSize: '18px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                📞 Phone
              </h3>
              <a href="tel:9848930313" style={{ color: colors.darkGreen, fontSize: '20px', fontWeight: '700', textDecoration: 'none' }}>98489 30313</a>
            </div>
            <div>
              <h3 style={{ color: colors.mediumGreen, fontSize: '18px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                📧 Email
              </h3>
              <a href="mailto:info@alurisglobalrice.com" style={{ color: colors.darkGreen, fontSize: '18px', textDecoration: 'none' }}>info@alurisglobalrice.com</a>
            </div>
            <div>
              <h3 style={{ color: colors.mediumGreen, fontSize: '18px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                📍 Address
              </h3>
              <p style={{ color: colors.darkGreen, fontSize: '16px', lineHeight: '1.6', margin: 0 }}>
                Aluri's Global Rice<br />
                Rice Mill Location<br />
                City, State - PIN Code
              </p>
            </div>
            <div>
              <h3 style={{ color: colors.mediumGreen, fontSize: '18px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                💬 WhatsApp
              </h3>
              <a href="https://wa.me/919848930313" target="_blank" rel="noopener noreferrer" style={{ color: colors.darkGreen, fontSize: '18px', textDecoration: 'none', fontWeight: '700' }}>Chat with us</a>
            </div>
          </div>
        </div>
        {/* Map */}
        <div style={{ backgroundColor: colors.white, borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', minHeight: '400px' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.6!2d78.4867!3d17.3850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDIzJzA2LjAiTiA3OMKwMjknMTIuMSJF!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '400px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Aluri's Global Rice Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;
