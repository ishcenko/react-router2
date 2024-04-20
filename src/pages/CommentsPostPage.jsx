import React, { useEffect, useState } from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { fetchComments } from 'services/api';
import { useParams } from 'react-router-dom';

const toastConfig = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
};

const CommentsPostPage = () => {
  const [comments, setComments] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    if (!postId) return;

    const fetchPostData = async () => {
      try {
        setIsLoading(true);

        const comments = await fetchComments(postId);
        setComments(comments);
        toast.success('Post details were successfully fetched!', toastConfig);
      } catch (error) {
        setError(error.message);
        toast.error(error.message, toastConfig);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPostData();
  }, [postId]);

  return (
    <div>
      <h1>Comments Post Page</h1>
      {error !== null && <p className="c-error"> Oops, error. {error} </p>}
      {isLoading && (
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#04e4f9"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}
      <ul>
        {comments?.length > 0 &&
          comments.map(comment => (
            <li key={comment.id}>
              <h2>{comment.email}</h2>
              <p>{comment.body}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CommentsPostPage;
