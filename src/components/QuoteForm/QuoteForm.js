import React, { useState } from 'react';
import PDFGenerator from '../PDFGenerator/PDFGenerator';
import './QuoteForm.css';

const QuoteForm = () => {
  const [quote, setQuote] = useState({
    title: '',
    description: '',
    items: []
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
    newItems[index] = { ...newItems[index], [name]: value, isEditing: true };
    setQuote({ ...quote, items: newItems });
  };

  const addItem = () => {
    setQuote((prevState) => ({
      ...prevState,
      items: [...prevState.items, { name: '', price: '', isEditing: true }]
    }));
  };

  const saveItem = (index) => {
    const newItems = [...quote.items];
    newItems[index].isEditing = false;
    setQuote({ ...quote, items: newItems });
  };

  const removeItem = (index) => {
    const newItems = quote.items.filter((_, i) => i !== index);
    setQuote((prevState) => ({
      ...prevState,
      items: newItems
    }));
  };

  return (
    <div className="QuoteForm">
      <input type="text" name="title" placeholder="Título" value={quote.title} onChange={handleChange} />
      <textarea name="description" placeholder="Descripción" value={quote.description} onChange={handleChange} />
      
      <div className="itemsList">
        {quote.items.map((item, index) => (
          <div className="itemRow" key={index}>
            {item.isEditing ? (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre del ítem"
                  value={item.name}
                  onChange={(e) => handleItemChange(e, index)}
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Precio"
                  value={item.price}
                  onChange={(e) => handleItemChange(e, index)}
                />
                <button onClick={() => saveItem(index)}>Guardar</button>
              </>
            ) : (
              <lu >
                <li className="itemDisplay">
                    {item.name} - ${item.price}
                    <h3 className="removeItemBtn" onClick={() => removeItem(index)}>Eliminar</h3>
                </li>
              </lu>
            )}
          </div>
        ))}
      </div>

      <button onClick={addItem}>Agregar Servicio</button>
      <PDFGenerator {...quote} />
    </div>
  );
};

export default QuoteForm;
