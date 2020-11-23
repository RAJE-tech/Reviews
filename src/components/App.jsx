/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Ratings from './Ratings.jsx';
import ReviewList from './ReviewList.jsx';
import { exampleReview, exampleRating } from './exampleReview.js';


const productId = 45;

function App() {
  return (

    <div>
      <ReviewList
        productId={productId}
      />

    </div>
  );
}

export default App;
