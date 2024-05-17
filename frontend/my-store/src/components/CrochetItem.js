import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const CrochetItem = () => {
  const [crochetItem, setCrochetItem] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCrochetItem = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/crochet-items/${id}`);
        setCrochetItem(response.data);
      } catch (error) {
        console.error('Error fetching crochet item:', error);
      }
    };

    fetchCrochetItem();
  }, [id]);

  const isAuthenticated = !!localStorage.getItem('accessToken');

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/crochet-items/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      navigate('/list');
    } catch (error) {
      console.error('Error deleting crochet item:', error);
    }
  };

  return (
    <div>
      {crochetItem ? (
        <div>
          <h1>{crochetItem.name}</h1>
          <p>Price: ${crochetItem.price}</p>
          <img src={`http://localhost:3000/${crochetItem.imageURL}`} alt={crochetItem.name} />
          {isAuthenticated && (
            <div>
              <Link to={`/edit/${id}`}>Edit</Link>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CrochetItem;
