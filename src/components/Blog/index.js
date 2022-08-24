/* eslint-disable react/jsx-no-bind */
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import React, { useEffect, useState } from 'react';

import filterPostsByCategory from 'src/components/selectors/filterPostsByCategory';

// Composants
import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';
import NotFound from 'src/components/NotFound';
import Spinner from 'src/components/Spinner';

// data, styles et utilitaires
import categoriesData from 'src/data/categories';
import postsData from 'src/data/posts';
import './styles.scss';

// == Composant
function Blog() {
  const [zenMode, setZenMode] = useState(false);

  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(false);

  function toggleZenMode() {
    setZenMode(!zenMode);

    console.log('zenMode', zenMode);
  }

  function loadPosts() {
    setLoading(true);
    axios
      .get('https://oclock-open-apis.vercel.app/api/blog/posts')
      // quand la promesse est tenue (que l'api nous a répondu et fourni les données)
      .then((response) => {
        setPosts(response.data);
      })
      .catch(() => {
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const className = zenMode ? 'blog blog--zen' : 'blog';

  useEffect(
    loadPosts,
    [],
  );

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
