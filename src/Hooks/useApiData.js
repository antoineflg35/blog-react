import axios from 'axios';
import { useState, useEffect } from 'react';

function useApiData(url) {
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);

  function loadItems() {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setItems(response.data);
      })
      .catch(() => {
        console.log('une erreur est survenue...');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(
    loadItems,
    [],
  );

  return [loading, items];
}

export default useApiData;
