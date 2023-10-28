import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomeT () {
    const navigate = useNavigate();
    let person = JSON.parse(localStorage.getItem('Euser'));
  
    const handleClick = () => {
      navigate('/');
  }
    return (
        <div className="home-text-page">
              <header className="header">
                    <div className="log-area">
                        <h2>{person.cooperate_name}</h2>
                    </div>
                    <div className="button-tabs">
                        <button onClick={handleClick}>Home</button>
                    </div>
                </header>
            <div className="home-text-details">
                
            </div>
        </div>
    )
}

export default HomeT;