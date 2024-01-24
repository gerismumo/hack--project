// Registration.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Registration() {
  const API_URL = process.env.REACT_APP_API;
    const navigate = useNavigate();

    const[openForm, setOpenForm] = useState(true);
    const[openPay, setOpenPay] = useState(false);

    const handleClick = () => {
        navigate('/');
    }
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNumber: '',
    typeOfProfile: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [error, setError] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (formData.password !== formData.confirmPassword) {
        setError("Password and Confirm Password do not match.");
        return;
      }
  
      // Create a user object from formData
      const user = {
        companyName: formData.companyName,
        email: formData.email,
        password: formData.password,
        contactNumber: formData.contactNumber,
        typeOfProfile: formData.typeOfProfile,
      };
  
      console.log('user',user);
      fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then((response) => {
          if (response.ok) {
            setOpenForm(false);
            setOpenPay(true);
          } else {
           
            setError("Registration failed. Please try again.");
          }
        });
  };

  const handlePay = () => {
    setOpenPay(false);
    setOpenForm(true);
    navigate('/login');
  }
  return (
    <>
      <div className="registration">
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
                {openForm && (
                  <>
                  <h2>Register Your Cooperative</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Company Name</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
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
                      <label>Type of Profile</label>
                      <select 
                      name="typeOfProfile"
                      value={formData.typeOfProfile}
                      onChange={handleChange}
                      >
                        <option value=""></option>
                        <option value="Ecommerce">E commerce Page</option>
                        <option value="information">Blogs Information</option>
                        <option value="information">Static websites</option>
                        <option value="information">Forums</option>
                        <option value="information">Social networks</option>
                        <option value="information">Portfolios</option>
                      </select>
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
                    <div className="form-group">
                      <label>Contact Number</label>
                      <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <button type="submit">Register</button>
                    <p> <p>If you have an account, you can <a href="/login">login here</a>.</p></p>
                  </form>
                  </>
                )}
                {openPay && (
                  <div className="">
                    <p>Amount to pay: $99.99</p>
                    <button onClick={handlePay}>Pay</button>
                  </div>
                )}
                  </div>
              
              </div>
          
      
      </div>
    </>
    
  );
}

export default Registration;
