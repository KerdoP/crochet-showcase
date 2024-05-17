// ListCrochetItems.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ListCrochetItems.scss';

const ListCrochetItems = () => {
  const [crochetItems, setCrochetItems] = useState([]);

  useEffect(() => {
    const fetchCrochetItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/crochet-items');
        setCrochetItems(response.data);
      } catch (error) {
        console.error('Error fetching crochet items:', error);
      }
    };

    fetchCrochetItems();
  }, []);

  const isAuthenticated = !!localStorage.getItem('accessToken');

  return (
    <div>
      <h1>Crochet Items List</h1>
      {isAuthenticated && <Link to="/add">Add Crochet Item</Link>}
      <ul>
        {crochetItems.map(item => (
          <li key={item._id}>
            <h2>{item.name}</h2>
            <p>Price: ${item.price}</p>
            <img src={`http://localhost:3000/${item.imageURL}`} alt={item.name} />
            <Link to={`/item/${item._id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListCrochetItems;
