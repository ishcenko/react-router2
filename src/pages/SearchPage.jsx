import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { fetchDetails } from 'services/api';
import { toast } from 'react-toastify';
import { ThreeCircles } from 'react-loader-spinner';
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

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('query');
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const backLinkHref = useRef(location.state?.from ?? '/');

  useEffect(() => {
    if (!searchTerm) return;
    const fetchPostData = async () => {
      try {
        setIsLoading(true);

        const post = await fetchDetails(searchTerm);

        setPosts([post]);
        toast.success(
          `Your posts with id ${searchTerm} were successfully fetched!`,
          toastConfig
        );
      } catch (error) {
        setError(error.message);
        toast.error(error.message, toastConfig);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPostData();
  }, [searchTerm]);

  const handleSubmit = event => {
    event.preventDefault();

    const searchValue = event.target.children.search.value;

    setSearchParams({
      query: searchValue,
    });
  };

  return (
    <div>
      <h1>Search Page</h1>
      <Link to={backLinkHref.current}>Go back</Link>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Enter post id..."
          required
          minLength={2}
        />
        <button type="submit">Search</button>
      </form>
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

      {posts.length > 0 &&
        posts.map(post => {
          return (
            <Link
              state={{ from: location }}
              className="post"
              key={post.id}
              to={`/post/${post.id}`}
            >
              <strong className="post-id">Id: {post.id}</strong>
              <h4 className="post-title"> {post.title} </h4>
              <p className="post-body">{post.body}</p>
            </Link>
          );
        })}
    </div>
  );
};

export default SearchPage;
