import React, { useState, useEffect } from 'react';
import './Home.css';
import QuoteForm from '../../components/QuoteForm/QuoteForm';

const Home = () => {
    return (
      <div>
        <h1>Generador de Cotizaciones</h1>
        <QuoteForm />
      </div>
    );
  };

export default Home;
