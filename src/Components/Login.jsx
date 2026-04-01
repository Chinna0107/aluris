import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import farmerImage from '../assets/gp.jpeg';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${config.API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/products');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #020d05 0%, #071508 40%, #0a1f0f 70%, #071508 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px', position: 'relative', overflow: 'hidden',
    }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .login-input:focus { border-color:#d4af37 !important; box-shadow:0 0 0 3px rgba(212,175,55,0.15) !important; }
        .login-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 12px 35px rgba(212,175,55,0.5) !important; }
        .login-panel { display:grid; grid-template-columns:minmax(260px, 1.05fr) minmax(320px, 0.95fr); }
        @media (max-width: 900px) {
          .login-panel { grid-template-columns: 1fr; }
          .login-left { min-height: 240px; }
        }
      `}</style>

      {/* Ambient orbs */}
      <div style={{ position:'absolute', top:'-120px', left:'-120px', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-150px', right:'-100px', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle, rgba(15,77,44,0.3) 0%, transparent 70%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'700px', height:'700px', borderRadius:'50%', background:'radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 60%)', pointerEvents:'none' }} />

      {/* Split panel */}
      <div className="login-panel" style={{
        width: '100%', maxWidth: '980px',
        background: '#0b120d',
        borderRadius: '28px',
        border: '1px solid rgba(212,175,55,0.22)',
        overflow: 'hidden',
        boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.1)',
        position: 'relative',
        zIndex: 1,
        animation: 'fadeUp 0.6s ease-out',
      }}>
        {/* Left: Farmer image */}
        <div className="login-left" style={{
          background: `linear-gradient(140deg, rgba(7,21,8,0.85), rgba(15,77,44,0.4)), url(${farmerImage}) center/cover no-repeat`,
          padding: '42px',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
        }}>
          <div style={{
            width: '76px', height: '76px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '34px',
            border: '1px solid rgba(255,255,255,0.35)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            animation: 'float 4s ease-in-out infinite',
          }}>🌾</div>
          <div>
            <h2 style={{ margin: '16px 0 8px', fontSize: '30px', fontWeight: '900', letterSpacing: '0.5px' }}>
              Welcome Back
            </h2>
            <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)' }}>
              Access the admin panel to manage inventory, pricing, and product listings with confidence.
            </p>
          </div>
          <div style={{
            padding: '14px 16px',
            borderRadius: '14px',
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.25)',
            fontSize: '12px',
            letterSpacing: '0.6px',
          }}>
            Aluri&apos;s Global Trade
            <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '6px' }}>Premium grains, trusted sourcing</div>
          </div>
        </div>

        {/* Right: Login form */}
        <div style={{
          background: 'linear-gradient(160deg, #0f3d20 0%, #071a0d 100%)',
          padding: 'clamp(32px, 4vw, 50px)',
          position: 'relative',
        }}>
          <div style={{ position:'absolute', top:0, left:'12%', right:'12%', height:'2px', background:'linear-gradient(90deg, transparent, #d4af37, transparent)', borderRadius:'2px' }} />

          <div style={{ textAlign:'left', marginBottom:'30px' }}>
            <h1 style={{
              margin:'0 0 6px', fontSize:'28px', fontWeight:'900',
              fontFamily:'"Cinzel", serif', letterSpacing:'2px',
              background:'linear-gradient(135deg, #ffffff 0%, #d4af37 50%, #ffffff 100%)',
              backgroundSize:'200% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
              animation:'shimmer 4s linear infinite',
            }}>Admin Portal</h1>
            <p style={{ margin:0, color:'rgba(212,175,55,0.6)', fontSize:'12px', letterSpacing:'3px', textTransform:'uppercase', fontWeight:'700' }}>
              Aluri's Global Trade
            </p>
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'26px' }}>
            <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg, transparent, rgba(212,175,55,0.3))' }} />
            <span style={{ color:'rgba(212,175,55,0.5)', fontSize:'14px' }}>✦</span>
            <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg, rgba(212,175,55,0.3), transparent)' }} />
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom:'20px' }}>
              <label style={{ display:'block', fontSize:'11px', fontWeight:'800', color:'rgba(212,175,55,0.8)', marginBottom:'8px', letterSpacing:'2px', textTransform:'uppercase' }}>
                Username
              </label>
              <div style={{ position:'relative' }}>
                <span style={{ position:'absolute', left:'14px', top:'50%', transform:'translateY(-50%)', fontSize:'16px', opacity:0.6 }}>👤</span>
                <input
                  className="login-input"
                  type="text" value={form.username}
                  onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                  placeholder="Enter username"
                  required
                  style={{
                    width:'100%', padding:'13px 14px 13px 44px',
                    background:'rgba(255,255,255,0.04)', border:'1px solid rgba(212,175,55,0.2)',
                    borderRadius:'12px', fontSize:'15px', outline:'none',
                    boxSizing:'border-box', color:'#fff', fontFamily:'inherit',
                    transition:'all 0.2s',
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom:'26px' }}>
              <label style={{ display:'block', fontSize:'11px', fontWeight:'800', color:'rgba(212,175,55,0.8)', marginBottom:'8px', letterSpacing:'2px', textTransform:'uppercase' }}>
                Password
              </label>
              <div style={{ position:'relative' }}>
                <span style={{ position:'absolute', left:'14px', top:'50%', transform:'translateY(-50%)', fontSize:'16px', opacity:0.6 }}>🔒</span>
                <input
                  className="login-input"
                  type={showPass ? 'text' : 'password'} value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="Enter password"
                  required
                  style={{
                    width:'100%', padding:'13px 44px 13px 44px',
                    background:'rgba(255,255,255,0.04)', border:'1px solid rgba(212,175,55,0.2)',
                    borderRadius:'12px', fontSize:'15px', outline:'none',
                    boxSizing:'border-box', color:'#fff', fontFamily:'inherit',
                    transition:'all 0.2s',
                  }}
                />
                <button type="button" onClick={() => setShowPass(s => !s)} style={{
                  position:'absolute', right:'14px', top:'50%', transform:'translateY(-50%)',
                  background:'none', border:'none', cursor:'pointer', fontSize:'16px', opacity:0.5, padding:0,
                }}>{showPass ? '🙈' : '👁️'}</button>
              </div>
            </div>

            {error && (
              <div style={{
                background:'rgba(192,57,43,0.12)', border:'1px solid rgba(192,57,43,0.4)',
                borderRadius:'10px', padding:'12px 16px', marginBottom:'20px',
                color:'#ff6b6b', fontSize:'13px', fontWeight:'600',
                display:'flex', alignItems:'center', gap:'8px',
              }}>⚠️ {error}</div>
            )}

            <button
              type="submit" disabled={loading} className="login-btn"
              style={{
                width:'100%', padding:'15px',
                background: loading ? 'rgba(212,175,55,0.3)' : 'linear-gradient(135deg, #d4af37 0%, #e8c547 50%, #b8860b 100%)',
                color: loading ? 'rgba(255,255,255,0.5)' : '#071a0d',
                border:'none', borderRadius:'12px', fontSize:'15px', fontWeight:'900',
                cursor: loading ? 'not-allowed' : 'pointer', letterSpacing:'1.5px',
                textTransform:'uppercase', transition:'all 0.3s',
                boxShadow: loading ? 'none' : '0 6px 24px rgba(212,175,55,0.4)',
              }}
            >
              {loading ? (
                <span style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px' }}>
                  <span style={{ display:'inline-block', width:'14px', height:'14px', border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'#fff', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
                  Signing in...
                </span>
              ) : 'Sign In to Dashboard'}
            </button>
          </form>

          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginTop:'28px' }}>
            <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg, transparent, rgba(212,175,55,0.2))' }} />
            <p style={{ margin:0, fontSize:'11px', color:'rgba(255,255,255,0.2)', letterSpacing:'1px', whiteSpace:'nowrap' }}>Empowering Farmers</p>
            <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg, rgba(212,175,55,0.2), transparent)' }} />
          </div>

          <div style={{ position:'absolute', bottom:0, left:'12%', right:'12%', height:'2px', background:'linear-gradient(90deg, transparent, #d4af37, transparent)', borderRadius:'2px' }} />
        </div>
      </div>
    </div>
  );
}
