import React, { useState, useEffect } from 'react';
import './Home.css';
import QuoteForm from '../../components/QuoteForm/QuoteForm';

const Home = () => {
    return (
      <div className="home-container">
        <h1 className="home-title">Generador de Cotizaciones</h1>
        <QuoteForm />
      </div>
    );
};

export default Home;
