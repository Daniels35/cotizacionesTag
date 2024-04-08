import React, { useState } from 'react';
import PDFGenerator from '../PDFGenerator/PDFGenerator';

const QuoteForm = () => {
  const [quote, setQuote] = useState({
    title: '',
    description: '',
    items: [] // Solo mantendremos el título, descripción e items aquí
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuote((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleItemChange = (e, index) => {
    const { name, value } = e.target;
    const newItems = [...quote.items];
    newItems[index] = { ...newItems[index], [name]: value };
    setQuote({ ...quote, items: newItems });
  };

  const addItem = () => {
    setQuote((prevState) => ({
      ...prevState,
      items: [...prevState.items, { name: '', price: '' }]
    }));
  };

  const removeItem = (index) => {
    const newItems = quote.items.filter((_, i) => i !== index);
    setQuote((prevState) => ({
      ...prevState,
      items: newItems
    }));
  };

  return (
    <div>
      <input type="text" name="title" placeholder="Título" value={quote.title} onChange={handleChange} />
      <textarea name="description" placeholder="Descripción" value={quote.description} onChange={handleChange} />
      
      {quote.items.map((item, index) => (
        <div key={index}>
          <input type="text" name="name" placeholder="Nombre del ítem" value={item.name} onChange={(e) => handleItemChange(e, index)} />
          <input type="number" name="price" placeholder="Precio" value={item.price} onChange={(e) => handleItemChange(e, index)} />
          <button onClick={() => removeItem(index)}>Eliminar</button>
        </div>
      ))}
      
      <button onClick={addItem}>Agregar Servicio</button>
      <PDFGenerator {...quote} />
    </div>
  );
};

export default QuoteForm;
