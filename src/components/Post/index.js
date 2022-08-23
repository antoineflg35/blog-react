import './styles.scss';

import PropTypes from 'prop-types';

function Post({ title, category, excerpt }) {
  return (
    <article className="post">
      <h2 className="post-title">{ title }</h2>
      <div className="post-category">{ category }</div>
      <p className="post-excerpt">{ excerpt }</p>
    </article>
  );
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
};

export default Post;
