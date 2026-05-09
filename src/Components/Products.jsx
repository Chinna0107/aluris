import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Products() {
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const colors = {
    darkGreen: '#0f4d2c',
    deepGreen: '#1b5e3c',
    mediumGreen: '#1b6b3d',
    gold: '#d4af37',
    cream: '#f3eadc',
    white: '#ffffff'
  };

  // STATIC PRODUCTS ONLY
  const products = {
    rice: [
      {
        id: 1,
        name: 'Premium Basmati Rice',
        category: 'Rice',
        description: 'Long grain aromatic rice',
        image:
          'https://m.media-amazon.com/images/I/71Xr6s7fYWL.jpg',
        price: 120,
        unit: 'kg'
      },
      {
        id: 2,
        name: 'Sona Masoori Rice',
        category: 'Rice',
        description: 'Lightweight daily-use rice',
        image:
          'https://m.media-amazon.com/images/I/81J8h6gKk-L.jpg',
        price: 65,
        unit: 'kg'
      },
      {
        id: 3,
        name: 'Brown Rice',
        category: 'Rice',
        description: 'Healthy whole grain rice',
        image:
          'https://m.media-amazon.com/images/I/71xZ4jY7JfL.jpg',
        price: 95,
        unit: 'kg'
      }
    ],

    millets: [
      {
        id: 4,
        name: 'Foxtail Millet',
        category: 'Millets',
        description: 'Rich in protein and fiber',
        image:
          'https://m.media-amazon.com/images/I/71W8KzQ9YQL.jpg',
        price: 90,
        unit: 'kg'
      },
      {
        id: 5,
        name: 'Pearl Millet',
        category: 'Millets',
        description: 'Nutritious millet grain',
        image:
          'https://m.media-amazon.com/images/I/71LJ8h4v4xL.jpg',
        price: 80,
        unit: 'kg'
      },
      {
        id: 6,
        name: 'Finger Millet (Ragi)',
        category: 'Millets',
        description: 'Calcium rich millet',
        image:
          'https://m.media-amazon.com/images/I/71tS9M7X9nL.jpg',
        price: 75,
        unit: 'kg'
      }
    ]
  };

  const allProducts = [...products.rice, ...products.millets];

  const displayProducts =
    activeCategory === 'all'
      ? allProducts
      : products[activeCategory];

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        paddingTop: '80px',
        background:
          'linear-gradient(180deg, #071508 0%, #0a1f0f 30%, #071508 100%)'
      }}
    >
      {/* CATEGORY BUTTONS */}
      <section
        style={{
          padding: '30px 20px',
          textAlign: 'center'
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          {['all', 'rice', 'millets'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              style={{
                padding: '12px 25px',
                borderRadius: '40px',
                border: `2px solid ${colors.gold}`,
                background:
                  activeCategory === category
                    ? colors.gold
                    : 'transparent',
                color:
                  activeCategory === category
                    ? colors.darkGreen
                    : colors.white,
                fontWeight: '800',
                cursor: 'pointer',
                transition: '0.3s'
              }}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section
        style={{
          padding: '20px'
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '25px'
          }}
        >
          {displayProducts.map((product) => (
            <div
              key={product.id}
              style={{
                background:
                  'linear-gradient(160deg, #0f3d20 0%, #071a0d 100%)',
                borderRadius: '20px',
                overflow: 'hidden',
                border: `1px solid ${colors.gold}`,
                transition: '0.3s',
                boxShadow: '0 5px 20px rgba(0,0,0,0.4)'
              }}
            >
              {/* IMAGE */}
              <div
                style={{
                  height: '220px',
                  background: '#fff',
                  padding: '15px'
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>

              {/* CONTENT */}
              <div
                style={{
                  padding: '18px'
                }}
              >
                <span
                  style={{
                    background: colors.gold,
                    color: colors.darkGreen,
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '700'
                  }}
                >
                  {product.category}
                </span>

                <h3
                  style={{
                    color: colors.white,
                    marginTop: '15px',
                    marginBottom: '10px',
                    fontSize: '20px'
                  }}
                >
                  {product.name}
                </h3>

                <p
                  style={{
                    color: '#b8d5c3',
                    fontSize: '14px',
                    lineHeight: '1.6'
                  }}
                >
                  {product.description}
                </p>

                <h2
                  style={{
                    color: colors.gold,
                    marginTop: '15px'
                  }}
                >
                  ₹{product.price}/{product.unit}
                </h2>

                {/* BUTTONS */}
                <div
                  style={{
                    display: 'flex',
                    gap: '10px',
                    marginTop: '20px'
                  }}
                >
                  <Link
                    to={`/products/${product.id}`}
                    style={{
                      flex: 1,
                      textDecoration: 'none'
                    }}
                  >
                    <button
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '10px',
                        border: `1px solid ${colors.gold}`,
                        background: 'transparent',
                        color: colors.gold,
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      Details
                    </button>
                  </Link>

                  <Link
                    to="/quote"
                    style={{
                      flex: 1,
                      textDecoration: 'none'
                    }}
                  >
                    <button
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '10px',
                        border: 'none',
                        background: colors.gold,
                        color: colors.darkGreen,
                        fontWeight: '800',
                        cursor: 'pointer'
                      }}
                    >
                      Quote
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Products;