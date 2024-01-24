import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EDashboard()  {
    const navigate = useNavigate();
    let person = JSON.parse(localStorage.getItem('Euser'));
    const cooperate_id = person.cooperate_id;
    const[name, setName] = useState('');
    const[price, setPrice] = useState('');
    const[description, setDescription] = useState('');
    const[image, setImage] = useState(null);

   

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(name, price, description, image);

        const formData = new FormData();

        formData.append('image', image);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description',description);
        formData.append('cooperate_id', cooperate_id);

        // const requestData = {
        //   name: product.name,
        //   price: product.price,
        //   description: product.description,
        //   cooperate_id: cooperate_id,
        // };

        // console.log(requestData);
      
       
        
      try {
        const response = await axios.post('http://localhost:5000/api/insertProducts', formData);
        console.log(response);

      } catch(error) {
        console.log(error.message);
      }
    }

    // const handleChange = (e) => {
    //     const { name, value, type } = e.target;

    //     if (type === 'file') {
           
    //         setProduct({ ...product, [name]: e.target.files[0] });
    //     } else {
    //         setProduct({ ...product, [name]: value });
    //     }
    // };

    const handleClick = () => {
        navigate('/');
    }

    const handleClickSite = () => {
        navigate('/cooperate');
    }

    const logout = () => {
        localStorage.removeItem('Euser');
        navigate('/');
    }
    useEffect(() => {
        if(!person) {
          navigate('/');
        }
      },[person])

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
                <div className="button-tabs">
                    <button onClick={logout}>Logout</button>
                </div>
            </header>
            <div className="ecommerce-dashboard">
                <h2>Post your products here:</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Image:</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            required
                        />
                    </div>
                    <button type="submit">Add Product</button>
                </form>
            </div>
        </div>
    );
}

export default EDashboard;