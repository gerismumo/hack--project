import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleLoginChange = (e) => {
        const targetLink = e.target.value;
        if (targetLink) {
            return navigate(targetLink);
        }
    }

    return (
        <div className="home-page">
            <header className="header">
                <div className="log-area">
                    <h2>Sea Trust Navigator</h2>
                </div>
                <select onChange={handleLoginChange}>
                    <option value="">Login as</option>
                    <option value="/login">Cooperate</option>
                    <option value="/loginUser">User</option>
                </select>
            </header>
            <div className="home-content">
                <h1>Welcome to BlueSecureCoop</h1>
                <p>Connecting Cooperatives for a Sustainable Blue Economy</p>
            </div>
            <div className="features">
                <div className="feature">
                    <h3>Join the Blue Economy</h3>
                    <p>Be part of the sustainable blue economy by connecting with cooperatives that promote ocean-friendly practices.</p>
                </div>
                <div className="feature">
                    <h3>Support Local Communities</h3>
                    <p>Empower local communities and small-scale fisheries by engaging with cooperatives that focus on community well-being.</p>
                </div>
                <div className="feature">
                    <h3>Explore Ocean Products</h3>
                    <p>Discover a wide range of ocean products, from fresh seafood to handmade crafts, offered by cooperatives in your region.</p>
                </div>
            </div>
        </div>
    )
}

export default Home;
