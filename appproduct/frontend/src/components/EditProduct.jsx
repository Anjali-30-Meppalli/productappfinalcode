import { useEffect, useState } from 'react';
import { TextField, Button, patch } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
    const params = useParams()

    const [product, setProduct] = useState({ name: '', price: '', description: '', image: '' });
    const [productID, setProductId] = useState()
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    useEffect(() => {
        setProductId(params.id);
        axios.get(`http://localhost:5001/product-list/${params.id}`)
            .then((response) => {
                console.log(response.data);
                setProduct(response.data)

            })
            .catch((err) => {
                alert("Data not found")
            })
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Send product data to the backend
        const response = await fetch('http://localhost:5001/add-product', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure admin is logged inx
            },
            body: JSON.stringify(product),
        });
        if (response.ok) {
            alert('Product updated successfully!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField name="title" value={product?.title} label="Product Name" onChange={handleInputChange} /><br /><br />
            <TextField name="price" value={product?.price} label="Price" onChange={handleInputChange} /><br /><br />
            <TextField name="category" value={product?.category} label="Description" onChange={handleInputChange} /><br /><br />
            <TextField name="image" value={product?.image} label="Image URL" onChange={handleInputChange} /><br /><br />
            <Button type="submit" variant="contained">update Product</Button>
        </form>

    );
};

export default EditProduct;
