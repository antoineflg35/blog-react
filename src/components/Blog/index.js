/* eslint-disable react/jsx-no-bind */
import { Routes, Route, Navigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import axios from 'axios';

import filterPostsByCategory from 'src/components/selectors/filterPostsByCategory';

// Composants
import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Single from 'src/components/Single';
import Footer from 'src/components/Footer';
import NotFound from 'src/components/NotFound';
import Spinner from 'src/components/Spinner';

// data, styles et utilitaires
import categoriesData from 'src/data/categories';
import './styles.scss';

// == Composant
function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [zenMode, setZenMode] = useState(false);

  function toggleZenMode() {
    setZenMode(!zenMode);

    console.log('zenMode', zenMode);
  }

  function loadPosts() {
    setLoading(true);
    console.log('1 - avant l\'appel');
    axios
      .get('https://oclock-open-apis.vercel.app/api/blog/posts')

      .then((response) => {
        console.log('3 - à la réponse');
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

  const className = zenMode ? 'blog blog--zen' : 'blog';

  return (
    <div className={className}>
      <Header
        categories={categoriesData}
        zenMode={zenMode}
        toggleZenMode={toggleZenMode}
      />

      { loading && <Spinner /> }

      { !loading
&& (
<Routes>
  {
    categoriesData.map(
      (categorie) => (
        <Route
          key={categorie.label}
          path={categorie.route}
          element={<Posts posts={filterPostsByCategory(posts, categorie.label)} />}
        />
      ),
    )
  }
  <Route
    path="/post/:slug"
    element={<Single posts={posts} />}
  />
  <Route path="jquery" element={<Navigate to="/autre" />} />
  <Route path="*" element={<NotFound />} />
</Routes>
)}
      <Footer />
    </div>
  );
}
// == Export
export default Blog;
