import { useEffect } from 'react';

function useTitle(title) {
  const fullTitle = `Dev Of Thrones :  ${title}`;

  useEffect(
    () => {
      document.title = fullTitle;
    },
    [title],
  );
}

export default useTitle;
