
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomeE() {
  const navigate = useNavigate();
  let person = JSON.parse(localStorage.getItem('Euser'));
  const[cooperateList, setCooperateList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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
// console.log('cooperativelist',cooperateList)
const[openCurrenPage, setOpenCurrentPage] = useState(false);
const cooperate_id  = person?.cooperate_id;

useEffect(() => {
  if(cooperate_id === undefined ) {
    setOpenCurrentPage(false);
    navigate('/');
  }else {
    setOpenCurrentPage(true);
  }
},[cooperate_id]);


const matchingCooperate = cooperateList.filter((cooperate) => cooperate.cooperate_id === cooperate_id);
// console.log('matchingCooperate',matchingCooperate);

const logout = () => {
  localStorage.removeItem('Euser');
 
}

// useEffect(() => {
//   if(!person) {
//     navigate('/');
//   }
// },[person]);
  return (
    <>
    {openCurrenPage && (
      <div className="home-commerce">
      <header className="header">
                <div className="log-area">
                    <h2>{person.cooperate_name}</h2>
                </div>
                <div className="button-tabs">
                    <button onClick={handleClick}>Home</button>
                </div>
                <div className="button-tabs">
                    <button onClick={logout}>Logout</button>
                </div>
      </header>
      <div className="commerce-details">
      <div className="App">
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
      {/* <h1>E-commerce Website</h1> */}
      <div className="products">
        {matchingCooperate.length > 0 ? (
          matchingCooperate.map((cooperate) => (
            <div key={cooperate.product_id} className="product">
              <h3>{cooperate.product_name}</h3>
              <p>Description: {cooperate.product_text}</p>
              <p>Price: ${cooperate.product_price}</p>
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
    </>
    
  )
}

export default HomeE;