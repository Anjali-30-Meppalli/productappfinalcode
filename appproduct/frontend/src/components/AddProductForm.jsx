import { useState } from 'react';
import { TextField, Button } from '@mui/material';

const AddProductForm = () => {
    const [product, setProduct] = useState({ name: '', price: '', description: '', image: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Send product data to the backend
        const response = await fetch('http://localhost:5001/add-product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure admin is logged inx
            },
            body: JSON.stringify(product),
        });
        if (response.ok) {
            alert('Product added successfully!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <br /><br /><TextField name="title" label="Product Name" onChange={handleInputChange} /><br /><br />
            <TextField name="price" label="Price" onChange={handleInputChange} /><br /><br />
            <TextField name="category" label="Description" onChange={handleInputChange} /><br /><br />
            <TextField name="image" label="Image URL" onChange={handleInputChange} /><br /><br />
            <Button type="submit" variant="contained">Add Product</Button><br />
        </form>
    );
};

export default AddProductForm;
