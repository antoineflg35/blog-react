/* eslint-disable react/jsx-no-bind */
import { Routes, Route, Navigate } from 'react-router-dom';

import React, { useState } from 'react';

import filterPostsByCategory from 'src/components/selectors/filterPostsByCategory';

// Composants
import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Single from 'src/components/Single';
import Footer from 'src/components/Footer';
import NotFound from 'src/components/NotFound';
import Spinner from 'src/components/Spinner';
import useApiData from 'src/Hooks/useApiData';

// data, styles et utilitaires
import categoriesData from 'src/data/categories';
import './styles.scss';

// == Composant
function Blog() {
  const [loading, posts] = useApiData('https://oclock-open-apis.vercel.app/api/blog/posts');
  

  const [zenMode, setZenMode] = useState(false);

  function toggleZenMode() {
    setZenMode(!zenMode);

    console.log('zenMode', zenMode);
  }

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
                element={<Posts posts={filterPostsByCategory(posts, categorie.label)} category={categorie.label} />}
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
