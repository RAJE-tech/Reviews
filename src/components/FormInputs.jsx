import React, { useEffect, useReducer } from 'react';
import {
  Form, FormCheck, FormFile, Button,
} from 'react-bootstrap';
import axios from 'axios';

function FormInputs(props) {
  const [state, setState] = React.useState({
    rating: '',
    summary: '',
    body: '',
    recommend: '',
    name: '',
    email: '',
    characteristics: {
      14: '',
      16: '',
    },
  });

  function submitForm(event) {
    event.preventDefault();
    props.onHide();
    axios({
      method: 'post',
      url: 'http://52.26.193.201:3000/reviews/2',
      data: {
        rating: state.rating,
        summary: state.summary,
        body: state.body,
        recommend: true,
        name: state.name,
        email: state.email, // hard coded for ease of use
        characteristics: {
          14: state.characteristics['14'],
          16: state.characteristics['16'],
        },
      },
    }).catch((error) => {
      console.log(error);
    });
  }

  function handleChange(event) {
    const { value } = event.target;
    setState({
      ...state,
      [event.target.name]: value,
    });
    console.log(state);
  }

  function handleSelect(event) {
    const value = parseInt(event.target.value);
    setState({
      ...state,
      rating: value,
    });
  }

  function handleRadio(event) {
    const isRecommended = event.currentTarget.value === 'yes';
    setState({
      ...state,
      recommend: isRecommended,
    });
    console.log(state);
  }

  function handleCharacteristics(event) {
    const value = parseInt(event.target.value);

    setState({
      ...state,
      characteristics: {
        ...state.characteristics,
        [event.target.name]: value,
      },
    });
  }

  return (

    <div>
      <Form onSubmit={submitForm}>

        <Form.Group controlId="formChooseRatings">
          <Form.Label>Rate the product</Form.Label>
          <Form.Control as="select" name="rating" value={state.rating} onChange={handleSelect}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="summary">
          <Form.Label>Summary/Review Title</Form.Label>
          <Form.Control as="textarea" rows="1" name="summary" value={state.summary} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="body">
          <Form.Label>Review Body</Form.Label>
          <Form.Control as="textarea" rows="3" name="body" value={state.body} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="reccomend">
          <Form.Label>Do you reccomend this Product?</Form.Label>
          <Form.Check
            type="radio"
            label="yes"
            id="recommendTrue"
            value="yes"
            checked={state.recommend === true}
            onChange={handleRadio}
          />
          <Form.Check
            type="radio"
            label="no"
            id="recommendFalse"
            value="no"
            checked={state.recommend === false}
            onChange={handleRadio}
          />

        </Form.Group>

        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={state.name} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" value={state.email} onChange={handleChange} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.File
            id="Reviewfile added"
            label="Upload photo"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Characteristics</Form.Label>
          <Form.Group>
            <Form.Label>Size</Form.Label>
            <Form.Control as="select" name="14" value={state.characteristics['14']} onChange={handleCharacteristics}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Comfort</Form.Label>
            <Form.Control as="select" name="16" value={state.characteristics['16']} onChange={handleCharacteristics}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>

        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default FormInputs;
