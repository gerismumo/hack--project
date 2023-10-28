
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomeE() {
  const navigate = useNavigate();
  let person = JSON.parse(localStorage.getItem('Euser'));
  const[cooperateList, setCooperateList] = useState([]);

  const handleClick = () => {
    navigate('/');
}

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
      setCooperateList(data.cooperates);
    })
    .catch((error) => {
      console.error('Error fetching cooperative data:', error);
    });
}, []);

const cooperate_id  = person.cooperate_id;
// console.log(cooperate_id);
console.log('cooperateList',cooperateList);
const matchingCooperate = cooperateList.find((cooperate) => cooperate.cooperate_id === cooperate_id);
// console.log(' matchingCooperate ',matchingCooperate);


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
      {/* <h1>E-commerce Website</h1> */}
      <div className="products">
        {matchingCooperate ? (
          cooperateList.map((product) => (
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

export default HomeE;