import { useEffect, useState } from 'react';
import { fetchPosts } from 'services/api';
import { toast } from 'react-toastify';

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

const useGetPosts = () => {
  const [posts, setPosts] = useState(
    () => JSON.parse(localStorage.getItem('posts')) ?? []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setIsLoading(true);
        const posts = await fetchPosts();
        setPosts(posts);
        toast.success('Your posts were successfully fetched!', toastConfig);
      } catch (error) {
        setError(error.message);
        toast.error(error.message, toastConfig);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPostData();
  }, []);

  return { posts, isLoading, error };
};

export default useGetPosts;
