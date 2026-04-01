import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const colors = {
  darkGreen: '#0f4d2c',
  mediumGreen: '#1b6b3d',
  gold: '#d4af37',
  cream: '#f3eadc',
  white: '#ffffff',
  bg: '#f5f5f5',
  error: '#c0392b',
  success: '#27ae60',
};

const EMPTY_FORM = { name: '', category: 'rice', unit: 'kg', description: '', images: ['', '', '', '', ''], features: [], quantities: [] };
const CATEGORIES = ['rice', 'spices', 'millets', 'millet products'];
const FALLBACK_IMG = 'https://placehold.co/50x50?text=🌾';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [filterCat, setFilterCat] = useState('all');
  const [lastFetch, setLastFetch] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('adminToken');
  const authHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true' || !localStorage.getItem('adminToken')) {
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('adminToken');
      navigate('/login');
    } else fetchProducts();
  }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${config.API_URL}/api/admin/products`, { headers: authHeaders });
      const data = await res.json();
      const list = data.success ? data.products : Array.isArray(data) ? data : [];
      setProducts(list.map(p => ({ ...p, features: p.features ?? [], quantities: p.quantities ?? [] })));
      setLastFetch(new Date());
    } catch {
      showToast('Failed to fetch products', 'error');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const method = editId ? 'PUT' : 'POST';
    const url = editId
      ? `${config.API_URL}/api/admin/products/${editId}`
      : `${config.API_URL}/api/admin/products`;
    try {
      const res = await fetch(url, { method, headers: authHeaders, body: JSON.stringify(form) });
      const data = await res.json();
      if (res.ok) {
        showToast(editId ? 'Product updated!' : 'Product added!');
        setForm(EMPTY_FORM);
        setEditId(null);
        setShowForm(false);
        fetchProducts();
      } else {
        showToast(data.message || 'Operation failed', 'error');
      }
    } catch {
      showToast('Server error', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${config.API_URL}/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: authHeaders,
      });
      if (res.ok) {
        showToast('Product deleted!');
        setProducts(p => p.filter(x => x.id !== id));
      } else {
        showToast('Delete failed', 'error');
      }
    } catch {
      showToast('Server error', 'error');
    }
    setDeleteConfirm(null);
  };

  const startEdit = (p) => {
    setForm({ name: p.name, category: p.category, unit: p.unit || 'kg', description: p.description || '', images: p.images?.length ? [...p.images, ...Array(5).fill('')].slice(0, 5) : [p.image || '', '', '', '', ''], features: p.features ?? [], quantities: p.quantities ?? [] });
    setEditId(p.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelForm = () => { setForm(EMPTY_FORM); setEditId(null); setShowForm(false); };

  const normalized = (value) => (value ?? '').toString().toLowerCase();
  const formatTime = (d) => (d ? d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '');
  const filtered = products.filter(p => {
    const catMatch = filterCat === 'all' ? true : normalized(p.category) === filterCat;
    return catMatch;
  });

  const visible = [...filtered].sort((a, b) => normalized(a.name).localeCompare(normalized(b.name)));

  const totalCount = products.length;
  const categoryCounts = CATEGORIES.reduce((acc, c) => ({ ...acc, [c]: products.filter(p => normalized(p.category) === c).length }), {});

  const inputStyle = {
    width: '100%', padding: '10px 12px', border: `2px solid ${colors.cream}`,
    borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
    fontFamily: 'inherit', transition: 'border-color 0.2s',
  };

  const exportCSV = () => {
    const rows = [
      ['Name', 'Category', 'Unit', 'Description', 'Image'],
      ...visible.map(p => [
        p.name ?? '',
        p.category ?? '',
        p.unit ?? '',
        (p.description ?? '').replace(/\n/g, ' '),
        (p.images?.[0] || p.image || ''),
      ]),
    ];
    const escape = (v) => `"${String(v).replace(/"/g, '""')}"`;
    const csv = rows.map(r => r.map(escape).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `products_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ minHeight: '100vh', background: colors.bg, paddingTop: '80px' }}>
      {toast && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px', zIndex: 9999,
          background: toast.type === 'error' ? colors.error : colors.success,
          color: colors.white, padding: '12px 20px', borderRadius: '10px',
          fontWeight: '700', fontSize: '14px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          animation: 'fadeIn 0.3s ease',
        }}>
          {toast.type === 'error' ? '⚠️' : '✅'} {toast.msg}
        </div>
      )}

      {deleteConfirm && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9998,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
        }}>
          <div style={{ background: colors.white, borderRadius: '16px', padding: '32px', maxWidth: '360px', width: '100%', textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🗑️</div>
            <h3 style={{ margin: '0 0 8px', color: colors.darkGreen }}>Delete Product?</h3>
            <p style={{ color: '#666', marginBottom: '24px', fontSize: '14px' }}>This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ padding: '10px 24px', borderRadius: '8px', border: `2px solid ${colors.cream}`, background: colors.white, cursor: 'pointer', fontWeight: '700', fontSize: '14px' }}>Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', background: colors.error, color: colors.white, cursor: 'pointer', fontWeight: '700', fontSize: '14px' }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes softPulse { 0% { box-shadow: 0 0 0 0 rgba(212,175,55,0.3); } 70% { box-shadow: 0 0 0 12px rgba(212,175,55,0); } 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0); } }
        @keyframes glowIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        .admin-table { overflow-x: auto; }
        .admin-row { min-width: 620px; }
        @media (max-width: 900px) {
          .admin-row { min-width: 560px; }
        }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 20px' }}>
        {/* Banner */}
        <div style={{
          background: `linear-gradient(120deg, ${colors.darkGreen} 0%, ${colors.mediumGreen} 60%, #2a7f4a 100%)`,
          color: colors.white, borderRadius: '18px', padding: '18px 22px',
          boxShadow: '0 8px 24px rgba(15,77,44,0.25)', marginBottom: '18px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap',
          animation: 'glowIn 0.4s ease',
        }}>
          <div>
            <div style={{ fontSize: '12px', letterSpacing: '1px', opacity: 0.8, fontWeight: '700' }}>ADMIN WORKSPACE</div>
            <div style={{ fontSize: '20px', fontWeight: '900', marginTop: '4px' }}>Manage your catalog with confidence</div>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(255,255,255,0.14)', borderRadius: '12px', padding: '10px 14px', fontSize: '12px', fontWeight: '700' }}>
              Total Products: {totalCount}
            </div>
            <div style={{ background: 'rgba(255,255,255,0.14)', borderRadius: '12px', padding: '10px 14px', fontSize: '12px', fontWeight: '700' }}>
              Last Sync: {formatTime(lastFetch) || '—'}
            </div>
          </div>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: '900', color: colors.darkGreen, fontFamily: '"Cinzel", serif' }}>
              🌾 Product Management
            </h1>
            <p style={{ margin: '4px 0 0', color: '#777', fontSize: '14px' }}>
              {totalCount} products total
              {lastFetch && <span style={{ marginLeft: '10px', color: '#9a9a9a' }}>• Last sync {formatTime(lastFetch)}</span>}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => { setShowForm(!showForm); if (showForm) cancelForm(); }}
              style={{
                padding: '10px 22px', borderRadius: '10px', border: 'none',
                background: showForm ? '#888' : `linear-gradient(135deg, ${colors.darkGreen}, ${colors.mediumGreen})`,
                color: colors.white, fontWeight: '800', fontSize: '14px', cursor: 'pointer',
                boxShadow: showForm ? 'none' : `0 4px 15px rgba(15,77,44,0.35)`,
              }}
            >
              {showForm ? '✕ Cancel' : '+ Add Product'}
            </button>
            <button
              onClick={fetchProducts}
              style={{ padding: '10px 18px', borderRadius: '10px', border: `2px solid ${colors.cream}`, background: colors.white, color: colors.darkGreen, fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}
            >
              Refresh
            </button>
            <button
              onClick={exportCSV}
              style={{ padding: '10px 18px', borderRadius: '10px', border: `2px solid ${colors.gold}`, background: colors.white, color: colors.darkGreen, fontWeight: '800', fontSize: '14px', cursor: 'pointer' }}
            >
              Export CSV
            </button>
            <button
              onClick={() => { localStorage.removeItem('isAdmin'); localStorage.removeItem('adminToken'); navigate('/login'); }}
              style={{ padding: '10px 18px', borderRadius: '10px', border: `2px solid ${colors.error}`, background: colors.white, color: colors.error, fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}
            >
              Logout
            </button>
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '12px', marginBottom: '22px',
        }}>
          {[
            { label: 'Total Products', value: totalCount, accent: colors.darkGreen },
            { label: 'Categories', value: new Set(products.map(p => normalized(p.category)).filter(Boolean)).size, accent: colors.mediumGreen },
          ].map(card => (
            <div key={card.label} style={{
              background: colors.white, borderRadius: '14px', padding: '14px 16px',
              border: `1px solid ${colors.cream}`, boxShadow: '0 8px 20px rgba(0,0,0,0.04)',
              position: 'relative',
            }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#777', letterSpacing: '0.6px' }}>{card.label.toUpperCase()}</div>
              <div style={{ fontSize: '22px', fontWeight: '900', color: card.accent, marginTop: '6px' }}>{card.value}</div>
              {card.pulse && card.value > 0 && (
                <span style={{
                  position: 'absolute', top: '14px', right: '14px', width: '10px', height: '10px',
                  borderRadius: '50%', background: colors.gold, animation: 'softPulse 1.8s infinite',
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Category Quick Chips */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
          {CATEGORIES.map(cat => (
            <div key={cat} style={{
              background: '#fff', border: `1px solid ${colors.cream}`, borderRadius: '999px',
              padding: '6px 12px', fontSize: '12px', fontWeight: '700', color: colors.darkGreen,
            }}>
              {cat} • {categoryCounts[cat]}
            </div>
          ))}
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div style={{
            background: colors.white, borderRadius: '16px', padding: '28px',
            marginBottom: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: `2px solid ${colors.gold}40`, animation: 'fadeIn 0.3s ease',
          }}>
            <h2 style={{ margin: '0 0 20px', color: colors.darkGreen, fontSize: '18px', fontWeight: '800' }}>
              {editId ? '✏️ Edit Product' : '🌱 Add New Product'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {[
                  { label: 'Product Name', key: 'name', type: 'text', placeholder: 'e.g. Sona Masoori Rice' },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: colors.darkGreen, marginBottom: '5px', letterSpacing: '0.5px' }}>{label.toUpperCase()}</label>
                    <input
                      type={type} value={form[key]} placeholder={placeholder} required={key !== 'image'}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = colors.mediumGreen}
                      onBlur={e => e.target.style.borderColor = colors.cream}
                    />
                  </div>
                ))}

                {/* 5 Image URLs */}
                {[0,1,2,3,4].map(i => (
                  <div key={`img-${i}`}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: colors.darkGreen, marginBottom: '5px', letterSpacing: '0.5px' }}>IMAGE {i + 1} URL {i === 0 ? '(MAIN) *' : '(OPTIONAL)'}</label>
                    <input
                      type="url" value={form.images[i]} placeholder="https://..."
                      required={i === 0}
                      onChange={e => setForm(f => { const imgs = [...f.images]; imgs[i] = e.target.value; return { ...f, images: imgs }; })}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = colors.mediumGreen}
                      onBlur={e => e.target.style.borderColor = colors.cream}
                    />
                  </div>
                ))}

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: colors.darkGreen, marginBottom: '5px', letterSpacing: '0.5px' }}>CATEGORY</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={{ ...inputStyle, background: colors.white }}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: colors.darkGreen, marginBottom: '5px', letterSpacing: '0.5px' }}>UNIT</label>
                  <select value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))} style={{ ...inputStyle, background: colors.white }}>
                    {['kg', 'g', 'quintal', 'ton', 'packet'].map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: colors.darkGreen, marginBottom: '5px', letterSpacing: '0.5px' }}>DESCRIPTION</label>
                  <textarea
                    value={form.description} placeholder="Product description..."
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={e => e.target.style.borderColor = colors.mediumGreen}
                    onBlur={e => e.target.style.borderColor = colors.cream}
                  />
                </div>

                {/* Features */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: colors.darkGreen, letterSpacing: '0.5px' }}>FEATURES</label>
                    <button type="button" onClick={() => setForm(f => ({ ...f, features: [...f.features, ''] }))}
                      style={{ fontSize: '12px', fontWeight: '700', color: colors.mediumGreen, background: 'none', border: `1px solid ${colors.mediumGreen}`, borderRadius: '6px', padding: '3px 10px', cursor: 'pointer' }}>
                      + Add Feature
                    </button>
                  </div>
                  {form.features.length === 0 && <p style={{ fontSize: '12px', color: '#bbb', margin: 0 }}>No features added yet.</p>}
                  {form.features.map((feat, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <input
                        type="text" value={feat} placeholder={`Feature ${i + 1}, e.g. Organic certified`}
                        onChange={e => setForm(f => { const arr = [...f.features]; arr[i] = e.target.value; return { ...f, features: arr }; })}
                        style={{ ...inputStyle, flex: 1 }}
                        onFocus={e => e.target.style.borderColor = colors.mediumGreen}
                        onBlur={e => e.target.style.borderColor = colors.cream}
                      />
                      <button type="button" onClick={() => setForm(f => ({ ...f, features: f.features.filter((_, j) => j !== i) }))}
                        style={{ padding: '8px 12px', borderRadius: '8px', border: `2px solid ${colors.error}`, background: colors.white, color: colors.error, cursor: 'pointer', fontWeight: '700', fontSize: '13px' }}>
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                {/* Quantities */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: colors.darkGreen, letterSpacing: '0.5px' }}>QUANTITIES & PRICES</label>
                    <button type="button" onClick={() => setForm(f => ({ ...f, quantities: [...f.quantities, { label: '', price: '', originalPrice: '' }] }))}
                      style={{ fontSize: '12px', fontWeight: '700', color: colors.mediumGreen, background: 'none', border: `1px solid ${colors.mediumGreen}`, borderRadius: '6px', padding: '3px 10px', cursor: 'pointer' }}>
                      + Add Quantity
                    </button>
                  </div>
                  {form.quantities.length === 0 && <p style={{ fontSize: '12px', color: '#bbb', margin: 0 }}>No quantity options added yet.</p>}
                  {form.quantities.map((q, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '8px', marginBottom: '8px' }}>
                      <input
                        type="text" value={q.label} placeholder="Label, e.g. 25 kg bag"
                        onChange={e => setForm(f => { const arr = [...f.quantities]; arr[i] = { ...arr[i], label: e.target.value }; return { ...f, quantities: arr }; })}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = colors.mediumGreen}
                        onBlur={e => e.target.style.borderColor = colors.cream}
                      />
                      <input
                        type="number" value={q.originalPrice ?? ''} placeholder="MRP (₹)"
                        onChange={e => setForm(f => { const arr = [...f.quantities]; arr[i] = { ...arr[i], originalPrice: e.target.value }; return { ...f, quantities: arr }; })}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = colors.mediumGreen}
                        onBlur={e => e.target.style.borderColor = colors.cream}
                      />
                      <input
                        type="number" value={q.price} placeholder="Our Price (₹)"
                        onChange={e => setForm(f => { const arr = [...f.quantities]; arr[i] = { ...arr[i], price: e.target.value }; return { ...f, quantities: arr }; })}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = colors.mediumGreen}
                        onBlur={e => e.target.style.borderColor = colors.cream}
                      />
                      <button type="button" onClick={() => setForm(f => ({ ...f, quantities: f.quantities.filter((_, j) => j !== i) }))}
                        style={{ padding: '8px 12px', borderRadius: '8px', border: `2px solid ${colors.error}`, background: colors.white, color: colors.error, cursor: 'pointer', fontWeight: '700', fontSize: '13px' }}>
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button type="submit" disabled={submitting} style={{
                  padding: '12px 28px', borderRadius: '10px', border: 'none',
                  background: submitting ? '#aaa' : `linear-gradient(135deg, ${colors.darkGreen}, ${colors.mediumGreen})`,
                  color: colors.white, fontWeight: '800', fontSize: '15px',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  boxShadow: submitting ? 'none' : `0 4px 15px rgba(15,77,44,0.35)`,
                  display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s',
                }}>
                  {submitting ? (
                    <>
                      <span style={{
                        width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.4)',
                        borderTopColor: colors.white, borderRadius: '50%',
                        display: 'inline-block', animation: 'spin 0.7s linear infinite',
                      }} />
                      {editId ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    editId ? '💾 Update Product' : '🌾 Add Product'
                  )}
                </button>
                <button type="button" onClick={cancelForm} style={{ padding: '12px 20px', borderRadius: '10px', border: `2px solid ${colors.cream}`, background: colors.white, fontWeight: '700', fontSize: '14px', cursor: 'pointer', color: '#666' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {['all', ...CATEGORIES].map(cat => (
            <button key={cat} onClick={() => setFilterCat(cat)} style={{
              padding: '8px 20px', borderRadius: '50px', border: `2px solid ${filterCat === cat ? colors.darkGreen : colors.cream}`,
              background: filterCat === cat ? colors.darkGreen : colors.white,
              color: filterCat === cat ? colors.white : colors.darkGreen,
              fontWeight: '700', fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s',
            }}>
              {cat === 'all' ? '🌾 All' : cat === 'rice' ? '🍚 Rice' : cat === 'spices' ? '🌶️ Spices' : cat === 'millets' ? '🌿 Millets' : '🌾 Millet Products'}
              <span style={{ marginLeft: '6px', background: filterCat === cat ? 'rgba(255,255,255,0.2)' : colors.cream, borderRadius: '50px', padding: '1px 8px', fontSize: '11px' }}>
                {cat === 'all' ? products.length : products.filter(p => p.category?.toLowerCase() === cat).length}
              </span>
            </button>
          ))}
          {filterCat !== 'all' && (
            <button
              onClick={() => { setFilterCat('all'); }}
              style={{ padding: '8px 16px', borderRadius: '50px', border: `2px dashed ${colors.cream}`, background: colors.white, color: '#777', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Products Table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: colors.darkGreen, fontWeight: '700', fontSize: '18px' }}>🌾 Loading products...</div>
        ) : visible.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', background: colors.white, borderRadius: '16px', color: '#aaa' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🌱</div>
            <p style={{ fontWeight: '700', fontSize: '16px' }}>No products match your filters</p>
            <button
              onClick={() => { setFilterCat('all'); setSearch(''); }}
              style={{ marginTop: '12px', padding: '8px 16px', borderRadius: '20px', border: `1px solid ${colors.cream}`, background: colors.white, fontWeight: '700', cursor: 'pointer' }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="admin-table" style={{ background: colors.white, borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div className="admin-row" style={{
              display: 'grid', gridTemplateColumns: '60px 1fr 120px 90px 140px',
              background: `linear-gradient(135deg, ${colors.darkGreen}, ${colors.mediumGreen})`,
              padding: '14px 20px', color: colors.white, fontWeight: '800', fontSize: '12px', letterSpacing: '0.5px',
              gap: '10px', alignItems: 'center', position: 'sticky', top: 0, zIndex: 1,
            }}>
              <span>IMAGE</span><span>PRODUCT</span><span>CATEGORY</span><span>UNIT</span><span style={{ textAlign: 'center' }}>ACTIONS</span>
            </div>

            {visible.map((p, i) => (
              <div key={p.id} className="admin-row" style={{
                display: 'grid', gridTemplateColumns: '60px 1fr 120px 90px 140px',
                padding: '14px 20px', gap: '10px', alignItems: 'center',
                borderBottom: `1px solid ${colors.cream}`,
                background: i % 2 === 0 ? colors.white : '#fafafa',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#f0f7f3'}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? colors.white : '#fafafa'}
              >
                <img
                  src={p.images?.[0] || p.image || FALLBACK_IMG} alt={p.name}
                  style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', border: `2px solid ${colors.cream}` }}
                  onError={e => { e.target.src = FALLBACK_IMG; }}
                />
                <div>
                  <p style={{ margin: 0, fontWeight: '700', color: colors.darkGreen, fontSize: '14px' }}>{p.name}</p>
                  {p.description && <p style={{ margin: '2px 0 0', color: '#999', fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>{p.description}</p>}
                </div>
                <span style={{
                  display: 'inline-block', padding: '3px 10px', borderRadius: '50px', fontSize: '11px', fontWeight: '700',
                  background: p.category === 'rice' ? '#e8f5e9' : p.category === 'millets' ? '#e3f2fd' : p.category === 'millet products' ? '#e8eaf6' : '#fce4ec',
                  color: p.category === 'rice' ? '#2e7d32' : p.category === 'millets' ? '#1565c0' : p.category === 'millet products' ? '#283593' : '#c62828',
                }}>
                  {p.category}
                </span>
                <span style={{ color: '#666', fontSize: '13px' }}>{p.unit || 'kg'}</span>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                  <button onClick={() => startEdit(p)} style={{
                    padding: '6px 14px', borderRadius: '7px', border: `2px solid ${colors.gold}`,
                    background: colors.white, color: colors.darkGreen, fontWeight: '700', fontSize: '12px', cursor: 'pointer',
                  }}>✏️ Edit</button>
                  <button onClick={() => setDeleteConfirm(p.id)} style={{
                    padding: '6px 14px', borderRadius: '7px', border: `2px solid ${colors.error}`,
                    background: colors.white, color: colors.error, fontWeight: '700', fontSize: '12px', cursor: 'pointer',
                  }}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
