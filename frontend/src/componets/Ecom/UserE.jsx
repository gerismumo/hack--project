import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UserE() {
  const { id } = useParams();
  console.log('id', id);
  const navigate = useNavigate();
  let person = JSON.parse(localStorage.getItem('Euser'));
  const [cooperateList, setCooperateList] = useState([]);
  const [productList, setProductList] = useState([]);

  const handleClick = () => {
    navigate('/');
  }

  useEffect(() => {
    fetch(`http://localhost:5000/api/selectCooperateById/${id}`) // Remove the colon
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .then((data) => {
        setCooperateList(data.data);
      })
      .catch((error) => {
        console.error('Error fetching cooperative data:', error);
      });
  }, [id]); 
//   console.log('cooperateList',cooperateList);

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
  console.log('productList',productList)

//   const cooperate_id = person.cooperate_id;

  const matchingCooperate = cooperateList.find((cooperate) => cooperate.cooperate_id == id);
//   console.log('matching cooperate',matchingCooperate)
  return (
    <div className="home-commerce">
      <header className="header">
        <div className="log-area">
          <h2>{person.cooperate_name}</h2>
        </div>
        <div className="button-tabs">
          <button onClick={handleClick}>Home</button>
        </div>
      </header>
      <div className="commerce-details">
        <div className="App">
          <div className="products">
            {matchingCooperate ? (
              productList.map((product) => (
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
          <div className="cart">
            <h2>Shopping Cart</h2>
            {/* Cart items go here */}
            <div className="total">
              <p>Total: $0.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserE;
