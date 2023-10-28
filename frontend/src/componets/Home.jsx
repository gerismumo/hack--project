import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    // const handleLoginClick = () => {
    //     navigate('/login');
    // }
    const handleLoginChange = (e) => {
        const targetLink = e.target.value;
        // console.log(targetLink);
        if(targetLink) {
            return navigate(targetLink);
        }
    }
    return(
        <div className="home-page">
            <header className="header">
                <div className="log-area">
                    <h2>Sea Trust Navigator</h2>
                </div>
                {/* <div className="button-tabs">
                    <button onClick={handleLoginClick}>LOGIN</button>
                </div> */}
                <select onChange={handleLoginChange}>
                    <option value="" >Login as</option>
                    <option value="/login">Cooperate</option>
                    <option value="/loginUser">User</option>
                </select>
            </header>
            <div className="home-content">
                <h1>Welcome to BlueSecureCoop</h1>
                <p>Connecting Cooperatives for a Sustainable Blue Economy</p>
            </div>
        </div>    
    )
}

export default Home;