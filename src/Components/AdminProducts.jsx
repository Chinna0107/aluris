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

const EMPTY_FORM = { name: '', category: 'rice', price: '', unit: 'kg', description: '', image: '', stock: '', features: [], quantities: [] };
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
    } catch {
      showToast('Failed to fetch products', 'error');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    setForm({ name: p.name, category: p.category, price: p.price, unit: p.unit || 'kg', description: p.description || '', image: p.image || '', stock: p.stock || '', features: p.features ?? [], quantities: p.quantities ?? [] });
    setEditId(p.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelForm = () => { setForm(EMPTY_FORM); setEditId(null); setShowForm(false); };

  const filtered = filterCat === 'all' ? products : products.filter(p => p.category?.toLowerCase() === filterCat);

  const inputStyle = {
    width: '100%', padding: '10px 12px', border: `2px solid ${colors.cream}`,
    borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
    fontFamily: 'inherit', transition: 'border-color 0.2s',
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

      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }`}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 20px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '28px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: '900', color: colors.darkGreen, fontFamily: '"Cinzel", serif' }}>
              🌾 Product Management
            </h1>
            <p style={{ margin: '4px 0 0', color: '#777', fontSize: '14px' }}>{products.length} products total</p>
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
              onClick={() => { localStorage.removeItem('isAdmin'); localStorage.removeItem('adminToken'); navigate('/login'); }}
              style={{ padding: '10px 18px', borderRadius: '10px', border: `2px solid ${colors.error}`, background: colors.white, color: colors.error, fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}
            >
              Logout
            </button>
          </div>
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
                  { label: 'Price (₹)', key: 'price', type: 'number', placeholder: 'e.g. 60' },
                  { label: 'Stock (qty)', key: 'stock', type: 'number', placeholder: 'e.g. 100' },
                  { label: 'Image URL', key: 'image', type: 'url', placeholder: 'https://...' },
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
                    <button type="button" onClick={() => setForm(f => ({ ...f, quantities: [...f.quantities, { label: '', price: '' }] }))}
                      style={{ fontSize: '12px', fontWeight: '700', color: colors.mediumGreen, background: 'none', border: `1px solid ${colors.mediumGreen}`, borderRadius: '6px', padding: '3px 10px', cursor: 'pointer' }}>
                      + Add Quantity
                    </button>
                  </div>
                  {form.quantities.length === 0 && <p style={{ fontSize: '12px', color: '#bbb', margin: 0 }}>No quantity options added yet.</p>}
                  {form.quantities.map((q, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '8px', marginBottom: '8px' }}>
                      <input
                        type="text" value={q.label} placeholder="Label, e.g. 25 kg bag"
                        onChange={e => setForm(f => { const arr = [...f.quantities]; arr[i] = { ...arr[i], label: e.target.value }; return { ...f, quantities: arr }; })}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = colors.mediumGreen}
                        onBlur={e => e.target.style.borderColor = colors.cream}
                      />
                      <input
                        type="number" value={q.price} placeholder="Price (₹)"
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
                <button type="submit" style={{
                  padding: '12px 28px', borderRadius: '10px', border: 'none',
                  background: `linear-gradient(135deg, ${colors.darkGreen}, ${colors.mediumGreen})`,
                  color: colors.white, fontWeight: '800', fontSize: '15px', cursor: 'pointer',
                  boxShadow: `0 4px 15px rgba(15,77,44,0.35)`,
                }}>
                  {editId ? '💾 Update Product' : '🌾 Add Product'}
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
        </div>

        {/* Products Table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: colors.darkGreen, fontWeight: '700', fontSize: '18px' }}>🌾 Loading products...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', background: colors.white, borderRadius: '16px', color: '#aaa' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🌱</div>
            <p style={{ fontWeight: '700', fontSize: '16px' }}>No products found</p>
          </div>
        ) : (
          <div style={{ background: colors.white, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '60px 1fr 100px 80px 80px 80px 140px',
              background: `linear-gradient(135deg, ${colors.darkGreen}, ${colors.mediumGreen})`,
              padding: '14px 20px', color: colors.white, fontWeight: '800', fontSize: '12px', letterSpacing: '0.5px',
              gap: '10px', alignItems: 'center',
            }}>
              <span>IMAGE</span><span>PRODUCT</span><span>CATEGORY</span><span>PRICE</span><span>UNIT</span><span>STOCK</span><span style={{ textAlign: 'center' }}>ACTIONS</span>
            </div>

            {filtered.map((p, i) => (
              <div key={p.id} style={{
                display: 'grid', gridTemplateColumns: '60px 1fr 100px 80px 80px 80px 140px',
                padding: '14px 20px', gap: '10px', alignItems: 'center',
                borderBottom: `1px solid ${colors.cream}`,
                background: i % 2 === 0 ? colors.white : '#fafafa',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#f0f7f3'}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? colors.white : '#fafafa'}
              >
                <img
                  src={p.image || FALLBACK_IMG} alt={p.name}
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
                <span style={{ fontWeight: '700', color: colors.darkGreen, fontSize: '14px' }}>₹{p.price}</span>
                <span style={{ color: '#666', fontSize: '13px' }}>{p.unit || 'kg'}</span>
                <span style={{ fontWeight: '600', color: p.stock > 10 ? colors.success : colors.error, fontSize: '13px' }}>{p.stock ?? '—'}</span>
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
