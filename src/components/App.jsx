import { NavLink, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ThreeCircles } from 'react-loader-spinner';

// import HomePage from 'pages/HomePages';
// import PostDetails from '../pages/PostDetails';
// import SearchPage from '../pages/SearchPage';

const HomePage = lazy(() => import('pages/HomePages'));
const PostDetails = lazy(() => import('pages/PostDetails'));
const SearchPage = lazy(() => import('pages/SearchPage'));

export const App = () => {
  return (
    <div>
      <p>React</p>
      <header>
        <nav>
          <NavLink to="/">Home Page</NavLink>
          <NavLink to="/search">Search</NavLink>
        </nav>
      </header>
      <main>
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
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/post/:postId/*" element={<PostDetails />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};
