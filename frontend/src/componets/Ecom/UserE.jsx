import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UserE() {
  const { id } = useParams();
  console.log('id', id);
  const navigate = useNavigate();
  let person = JSON.parse(localStorage.getItem('Euser'));
  console.log(' person',person);
  const [cooperateList, setCooperateList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

  const handleClick = () => {
    navigate('/');
  }

  // useEffect(() => {
  //   fetch(`http://localhost:5000/api/selectCooperateById/${id}`) // Remove the colon
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         throw new Error('Failed to fetch data');
  //       }
  //     })
  //     .then((data) => {
  //       setCooperateList(data.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching cooperative data:', error);
  //     });
  // }, [id]); 

  useEffect(() => {
    fetch(`http://localhost:5000/api/selectCooperateById/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching cooperative data');
            }
            return response.json();
        })
        .then(data => {
            if (data.success && Array.isArray(data.data)) {
                setCooperateList(data.data);
                setLoading(false);
            } else {
                console.log('Unexpected data format:', data);
            }
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
}, [id]);
  console.log('cooperateList',cooperateList);

  useEffect(() => {
    fetch('http://localhost:5000/api/selectProducts')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .then((data) => {
        setProductList(data.cooperates);
      })
      .catch((error) => {
        console.error('Error fetching cooperative data:', error);
      });
  }, []);
  console.log('productList',productList.cooperate_id);

//   const cooperate_id = person.cooperate_id;

  const matchingCooperate = cooperateList.find((cooperate) => cooperate.cooperate_id == id);
  console.log('matchingCooperate',matchingCooperate);
  // if(matchingCooperate) {
  //   const cooperateName = matchingCooperate.cooperate_name;
  // }

const filteredProducts = productList.filter((product) => product.cooperate_id == matchingCooperate.cooperate_id);
  console.log('filteredProducts', filteredProducts);

  const logout = () => {
    localStorage.removeItem('Euser');
    navigate('/');
}

  return (
    <div>
      {loading && <p>...loading</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <div className="home-commerce">
        <header className="header">
          <div className="log-area">
            <h2>{matchingCooperate ? (matchingCooperate.cooperate_name):('')}</h2>
          </div>
          <div className="button-tabs">
            <button onClick={handleClick}>Home</button>
          </div>
          <div className="button-tabs">
                      <button onClick={logout}>Logout</button>
            </div>
        </header>
        <div className="commerce-details">
        <div className="product-search">
              <input
                type="text"
                placeholder="Search for products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="cart">
              <h2>Shopping Cart</h2>
              {/* Cart items go here */}
              <div className="total">
                <p>Total: $0.00</p>
              </div>
            </div>
            </div>
          <div className="App">
            <div className="products">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div key={product.cooperate_id} className="product">
                    <h3>{product.product_name}</h3>
                    <p>{product.product_text}</p>
                    <p>${product.product_price}</p>
                    <button>Add to Cart</button>
                  </div>
                ))
              ) : (
                <p>No available Data</p>
              )}
            </div>
            
          </div>
        </div>
      </div>
      )}
    </div>
    
  )
}

export default UserE;
