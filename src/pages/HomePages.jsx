import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import useGetPosts from 'hooks/useGetPosts';

const HomePage = () => {
  const { posts, isLoading, error } = useGetPosts();

  return (
    <div>
      <h1 className="title-app">React</h1>
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
            <Link className="post" key={post.id} to={`/post/${post.id}`}>
              <strong className="post-id">Id: {post.id}</strong>
              <h4 className="post-title"> {post.title} </h4>
              <p className="post-body">{post.body}</p>
            </Link>
          );
        })}
    </div>
  );
};

export default HomePage;
