import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
function Users() {
    const navigate = useNavigate();
const[cooperateList, setCooperateList] = useState([]);
let person = JSON.parse(localStorage.getItem('Euser'));
// useEffect(() => {
//   if(!person) {
//     navigate('/');
//   }
// },[person])
useEffect(() => {
    fetch('http://localhost:5000/api/cooperateData')
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
//  console.log(cooperateList);

 const handleClick = () => {
    navigate('/');
}

const handleClickPage = () => {
    navigate('/cooperate')
}
const logout = () => {
  localStorage.removeItem('Euser');
  navigate('/');
}
    return (
        <div className="users-page">
            <header className="header">
                <div className="log-area">
                    <h2>Sea Trust Navigator</h2>
                </div>
                <div className="button-tabs">
                    <button onClick={handleClick}>Home</button>
                </div>
                <div className="button-tabs">
                    <button onClick={logout}>Logout</button>
                </div>
            </header>
            <div className="users-content">
            <h1>Cooperative Webpages</h1>
                <div className="cooperate-cards">
                    {cooperateList.map((cooperate) => (
                         <Link
                         key={cooperate.cooperate_id}
                         to={`/ecommerce/${cooperate.cooperate_id}`} // Pass the cooperative ID as a URL parameter
                       >
                        <div key={cooperate.cooperate_id} className="cooperate-card">
                            <h2>{cooperate.cooperate_name}</h2>
                            <p onClick={handleClickPage}>Visit Page</p>
                        </div>
                       </Link>
                    
                    
                    ))}
            </div>
            </div>
        </div>
    )
}

export default Users;