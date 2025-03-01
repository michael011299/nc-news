import { deleteComment, getCommentsByReviewID } from "../APIcalls";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PostComments from "./PostComments";

const GetComments = ({ singularReview }) => {
  const { reviewID } = useParams();
  const [error, setError] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    getCommentsByReviewID(reviewID)
      .then((data) => {
        setCommentList(data);
      })
      .catch((err) => {
        if (err.response.status)
          setError(
            `Ooops, ${err.response.request.status}, ${err.response.request.statusText}, please try again`
          );
      });
  }, [reviewID]);

  const handleDeleteComment = (comment) => {
    const itemToRemove = commentList.indexOf(comment);
    setIsDeleting(true);
    deleteComment(comment.comment_id).then((response) => {
      setCommentList((currCommentList) => {
        setIsDeleting(false);
        const deletItems = [...currCommentList.splice(itemToRemove, 1)];
        return currCommentList;
      });
    });
  };

  return (
    <>
      <div>
        <PostComments setCommentList={setCommentList} />
      </div>
      <>
        {error ? (
          <div id="reviewerror">
            <h2>Error</h2>
            <p>
              These are not the comments you were looking for. Either no
              comments were found or the review does not exist
            </p>
          </div>
        ) : (
          <div>
            <h3>Review #{singularReview.review_id} comments :</h3>
            <div id="isDeleting">
              {isDeleting ? <p>Deleting comment ...</p> : <></>}
            </div>
            <div id="commentPage">
              {commentList.map((comment) => {
                return (
                  <Card
                    key={comment.comment_id}
                    className="singleCommentCard"
                    id={comment.comment_id}
                  >
                    <Card.Title>Author: {comment.author}</Card.Title>
                    <Card.Text>Comment: {comment.body}</Card.Text>
                    <Button>Votes: {comment.votes}</Button>
                    <Card.Text>Posted: {comment.created_at}</Card.Text>
                    <Button
                      id="deleteComment"
                      onClick={() => handleDeleteComment(comment)}
                    >
                      Delete This Comment ❌
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default GetComments;
