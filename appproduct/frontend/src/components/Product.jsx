import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Grid, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Product = () => {
    const [products, setProducts] = useState([]);
    const[role,setRole]=useState();
    const navigate = useNavigate();
    const { addToCart } = useCart(); // Use the cart context
    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5001/product-list");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    useEffect(() => {
        fetchProducts();
        const roleDetails = localStorage.getItem('role');
        setRole(roleDetails)
    }, []);

    const handleEdit = (product) => {
        navigate(`/add-product/${product._id}`)
    }
    const handleDelete = (product) => {
        axios.delete(`http://localhost:5001/delete-product/${product._id}`).then((response) => {
            alert("Product deleted")
            fetchProducts()
        })
            .catch((err) => {
                alert("something wrong")
            })
    }
    const handleAddToCart = (product) => {
        addToCart(product); // Add product to cart
        navigate('/cart'); // Navigate to the cart page
    };

    return (
        <div>
            <h1>"Discover the perfect blend of quality and style—explore our latest arrivals now!"</h1>
            <Grid container spacing={2}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{ height: 450 }}
                                image={product.image}
                                title={product.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {product.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Category: {product.category}
                                </Typography>
                                <Typography variant="h6">$ {product.price}</Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Add to Cart &nbsp;&nbsp;
                                </Button>
                                { 
                                 role==='admin'&&
                                 <>
                                  <Button
                                    variant="contained"
                                    color="danger"
                                    onClick={() => handleEdit(product)}
                                >
                                    Edit &nbsp;&nbsp;
                                </Button>
                                <Button
                                    variant="contained"
                                    color="danger"
                                    onClick={() => handleDelete(product)}
                                >
                                    Delete
                                </Button>
                                 </>
                                   

                                }
                               
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Product;