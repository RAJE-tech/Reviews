import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';

function ReportButton(props) {
  const [id] = useState(props.review.review_id);


  function deleteReview(event) {
    const review = event.target.name;
    console.log(review);
    axios({
      method: 'put',
      url: `http://52.26.193.201:3000/reviews/report/${review}`,
    })
      .then((response) => {
        console.log(response);
      });
  }

  return (
    <div>
      <Button name={id} onClick={deleteReview}>Report</Button>
    </div>

  );
}

export default ReportButton;
