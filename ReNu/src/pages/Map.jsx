import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '../firebase';

const mapContainerStyle = {
  width: '70%',
  height: '91vh',
};

const sidebarStyle = {
  width: '30%',
  height: '91vh',
  position: 'absolute',
  right: 0,
  top: 0,
  backgroundColor: 'white',
  padding: '15px',
  boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.1)',
  overflowY: 'auto',
};

const filterContainerStyle = {
  marginBottom: '15px',
  padding: '10px',
  backgroundColor: '#f5f5f5',
  borderRadius: '5px',
};

// BCG Toronto location
const bcgLocation = {
  lat: 43.64411,
  lng: -79.37704,
};

const Map = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState(40); // Default max price set to $40
  const [categories, setCategories] = useState([]);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const database = getDatabase(app);
        const productsRef = ref(database, 'products');

        onValue(productsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const productsList = Object.entries(data).map(([id, values]) => ({
              id,
              ...values
            }));

            setProducts(productsList);
            setFilteredProducts(productsList);

            // Extract unique categories
            const uniqueCategories = [...new Set(productsList.map(product => product.category))];
            setCategories(uniqueCategories);
          } else {
            setProducts([]);
            setFilteredProducts([]);
          }
          setLoading(false);
        }, (error) => {
          console.error('Error fetching products:', error);
          setError('Failed to load products');
          setLoading(false);
        });
      } catch (error) {
        console.error('Error setting up database listener:', error);
        setError('Failed to connect to database');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters when filter states change
  useEffect(() => {
    if (products.length > 0) {
      let filtered = [...products];

      // Apply category filter
      if (categoryFilter !== 'all') {
        filtered = filtered.filter(product => product.category === categoryFilter);
      }

      // Apply price filter
      filtered = filtered.filter(product => {
        const price = Number(product.price) || 0;
        return price <= priceFilter;
      });

      setFilteredProducts(filtered);
    }
  }, [categoryFilter, priceFilter, products]);

  const getCategoryStyle = (category) => {
    const styles = {
      'cupboard': { url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png' },
      'ecommerce': { url: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png' },
      'cooking pack': { url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png' },
    };

    return styles[category] || { url: 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png' };
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPriceFilter(Number(e.target.value));
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    // Center map on clicked product
    if (product.latitude && product.longitude) {
      map?.panTo({ lat: Number(product.latitude), lng: Number(product.longitude) });
    }
  };

  const [map, setMap] = useState(null);

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ position: 'relative', display: 'flex' }}>
      {/* Map Section */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={bcgLocation}
        zoom={15}
        onLoad={map => setMap(map)}
      >
        {/* BCG Toronto location marker */}
        <Marker
          position={bcgLocation}
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            scaledSize: new google.maps.Size(60, 60),
          }}
          label={{
            text: 'YOU',
            color: '#000000',
            fontSize: '16px',
            fontWeight: 'bold',
            className: 'marker-label',
          }}
        />

        {filteredProducts.map((product) => {
          if (product.latitude && product.longitude) {
            const categoryStyle = getCategoryStyle(product.category);

            return (
              <Marker
                key={product.id}
                position={{ lat: Number(product.latitude), lng: Number(product.longitude) }}
                icon={{
                  url: categoryStyle.url,
                  scaledSize: new google.maps.Size(45, 45),
                }}
                onClick={() => setSelectedProduct(product)}
              />
            );
          }
          return null;
        })}

        {selectedProduct && (
          <InfoWindow
            position={{
              lat: Number(selectedProduct.latitude),
              lng: Number(selectedProduct.longitude)
            }}
            onCloseClick={() => setSelectedProduct(null)}
          >
            <div style={{ padding: '10px', maxWidth: '300px' }}>
              <h2 style={{ fontSize: '20px', margin: '0 0 8px 0', fontWeight: 'bold' }}>{selectedProduct.name}</h2>
              <p style={{ fontSize: '18px', margin: '0 0 8px 0', color: '#2E7D32' }}>
                <strong>${Number(selectedProduct.price).toFixed(2)}</strong>
              </p>
              {selectedProduct.co2_emissions !== undefined && (
                <p style={{ fontSize: '16px', margin: '0 0 8px 0' }}>
                  CO₂ Emissions: {selectedProduct.co2_emissions}kg
                </p>
              )}
              {selectedProduct.image_url && (
                <div style={{ textAlign: 'center', margin: '8px 0' }}>
                  <img
                    src={selectedProduct.image_url}
                    alt={selectedProduct.name}
                    style={{ maxWidth: '100%', maxHeight: '120px', objectFit: 'contain' }}
                  />
                </div>
              )}
              <p style={{ fontSize: '16px', margin: '0 0 12px 0', lineHeight: '1.4' }}>
                {selectedProduct.description}
              </p>

              {/* Add Claim Button */}
              <button
                onClick={() => {
                  // Use the exact CO2 emissions value from the product
                  const co2Saved = selectedProduct.co2_emissions ?
                    selectedProduct.co2_emissions :
                    "4"; // Default value if co2_emissions is not defined

                  alert(`${selectedProduct.name} has been added to your cart!\nYou saved ${co2Saved}kg of CO₂ emissions! 🌱`);
                }}
                style={{
                  backgroundColor: '#2E7D32',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '8px 16px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  width: '100%',
                  marginTop: '10px'
                }}
              >
                Claim
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Sidebar for Product Listings */}
      <div style={sidebarStyle}>
        <h2 style={{ fontSize: '24px', margin: '0 0 15px 0', borderBottom: '2px solid #2E7D32', paddingBottom: '8px' }}>
          Products
        </h2>

        {/* Filters Section */}
        <div style={filterContainerStyle}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Filters</h3>

          {/* Category Filter */}
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="category" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Category:
            </label>
            <select
              id="category"
              value={categoryFilter}
              onChange={handleCategoryChange}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label htmlFor="price" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Max Price: ${priceFilter}
            </label>
            <input
              type="range"
              id="price"
              min="0"
              max="40"
              step="1"
              value={priceFilter}
              onChange={handlePriceChange}
              style={{ width: '100%', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
              <span>$0</span>
              <span>$40</span>
            </div>
          </div>
        </div>

        {/* Product Count */}
        <p style={{ marginBottom: '15px' }}>
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
        </p>

        {/* Product List with Category Color Indicators */}
        {filteredProducts.length === 0 ? (
          <p>No products match your filters.</p>
        ) : (
          <div>
            {filteredProducts.map(product => (
              <div
                key={product.id}
                style={{
                  padding: '10px',
                  marginBottom: '10px',
                  border: selectedProduct?.id === product.id ? '2px solid #2E7D32' : '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  backgroundColor: selectedProduct?.id === product.id ? '#f0f7f0' : 'white',
                }}
                onClick={() => handleProductClick(product)}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        marginRight: '10px',
                        borderRadius: '4px'
                      }}
                    />
                  )}
                  <div style={{ flexGrow: 1 }}>
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>{product.name}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ margin: '0 0 5px 0', color: '#2E7D32', fontWeight: 'bold' }}>
                        ${Number(product.price).toFixed(2)}
                      </p>
                      <span
                        style={{
                          display: 'inline-block',
                          backgroundColor: getCategoryPillColor(product.category),
                          color: 'white',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          fontSize: '12px'
                        }}
                      >
                        {product.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .marker-label {
          background-color: rgba(255, 255, 255, 0.9);
          padding: 3px 6px;
          border-radius: 4px;
          border: 2px solid #ff0000;
          white-space: nowrap;
          position: relative;
          top: -6px;
          font-weight: 900 !important;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

function getCategoryPillColor(category) {
  const colors = {
    'cupboard': '#4CAF50',
    'ecommerce': '#FFC107',
    'cooking pack': '#2196F3',
  };

  return colors[category] || '#9C27B0';
}

export default Map;