import { useState, useEffect } from 'react';
import axios from 'axios';

function useApiData(url) {
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);

  function loadPosts() {
    setLoading(true);
    console.log('1 - avant l\'appel');
    axios
      .get(url)
      .then((response) => {
        setPosts(response.data);
      })
      .catch(() => {
        console.log('une erreur est survenue...');
      })
      .finally(() => {
        setLoading(false);
      });

    console.log('2 - après l\'appel');
  }

  useEffect(
    loadPosts,
    [],
  );

  return [loading, posts];
}

export default useApiData;
