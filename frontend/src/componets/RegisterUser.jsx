import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function RegisterUser() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      setError("Password and Confirm Password do not match.");
      return;
    }

    // Create a user object from formData
    const user = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    console.log('user', user);

    // Perform registration logic using the Fetch API
    fetch('http://localhost:5000/api/registerUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          // Registration successful, you can navigate the user to another page
          navigate('/success');
        } else {
          // Handle registration error
          setError("Registration failed. Please try again.");
        }
      });
  };

  return (
    <div className="register-user">
      <header className="header">
        <div className="log-area">
          <h2>Sea Trust Navigator</h2>
        </div>
        <div className="button-tabs">
          <button onClick={handleClick}>Home</button>
        </div>
      </header>
      <div className="reg-container">
        <div className="registration-container">
          <h2>Register User</h2>
          <form onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
