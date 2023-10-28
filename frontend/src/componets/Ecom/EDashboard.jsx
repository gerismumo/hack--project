import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EDashboard() {
    const navigate = useNavigate();
    let person = JSON.parse(localStorage.getItem('Euser'));
    const cooperate_id = person.cooperate_id;
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        // image: null, // Store the selected image file
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // formData.append('image', product.image);
        const requestData = {
          name: product.name,
          price: product.price,
          description: product.description,
        //   image: product.image,
          cooperate_id: cooperate_id,
        };
        console.log(requestData);
      
        // Send the product data to the server to save in the database
        fetch('http://localhost:5000/api/insertproducts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData), // Use JSON.stringify to convert the object to a JSON string
        })
          .then((response) => {
            if (response.ok) {
              // Product added successfully, you can show a success message
              console.log('Product added successfully');
            } else {
              // Handle errors
              console.error('Failed to add product');
            }
          })
          .catch((error) => {
            console.error('Error adding product:', error);
          });
      
        // Clear the form fields after submission
        setProduct({ name: '', price: '', description: '' });
      };
      

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'file') {
            // If the input type is file, store the selected image file
            setProduct({ ...product, [name]: e.target.files[0] });
        } else {
            setProduct({ ...product, [name]: value });
        }
    };

    const handleClick = () => {
        navigate('/');
    }

    const handleClickSite = () => {
        navigate('/cooperate');
    }

    return (
        <div className="admin-dashboard">
            <header className="header">
                <div className="log-area">
                    <h2>Sea Trust Navigator</h2>
                </div>
                <div className="button-tabs">
                    <button onClick={handleClick}>Home</button>
                </div>
                <div className="button-tabs">
                    <button onClick={handleClickSite}>WebPage</button>
                </div>
            </header>
            <div className="ecommerce-dashboard">
                <h2>Dashboard</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* <div className="form-group">
                        <label>Image:</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            required
                        />
                    </div> */}
                    <button type="submit">Add Product</button>
                </form>
            </div>
        </div>
    );
}

export default EDashboard;
