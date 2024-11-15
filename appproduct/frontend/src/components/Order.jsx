import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Adjust the path if needed

const Order = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const navigate = useNavigate(); // For navigation
    const { cartItems } = useCart(); // Get cart items from context
    const product = cartItems.find(item => item._id === id); // Find the product in the cart
    console.log(cartItems)

    if (!product) {
        return <h2>Product not found!</h2>; // Handle case where product is not found
    }

    const [quantity, setQuantity] = useState(1);
    const totalPrice =parseInt( product.price )* quantity; // Calculate total price

    const handleIncrease = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrease = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1)); // Prevent going below 1
    };

    const handleOrderConfirmation = () => {
        // Here you can add any order confirmation logic, e.g. API call
        
        navigate('/transaction'); // Navigate to the transaction page
    };

    return (
        <div>
            <h2>Order Summary</h2>
            <div>
                <h3>{product.title}</h3>
                <img src={product.image} alt={product.title} style={{ width: '200px' }} />
                <p>Category: {product.category}</p>
                <p>Price per item: ${product.price}</p>
                <div>
                    <button onClick={handleDecrease}>-</button>
                    <span>{quantity}</span>
                    <button onClick={handleIncrease}>+</button>
                </div>
                <p>Total Price: ${totalPrice.toFixed(2)}</p>
                <button onClick={handleOrderConfirmation}>Make transaction</button>
            </div>
        </div>
    );
};

export default Order;