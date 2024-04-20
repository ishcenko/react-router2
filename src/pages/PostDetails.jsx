import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import {
  NavLink,
  useParams,
  Routes,
  Route,
  useLocation,
  Link,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchDetails } from 'services/api';

const CommentsPostPage = lazy(() => import('pages/CommentsPostPage'));

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

const PostDetails = () => {
  const [postDetails, setPostDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { postId } = useParams();
  const location = useLocation();
  const backLinkHref = useRef(location.state?.from ?? '/');

  useEffect(() => {
    if (!postId) return;

    const fetchPostData = async () => {
      try {
        setIsLoading(true);

        const postData = await fetchDetails(postId);
        setPostDetails(postData);
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
      <h1>Post Details</h1>
      <Link to={backLinkHref.current}>Go back</Link>
      {error !== null && <p className="c-error"> Oops, error.</p>}
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

      {postDetails !== null && (
        <div className="post-details">
          <h2 className="post_details-title">Title: {postDetails.title} </h2>
          <p className="post_details-id">ID: {postDetails.id} </p>
          <p className="post_details-body"> {postDetails.body} </p>
          <div>
            <NavLink to="comments">Comments</NavLink>
          </div>
        </div>
      )}
      <Suspense
        fallback={
          <ThreeCircles
            visible={true}
            height="100"
            width="100"
            color="#04e4f9"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        }
      >
        <Routes>
          <Route path="comments" element={<CommentsPostPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default PostDetails;
