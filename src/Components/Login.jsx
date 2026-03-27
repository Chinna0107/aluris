import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const colors = {
  darkGreen: '#0f4d2c',
  mediumGreen: '#1b6b3d',
  gold: '#d4af37',
  cream: '#f3eadc',
  white: '#ffffff',
  error: '#c0392b',
};

const ADMIN_CREDENTIALS = { username: 'admin', password: 'admin123' };

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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
        setError(data.message || 'Invalid username or password');
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
      background: `linear-gradient(135deg, ${colors.darkGreen} 0%, ${colors.mediumGreen} 60%, #2d8a50 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background decorative circles */}
      <div style={{ position: 'absolute', top: '-80px', left: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(212,175,55,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-100px', right: '-60px', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(212,175,55,0.06)', pointerEvents: 'none' }} />

      <div style={{
        background: colors.white,
        borderRadius: '24px',
        padding: 'clamp(32px, 5vw, 52px) clamp(28px, 5vw, 48px)',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Logo & Title */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '50%',
            background: `linear-gradient(135deg, ${colors.darkGreen}, ${colors.mediumGreen})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: `0 8px 24px rgba(15,77,44,0.35)`,
            fontSize: '32px',
          }}>🌾</div>
          <h1 style={{ margin: 0, fontSize: '26px', fontWeight: '800', color: colors.darkGreen, fontFamily: '"Cinzel", serif', letterSpacing: '1px' }}>
            Admin Portal
          </h1>
          <p style={{ margin: '6px 0 0', color: '#777', fontSize: '14px' }}>
            Aluri's Global Trade™ — Farm Management
          </p>
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
          <div style={{ flex: 1, height: '1px', background: colors.cream }} />
          <span style={{ fontSize: '18px' }}>🌱</span>
          <div style={{ flex: 1, height: '1px', background: colors.cream }} />
        </div>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: colors.darkGreen, marginBottom: '6px', letterSpacing: '0.5px' }}>
              USERNAME
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px' }}>👤</span>
              <input
                type="text"
                value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                placeholder="Enter your username"
                required
                style={{
                  width: '100%', padding: '12px 14px 12px 42px',
                  border: `2px solid ${colors.cream}`, borderRadius: '10px',
                  fontSize: '15px', outline: 'none', boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                  fontFamily: 'inherit',
                }}
                onFocus={e => e.target.style.borderColor = colors.mediumGreen}
                onBlur={e => e.target.style.borderColor = colors.cream}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: colors.darkGreen, marginBottom: '6px', letterSpacing: '0.5px' }}>
              PASSWORD
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px' }}>🔒</span>
              <input
                type="password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="Enter your password"
                required
                style={{
                  width: '100%', padding: '12px 14px 12px 42px',
                  border: `2px solid ${colors.cream}`, borderRadius: '10px',
                  fontSize: '15px', outline: 'none', boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                  fontFamily: 'inherit',
                }}
                onFocus={e => e.target.style.borderColor = colors.mediumGreen}
                onBlur={e => e.target.style.borderColor = colors.cream}
              />
            </div>
          </div>

          {error && (
            <div style={{
              background: '#fdf0ef', border: `1px solid ${colors.error}`,
              borderRadius: '8px', padding: '10px 14px', marginBottom: '18px',
              color: colors.error, fontSize: '13px', fontWeight: '600',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '14px',
              background: loading ? '#aaa' : `linear-gradient(135deg, ${colors.darkGreen}, ${colors.mediumGreen})`,
              color: colors.white, border: 'none', borderRadius: '10px',
              fontSize: '16px', fontWeight: '800', cursor: loading ? 'not-allowed' : 'pointer',
              letterSpacing: '1px', transition: 'all 0.3s',
              boxShadow: loading ? 'none' : `0 6px 20px rgba(15,77,44,0.4)`,
            }}
          >
            {loading ? '🌾 Signing in...' : '🚜 Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '12px', color: '#aaa' }}>
          🌿 Empowering Farmers · Aluri's Global Trade™
        </p>
      </div>
    </div>
  );
}
