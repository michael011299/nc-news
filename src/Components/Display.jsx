import { useState } from "react";
import { useEffect } from "react";
import { Card } from "react-bootstrap";

const Display = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://michaels-back-end-project-22.herokuapp.com/api/reviews")
      .then((response) => response.json())
      .then((data) => {
        setReviews(data.reviews);
      });
  }, [reviews]);

  return (
    <div id="display">
      <h2>Display</h2>
      <div>
        {reviews.map((review) => {
          return (
            <Card id="reviewCard">
              <Card.Title>{review.title}</Card.Title>
              <Card.Text>{review.category}</Card.Text>
              <Card.Text>{review.review_body}</Card.Text>
              <Card.Text>{review.owner}</Card.Text>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Display;
