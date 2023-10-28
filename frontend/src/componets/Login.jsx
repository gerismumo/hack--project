import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Login () {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = () => {
        navigate('/');
    }
    const handleLogin = async() => {
        const user = {
            email: email,
            password: password,
          };
     
          const response = await fetch('http://localhost:5000/api/loginCooperate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          })
              if (!response.ok) {
                console.log('Invalid logins');
              } 
              const data = await response.json();
            //   console.log(data.user);
              localStorage.setItem('Euser', JSON.stringify(data.user));
              let person = JSON.parse(localStorage.getItem('Euser'));
              console.log('person',person);
              if(data.success) {
                if(person.type_of_profile === 'Ecommerce') {
                    navigate('/cooperate');
                
                } else if (person.type_of_profile === "information") {
                    navigate('/information');
                } else {

                }
              } else {
                    console.log('Failed to');
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
