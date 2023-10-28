import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Login () {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = () => {
        navigate('/');
    }
    const handleLogin = () => {
        const user = {
            email: email,
            password: password,
          };
     
          fetch('http://localhost:5000/api/loginCooperate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          })
            .then((response) => {
              if (response.ok) {
                navigate('/dashboard');
              } else {
                console.error('Login failed');
              }
            });
      };

    return (
        <div className="login">
             <header className="header">
                <div className="log-area">
                    <h2>Sea Trust Navigator</h2>
                </div>
                <div className="button-tabs">
                    <button onClick={handleClick}>Home</button>
                </div>
            </header>
            <div className="login-container">
            <h2>Login</h2>
        <div className="input-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
        <p>If you don't have an account, you can <a href="/registration">register here</a>.</p>
            </div>
           
      
      </div>
    )
}

export default Login;
