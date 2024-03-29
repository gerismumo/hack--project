import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function LoginUser () {
  const API_URL = process.env.REACT_APP_API;
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
      console.log(user);
          fetch(`${API_URL}/api/loginUser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user), 
          })
            .then((response) => {
              if (response.ok) {
                return response.json(); 
              } else {
                throw new Error('Login failed'); 
              }
            })
            .then((data) => {
              console.log('Login successful', data);
             navigate('/usersPage')
            })
            .catch((error) => {
              toast.error('Login failed', error);
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
            <ToastContainer/>
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
        <div className="login-button">
            <button onClick={handleLogin}>Login</button>
        </div>
        
        <p>If you don't have an account, you can <a href="/registerUser">register here</a>.</p>
            </div>
           
      
      </div>
    )
}

export default LoginUser;
