import React, { useState, useEffect } from 'react';
import {
  Container, Col, Row, Button,
} from 'react-bootstrap';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { v4 as uuidv4 } from 'uuid';
import FormModal from './FormModal.jsx';
import Ratings from './Ratings.jsx';
import Review from './Review.jsx';

function ReviewList({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(2);
  const [sortedBy, setSortedBy] = useState('helpful');
  const [starReviews, setStarReviews] = useState([]);
  const [displayedReviews, setDisplayedReviews] = useState([]);
  const [helpfulnessArray, setHelpfulnessArray] = useState([]);
  const [filterApplied, setFilterApplied] = useState([]);

  function loadMoreReviews() {
    setCount(count + 2);
  }

  const resetReviews = () => {
    const displayed = reviews.slice(0, count);
    setDisplayedReviews(displayed);
    console.log('inside resetReveiws')
  }

  const handleHelpfulnessArray = (event) => {
    setHelpfulnessArray((helpfulnessArray) => [...helpfulnessArray, event]);
  };

  const changeSortingType = (event) => {
    console.log('insidehandle change');
    const searchType = event.target.value;
    setSortedBy(searchType);
    console.log(sortedBy);
  };

  function sortStarRatings(event) {
    console.log('reviews', reviews);
    const currentStar = parseInt(event);
    const result = reviews.filter((rating) => rating.rating === currentStar);

    console.log('current clicked star', event);
    console.log('result-array of same stars as event', result);

    if (filterApplied.length > 0) { // checking to see if a star was alread clicked on
      console.log('insided of itttttt');

      let hasReset = false; // what does has reset do??
      filterApplied.map((rating, i) => { // iterating the stars that have been clicked
        if (rating === currentStar) { // if the clicked star has aleady been clicked once
          console.log('filterapplied', filterApplied);
          const spliced = filterApplied;
          spliced.splice(i, 1); // remove that star from filter applied
          console.log('spliced filter', spliced); // shows the remaining clicked stars
          const displayed = reviews.slice(0, count); // this is what resets it after unclicking on star rating, need to adjust this
          hasReset = true; // not sure what this is for, it is a flag for something
          setFilterApplied(spliced);
          return setDisplayedReviews(displayed); // resets star search
        }
      });
      if (hasReset === false) {
        setFilterApplied([...filterApplied, currentStar]); // add star review search if more than 1 star is selected
        return setDisplayedReviews(displayedReviews.concat(result));
      }
    } else {
      setFilterApplied([currentStar]);
      return (result.length > 0 ? setDisplayedReviews(result) : null);
    }
  }

  useEffect(() => {
    axios.get(`http://52.26.193.201:3000/reviews/${productId}/list?sort=${sortedBy}&count=30`)
      .then((response) => {
        const { results } = response.data;
        setReviews(response.data.results);
        const displayed = results.slice(0, count);
        setDisplayedReviews(displayed);
      });
  }, [count, sortedBy]);

  // SORTING STYLING========== can probably figure out a way to put into css
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,

    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },

    inputLabel: {
      color: 'green',
    },

  }));
  const classes = useStyles();

  // Modal===========
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  function handleShow() { setShow(true); }

  if (displayedReviews.length === 0) {
    return <div />;
  }

  return (
    <Container>

      <Row>
        <Col sm={4} className="raw-ratings-column">
          <Ratings
            productId={productId}
            sortStarRatings={sortStarRatings}
            resetReviews={resetReviews}
            filterApplied={filterApplied}

          />
        </Col>

        <Col sm={7} className="raw-reviews">

          <h2>Reviews</h2>
          <Row className="align-items-center raw-review-row">

            {reviews.length}
            {' '}
            reviews,  Sorted By

            <FormControl className={classes.formControl}>
              <Select
                onChange={changeSortingType}
                value={sortedBy}
              >
                <MenuItem value="relevant">Relevance</MenuItem>
                <MenuItem value="helpful">Helpfulness</MenuItem>
                <MenuItem value="newest">Newest</MenuItem>
              </Select>
            </FormControl>

          </Row>
          {displayedReviews.map((review) => (
            <Review
              key={uuidv4()}
              review={review}
              helpfulnessArray={helpfulnessArray}
              handleHelpfulnessArray={handleHelpfulnessArray}
            />
          ))}
          <Row>
            <button
              className="raw-review-buttons"
              onClick={loadMoreReviews}
            >
              MORE REVIEWS
            </button>
            {' '}

            <button className="raw-review-buttons" onClick={handleShow}>ADD A REVIEW</button>
          </Row>
          <FormModal show={show} onHide={handleClose} />
        </Col>
        <Col />
      </Row>
    </Container>
  );
}

export default ReviewList;
