import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login () {
  const API_URL = process.env.REACT_APP_API;
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = () => {
        navigate('/');
    }
    const handleLogin = async () => {
        const user = {
          email: email,
          password: password,
        };
      
        const response = await fetch(`${API_URL}/api/loginCooperate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
      
        if (!response.ok) {
          console.log('Invalid logins');
        } else {
          const data = await response.json();
      
          if (data.user) {
            localStorage.setItem('Euser', JSON.stringify(data.user));
            let person = JSON.parse(localStorage.getItem('Euser'));
      
            if (data.success) {
              if (person && person.type_of_profile === 'Ecommerce') {
                navigate('/ecommerceDashboard');
              } else if (person && person.type_of_profile === 'information') {
                navigate('/information');
              } else {
                toast.error("User type does not exist");
              }
            } else {
              toast.error('Login failed.');
            }
          } else {
            toast.error('User data not found.');
          }
        }
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
            <ToastContainer />
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
        
        <p>If you don't have an account, you can <a href="/registration">register here</a>.</p>
            </div>
           
      
      </div>
    )
}

export default Login;
