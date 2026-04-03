import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';

const colors = {
  darkGreen: '#0f4d2c',
  mediumGreen: '#1b6b3d',
  gold: '#d4af37',
  white: '#ffffff',
  bg: '#071508',
  cardBg: '#0f3d20',
  cardDark: '#071a0d',
  muted: '#6fa882',
};

export default function ProductDetail() {
  const { slug } = useParams();
  const id = slug?.split('-').pop();
  const navigate = useNavigate();
  const { product, loading } = useProduct(id);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedQty, setSelectedQty] = useState(0);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [quoteModal, setQuoteModal] = useState(false);
  const [quoteForm, setQuoteForm] = useState({ name: '', email: '', phone: '' });
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);

  // Zoom state
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imgRef = useRef(null);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    setQuoteSubmitting(true);
    const q = product.quantities?.[selectedQty];
    const priceStr = q ? `${q.label ?? currentLabel} — ₹${fmt(q.price)}` : product.price ? `₹${fmt(product.price)} / ${product.unit || 'kg'}` : 'Price on request';
    const msg = `Quote Request\n\nName: ${quoteForm.name}\nPhone: ${quoteForm.phone}${quoteForm.email ? `\nEmail: ${quoteForm.email}` : ''}\n\nProduct: ${product.name}\nCategory: ${product.category}\nSelected Price: ${priceStr}`;
    window.open(`https://wa.me/918074346568?text=${encodeURIComponent(msg)}`, '_blank');
    setQuoteSubmitting(false);
    setQuoteModal(false);
    setQuoteForm({ name: '', email: '', phone: '' });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', background: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: colors.gold, fontSize: '18px', fontWeight: '700', fontFamily: 'Cinzel, serif' }}>🌾 Loading...</p>
    </div>
  );

  if (!product) return null;

  const fmt = (n) => Number(n).toLocaleString('en-IN');

  const images = (
    Array.isArray(product.images) && product.images.length
      ? product.images
      : [product.image]
  ).filter(Boolean);
  if (images.length === 0) images.push('https://placehold.co/600x600?text=No+Image');

  const currentPrice = product.quantities?.[selectedQty]?.price ?? product.price;
  const currentLabel = product.quantities?.[selectedQty]?.label ?? `${product.unit || 'kg'}`;

  const trustBadges = [
    { icon: '🚚', title: 'Free Delivery', sub: 'On orders above ₹500' },
    { icon: '✅', title: '100% Genuine', sub: 'Quality assured' },
    { icon: '↩️', title: 'Easy Returns', sub: '7-day exchange' },
  ];

  const tabStyle = (tab) => ({
    padding: '10px 24px', border: 'none', cursor: 'pointer',
    fontWeight: '800', fontSize: '13px', letterSpacing: '1px',
    textTransform: 'uppercase', transition: 'all 0.2s',
    borderBottom: activeTab === tab ? `2px solid ${colors.gold}` : '2px solid transparent',
    background: 'transparent',
    color: activeTab === tab ? colors.gold : colors.muted,
  });

  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(180deg, #071508 0%, #0a1f0f 100%)`, paddingTop: '110px', paddingBottom: '60px' }}>
      <style>{`
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes zoomIn { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }
        .thumb:hover { border-color: ${colors.gold} !important; transform: scale(1.08) !important; }
        .qty-btn:hover { transform: scale(1.05); }
        .main-img img { display: block; max-width: 100%; max-height: 100%; }
        @media (max-width: 768px) {
          .detail-layout { flex-direction: column !important; }
          .gallery-col { width: 100% !important; }
          .info-col { width: 100% !important; padding-left: 0 !important; }
          .gallery-inner { flex-direction: column !important; }
          .thumb-row { flex-direction: row !important; gap: 8px !important; margin-top: 0 !important; order: 2; justify-content: center; }
          .main-img { height: 300px !important; min-height: 300px !important; width: 100% !important; flex: none !important; order: 1; }
          .main-img img { padding: 6px !important; width: 100% !important; height: 100% !important; object-fit: contain !important; }
          .zoom-overlay { display: none !important; }
        }
      `}</style>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)', animation: 'fadeUp 0.5s ease' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '13px', color: colors.muted }}>
          <Link to="/" style={{ color: colors.muted, textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link to="/products" style={{ color: colors.muted, textDecoration: 'none' }}>Products</Link>
          <span>›</span>
          <span style={{ color: colors.gold }}>{product.name}</span>
        </div>

        {/* Main layout */}
        <div className="detail-layout" style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>

          {/* LEFT — Gallery */}
          <div className="gallery-col" style={{ width: '45%', flexShrink: 0 }}>
            <div className="gallery-inner" style={{ display: 'flex', gap: '12px' }}>

              {/* Thumbnails */}
              <div className="thumb-row" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {images.slice(0, 5).map((img, i) => (
                  <div key={i} className="thumb" onClick={() => { setActiveImg(i); setZoomed(false); }} style={{
                    width: '64px', height: '64px', borderRadius: '10px', overflow: 'hidden', cursor: 'pointer',
                    border: `2px solid ${activeImg === i ? colors.gold : 'rgba(212,175,55,0.2)'}`,
                    transition: 'all 0.2s', flexShrink: 0, background: '#0a2410',
                  }}>
                    <img src={img} alt={`view-${i}`} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px', boxSizing: 'border-box' }} />
                  </div>
                ))}
              </div>

              {/* Main image with zoom */}
              <div
                ref={imgRef}
                className="main-img"
                onMouseEnter={() => setZoomed(true)}
                onMouseLeave={() => setZoomed(false)}
                onMouseMove={handleMouseMove}
                style={{
                  flex: 1, height: '420px', borderRadius: '18px', overflow: 'hidden',
                  background: 'linear-gradient(180deg, #0a2410 0%, #051008 100%)',
                  border: `1px solid ${zoomed ? colors.gold : 'rgba(212,175,55,0.3)'}`,
                  boxShadow: zoomed
                    ? `0 12px 50px rgba(212,175,55,0.3), 0 0 0 2px ${colors.gold}`
                    : `0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.1)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', cursor: zoomed ? 'crosshair' : 'zoom-in',
                  transition: 'border 0.2s, box-shadow 0.2s',
                }}
              >
                <img
                  src={images[activeImg]}
                  alt={product.name}
                  style={{
                    width: '100%', height: '100%', objectFit: 'contain',
                    padding: '16px', boxSizing: 'border-box',
                    filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.6))',
                    transition: 'transform 0.2s ease',
                    transform: zoomed ? 'scale(1.04)' : 'scale(1)',
                    pointerEvents: 'none',
                    zIndex: 1,
                  }}
                />

                {/* Zoom lens overlay */}
                {zoomed && (
                  <div className="zoom-overlay" style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundImage: `url(${images[activeImg]})`,
                    backgroundSize: '250%',
                    backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                    backgroundRepeat: 'no-repeat',
                    borderRadius: '18px',
                    opacity: 1,
                    animation: 'zoomIn 0.15s ease',
                    zIndex: 2,
                  }} />
                )}

                {/* Zoom hint */}
                {!zoomed && (
                  <div style={{
                    position: 'absolute', bottom: '12px', right: '12px',
                    background: 'rgba(0,0,0,0.6)', color: colors.gold,
                    fontSize: '11px', fontWeight: '700', padding: '4px 10px',
                    borderRadius: '20px', letterSpacing: '0.5px', pointerEvents: 'none',
                  }}>🔍 Hover to zoom</div>
                )}

                {/* Corner accent */}
                <div style={{ position: 'absolute', top: 0, right: 0, width: '60px', height: '60px', background: `linear-gradient(225deg, ${colors.gold}30 0%, transparent 60%)`, borderBottomLeftRadius: '60px', pointerEvents: 'none' }} />
              </div>
            </div>

            {/* Image counter */}
            {images.length > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '14px' }}>
                {images.slice(0, 5).map((_, i) => (
                  <div key={i} onClick={() => setActiveImg(i)} style={{
                    width: activeImg === i ? '20px' : '8px', height: '8px',
                    borderRadius: '4px', cursor: 'pointer',
                    background: activeImg === i ? colors.gold : 'rgba(212,175,55,0.3)',
                    transition: 'all 0.3s',
                  }} />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Info */}
          <div className="info-col" style={{ flex: 1, paddingLeft: '8px' }}>

            {/* Category badge */}
            <div style={{ display: 'inline-block', background: `linear-gradient(135deg, ${colors.gold}, #b8860b)`, color: '#071a0d', padding: '3px 12px', borderRadius: '20px', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '12px', boxShadow: `0 2px 10px rgba(212,175,55,0.4)` }}>
              {product.category}
            </div>

            {/* Name */}
            <h1 style={{
              color: colors.white, fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: '900',
              fontFamily: 'Cinzel, Georgia, serif', marginBottom: '8px', lineHeight: '1.3',
              background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.gold} 60%, ${colors.white} 100%)`,
              backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              animation: 'shimmer 5s linear infinite',
            }}>{product.name}</h1>

            {/* Gold divider */}
            <div style={{ height: '1px', background: `linear-gradient(90deg, ${colors.gold}80, transparent)`, marginBottom: '20px' }} />

            {/* Description preview */}
            {product.description && (
              <p style={{ color: colors.muted, fontSize: '14px', lineHeight: '1.8', marginBottom: '20px' }}>
                {product.description}
              </p>
            )}

            {/* Quantity selector + Price */}
            {product.quantities?.length > 0 ? (
              <div style={{ marginBottom: '24px' }}>
                <p style={{ color: colors.muted, fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Price Categories</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '10px', marginBottom: '16px' }}>
                  {product.quantities.map((q, i) => {
                    const orig = Number(q.originalPrice);
                    const our = Number(q.price);
                    const disc = orig && our && orig > our ? Math.round(((orig - our) / orig) * 100) : null;
                    return (
                      <div key={i} onClick={() => setSelectedQty(i)} style={{
                        cursor: 'pointer', borderRadius: '12px', padding: '14px 10px', textAlign: 'center',
                        border: `2px solid ${selectedQty === i ? colors.gold : 'rgba(212,175,55,0.2)'}`,
                        background: selectedQty === i
                          ? `linear-gradient(135deg, rgba(212,175,55,0.18), rgba(212,175,55,0.06))`
                          : 'rgba(255,255,255,0.03)',
                        boxShadow: selectedQty === i ? `0 4px 18px rgba(212,175,55,0.25)` : 'none',
                        transition: 'all 0.2s', position: 'relative',
                      }}>
                        {disc && (
                          <div style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#e74c3c', color: '#fff', fontSize: '10px', fontWeight: '900', padding: '2px 6px', borderRadius: '20px' }}>
                            -{disc}%
                          </div>
                        )}
                        <p style={{ color: colors.muted, fontSize: '11px', fontWeight: '700', margin: '0 0 6px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                          {q.label ?? q.weight}
                        </p>
                        {orig && orig > our ? (
                          <p style={{ color: '#888', fontSize: '12px', fontWeight: '600', margin: '0 0 2px', textDecoration: 'line-through' }}>₹{fmt(orig)}</p>
                        ) : null}
                        <p style={{ color: colors.gold, fontSize: '18px', fontWeight: '900', margin: 0, fontFamily: 'Cinzel, serif' }}>₹{fmt(our || q.price)}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Selected summary */}
                {(() => {
                  const q = product.quantities[selectedQty];
                  const orig = Number(q?.originalPrice);
                  const our = Number(q?.price);
                  const disc = orig && our && orig > our ? Math.round(((orig - our) / orig) * 100) : null;
                  const saved = orig && our && orig > our ? orig - our : null;
                  return (
                    <div style={{ background: 'rgba(212,175,55,0.07)', border: `1px solid rgba(212,175,55,0.25)`, borderRadius: '14px', padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap', marginBottom: saved ? '10px' : 0 }}>
                        {orig && orig > our ? (
                          <span style={{ fontSize: '16px', color: '#888', textDecoration: 'line-through', fontWeight: '600' }}>₹{fmt(orig)}</span>
                        ) : null}
                        <span style={{ fontSize: 'clamp(26px, 3.5vw, 34px)', fontWeight: '900', color: colors.gold, fontFamily: 'Cinzel, serif' }}>₹{fmt(our || q?.price)}</span>
                        <span style={{ fontSize: '13px', color: colors.muted }}>/ {q?.label ?? currentLabel}</span>
                        {disc && (
                          <span style={{ background: '#e74c3c', color: '#fff', fontSize: '12px', fontWeight: '900', padding: '3px 10px', borderRadius: '20px' }}>{disc}% OFF</span>
                        )}
                      </div>
                      {saved && (
                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                          <span style={{ color: '#4caf50', fontSize: '13px', fontWeight: '700' }}>✅ You save ₹{fmt(saved)}</span>
                          <span style={{ color: colors.muted, fontSize: '13px' }}>MRP: ₹{fmt(orig)}</span>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: '900', color: colors.gold, fontFamily: 'Cinzel, serif' }}>
                  {product.price ? `₹${fmt(product.price)}` : 'Price on request'}
                </span>
                {product.price && <span style={{ fontSize: '14px', color: colors.muted, marginLeft: '8px' }}>/ {product.unit || 'kg'}</span>}
              </div>
            )}

            {/* Trust Badges */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
              {trustBadges.map((b, i) => (
                <div key={i} style={{
                  flex: '1', minWidth: '100px', background: 'rgba(212,175,55,0.06)',
                  border: `1px solid rgba(212,175,55,0.2)`, borderRadius: '12px',
                  padding: '12px 10px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: '22px', marginBottom: '4px' }}>{b.icon}</div>
                  <p style={{ color: colors.white, fontSize: '11px', fontWeight: '800', margin: '0 0 2px', letterSpacing: '0.3px' }}>{b.title}</p>
                  <p style={{ color: colors.muted, fontSize: '10px', margin: 0 }}>{b.sub}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <button onClick={() => setQuoteModal(true)} style={{
                flex: 1, padding: '14px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                background: `linear-gradient(135deg, ${colors.gold} 0%, #e8c547 50%, #b8860b 100%)`,
                color: '#071a0d', fontWeight: '900', fontSize: '14px', letterSpacing: '1px',
                textTransform: 'uppercase', boxShadow: `0 6px 20px rgba(212,175,55,0.4)`,
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = `0 10px 28px rgba(212,175,55,0.55)`; }}
              onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = `0 6px 20px rgba(212,175,55,0.4)`; }}
              >📞 Get Quote</button>
              <a href={`https://wa.me/918074346568?text=Hi, I'm interested in ${encodeURIComponent(product.name)}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', flex: 1 }}>
                <button style={{
                  width: '100%', padding: '14px', borderRadius: '12px', border: `2px solid #25D366`, cursor: 'pointer',
                  background: 'rgba(37,211,102,0.1)', color: '#25D366', fontWeight: '900', fontSize: '14px',
                  letterSpacing: '1px', textTransform: 'uppercase', transition: 'all 0.3s',
                }}
                onMouseEnter={e => { e.target.style.background = '#25D366'; e.target.style.color = '#fff'; }}
                onMouseLeave={e => { e.target.style.background = 'rgba(37,211,102,0.1)'; e.target.style.color = '#25D366'; }}
                >💬 WhatsApp</button>
              </a>
            </div>

            {/* Like & Share */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setLiked(l => !l)} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 18px', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '13px',
                border: `1px solid ${liked ? '#e74c3c' : 'rgba(212,175,55,0.25)'}`,
                background: liked ? 'rgba(231,76,60,0.12)' : 'rgba(212,175,55,0.06)',
                color: liked ? '#e74c3c' : colors.muted, transition: 'all 0.2s',
              }}>
                {liked ? '❤️' : '🤍'} {liked ? 'Liked' : 'Like'}
              </button>
              <button onClick={handleShare} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 18px', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '13px',
                border: `1px solid rgba(212,175,55,0.25)`,
                background: 'rgba(212,175,55,0.06)', color: colors.muted, transition: 'all 0.2s',
              }}>
                🔗 {copied ? 'Copied!' : 'Share'}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs — Description & Features */}
        <div style={{ marginTop: '48px', background: 'linear-gradient(160deg, #0f3d20 0%, #071a0d 100%)', borderRadius: '18px', border: `1px solid rgba(212,175,55,0.2)`, overflow: 'hidden' }}>
          <div style={{ display: 'flex', borderBottom: `1px solid rgba(212,175,55,0.15)`, padding: '0 20px' }}>
            {['description', 'features'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={tabStyle(tab)}>
                {tab === 'description' ? '📋 Description' : '✦ Features'}
              </button>
            ))}
          </div>
          <div style={{ padding: '28px' }}>
            {activeTab === 'description' && (
              <p style={{ color: '#a8c5a0', fontSize: '16px', lineHeight: '1.9', margin: 0, fontWeight: '500' }}>
                {product.description || 'No description available.'}
              </p>
            )}
            {activeTab === 'features' && (
              product.features.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {product.features.map((f, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '10px',
                      background: 'rgba(212,175,55,0.07)', border: `1px solid rgba(212,175,55,0.2)`,
                      borderRadius: '10px', padding: '12px 14px',
                    }}>
                      <span style={{ color: colors.gold, fontSize: '16px', lineHeight: '1.4' }}>✦</span>
                      <span style={{ color: colors.white, fontSize: '14px', fontWeight: '700', lineHeight: '1.6' }}>{f}</span>
                    </div>
                  ))}
                </div>
              ) : <p style={{ color: colors.muted, margin: 0 }}>No features listed.</p>
            )}
          </div>
        </div>

        {/* Back button */}
        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <button onClick={() => navigate('/products')} style={{
            padding: '12px 32px', borderRadius: '50px', border: `2px solid rgba(212,175,55,0.4)`,
            background: 'transparent', color: colors.gold, fontWeight: '800', fontSize: '14px',
            cursor: 'pointer', letterSpacing: '1px', transition: 'all 0.3s',
          }}
          onMouseEnter={e => { e.target.style.background = `rgba(212,175,55,0.1)`; e.target.style.borderColor = colors.gold; }}
          onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.borderColor = 'rgba(212,175,55,0.4)'; }}
          >← Back to Products</button>
        </div>
      </div>

      {/* Quote Modal */}
      {quoteModal && (
        <div onClick={() => setQuoteModal(false)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
          backdropFilter: 'blur(4px)',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: 'linear-gradient(160deg, #0f3d20 0%, #071a0d 100%)',
            border: `1px solid rgba(212,175,55,0.35)`, borderRadius: '20px',
            padding: '32px', width: '100%', maxWidth: '460px',
            boxShadow: `0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.2)`,
            animation: 'fadeUp 0.25s ease',
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <h2 style={{ color: colors.gold, fontFamily: 'Cinzel, serif', fontSize: '20px', fontWeight: '900', margin: 0 }}>Get a Quote</h2>
                <p style={{ color: colors.muted, fontSize: '12px', margin: '4px 0 0' }}>We’ll reach out with the best price</p>
              </div>
              <button onClick={() => setQuoteModal(false)} style={{ background: 'none', border: 'none', color: colors.muted, fontSize: '20px', cursor: 'pointer', lineHeight: 1 }}>×</button>
            </div>

            {/* Product summary */}
            <div style={{
              background: 'rgba(212,175,55,0.07)', border: `1px solid rgba(212,175,55,0.2)`,
              borderRadius: '12px', padding: '14px 16px', marginBottom: '22px',
            }}>
              <p style={{ color: colors.muted, fontSize: '10px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 6px' }}>Selected Product</p>
              <p style={{ color: colors.white, fontWeight: '800', fontSize: '15px', margin: '0 0 4px', fontFamily: 'Cinzel, serif' }}>{product.name}</p>
              <p style={{ color: colors.gold, fontSize: '11px', fontWeight: '700', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{product.category}</p>
              {(() => {
                const q = product.quantities?.[selectedQty];
                if (q) return <p style={{ color: colors.gold, fontSize: '14px', fontWeight: '900', margin: 0 }}>{q.label ?? currentLabel} — ₹{fmt(q.price)}</p>;
                if (product.price) return <p style={{ color: colors.gold, fontSize: '14px', fontWeight: '900', margin: 0 }}>₹{fmt(product.price)} / {product.unit || 'kg'}</p>;
                return null;
              })()}
            </div>

            {/* Form */}
            <form onSubmit={handleQuoteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Your name', required: true },
                { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: 'Your phone number', required: true },
                { label: 'Email (optional)', key: 'email', type: 'email', placeholder: 'your@email.com', required: false },
              ].map(({ label, key, type, placeholder, required }) => (
                <div key={key}>
                  <label style={{ display: 'block', color: colors.muted, fontSize: '11px', fontWeight: '700', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '6px' }}>{label}</label>
                  <input
                    type={type} required={required} placeholder={placeholder}
                    value={quoteForm[key]}
                    onChange={e => setQuoteForm(f => ({ ...f, [key]: e.target.value }))}
                    style={{
                      width: '100%', padding: '11px 14px', borderRadius: '10px', boxSizing: 'border-box',
                      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.25)',
                      color: colors.white, fontSize: '14px', outline: 'none', fontFamily: 'inherit',
                    }}
                    onFocus={e => e.target.style.borderColor = colors.gold}
                    onBlur={e => e.target.style.borderColor = 'rgba(212,175,55,0.25)'}
                  />
                </div>
              ))}
              <button type="submit" disabled={quoteSubmitting} style={{
                marginTop: '6px', padding: '13px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                background: `linear-gradient(135deg, ${colors.gold}, #e8c547 50%, #b8860b)`,
                color: '#071a0d', fontWeight: '900', fontSize: '14px', letterSpacing: '1px',
                textTransform: 'uppercase', boxShadow: `0 4px 16px rgba(212,175,55,0.4)`,
                transition: 'all 0.2s',
              }}>📤 Send via WhatsApp</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
