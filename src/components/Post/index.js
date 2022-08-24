import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

import './styles.scss';

function Post({ title, category, excerpt }) {
  function createMarkup() {
    // je prends soin de nettoyer le html potentiellement
    // dangeureux avant de le faire interpréter par le navigateur
    const sanitizedExcerpt = DOMPurify.sanitize(excerpt, { ALLOWED_TAGS: ['em', 'strong'] });
    return { __html: sanitizedExcerpt };
  }

  return (
    <article className="post">
      <h2 className="post-title">{title}</h2>
      <div className="post-category">{category}</div>
      <p className="post-excerpt" dangerouslySetInnerHTML={createMarkup()} />
    </article>
  );
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
};

export default Post;
