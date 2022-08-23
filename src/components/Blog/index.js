/* eslint-disable react/jsx-no-bind */
import { Routes, Route } from 'react-router-dom';

import { useState } from 'react';

// Composants
import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';
// data, styles et utilitaires
import categoriesData from 'src/data/categories';
import postsData from 'src/data/posts';
import filterPostByCategory from '../Selector/filterPostsByCategory';
import './styles.scss';

// == Composant
function Blog() {
  const [zenMode, setZenMode] = useState(false);
  function toggleZenMode() {
    setZenMode(!zenMode);
  }
  const className = zenMode ? 'blog blog--zen' : 'blog';
  return (
    <div className={className}>
      <Header
        categories={categoriesData}
        zenMode={zenMode}
        toggleZenMode={toggleZenMode}
      />
      <Routes>
        {
          categoriesData.map(
            (categorie) => (
              <Route
                key={categorie.label}
                path={categorie.route}
                element={<Posts posts={filterPostByCategory(postsData, categorie.label)} />}
              />
            ),
          )
        }
        <Route path="*" element={<div>Page not found...</div>} />
      </Routes>

      <Footer />
    </div>
  );
}

// == Export
export default Blog;
