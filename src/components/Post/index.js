import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';

import './styles.scss';
import { useEffect } from 'react';

function Post({ title, category, excerpt, slug }) {
  function createMarkup() {
    // je prends soin de nettoyer le html potentiellement
    // dangeureux avant de le faire interpréter par le navigateur
    const sanitizedExcerpt = DOMPurify.sanitize(excerpt, { ALLOWED_TAGS: ['em', 'strong'] });
    return { __html: sanitizedExcerpt };
  }

  return (
    <Link to={`/post/${slug}`} className="post">
      <h2 className="post-title">{title}</h2>
      <div className="post-category">{category}</div>
      <p className="post-excerpt" dangerouslySetInnerHTML={createMarkup()} />
    </Link>
  );
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default Post;
