import { Typography } from '@mui/material';
import model from '../assets/model.png';
import React from 'react';
import '../styles/Home.css'; // Assuming you create a CSS file for styles

const Home = () => {
  return (
    <div className="home-container">
      <div className="text-section">
        <Typography variant="h2" component="h1" gutterBottom>
          Find your Style, Find your Smile
        </Typography>
        <Typography variant="body1" paragraph>
          Shop the Trends, Love the Savings
        </Typography>
      </div>
      <div
        className="image-section"
        style={{ backgroundImage: `url(${model})` }}
      ></div>
    </div>
  );
};

export default Home;
