import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditCrochetItem = () => {
  const { id } = useParams();
  const [crochetItem, setCrochetItem] = useState({});
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCrochetItem = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/crochet-items/${id}`);
        setCrochetItem(response.data);
        setName(response.data.name);
        setDescription(response.data.description);
        setPrice(response.data.price);
      } catch (error) {
        console.error('Error fetching crochet item:', error);
      }
    };

    fetchCrochetItem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/crochet-items/${id}`, {
        name,
        description,
        price
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      navigate(`/item/${id}`);
    } catch (error) {
      console.error('Error editing crochet item:', error);
    }
  };

  return (
    <div>
      <h1>Edit Crochet Item</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditCrochetItem;
