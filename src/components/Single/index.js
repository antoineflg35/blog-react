import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

import { useParams } from 'react-router-dom';
import useTitle from 'src/Hooks/useTitle';
import NotFound from 'src/components/NotFound';

import './styles.scss';

function Single({ posts }) {
  const routeParams = useParams();
  const { slug } = routeParams;
  const foundPost = posts.find(
    (post) => post.slug === slug,
  );
  if (!foundPost) {
    return <NotFound />;
  }
  const { title, category, content } = foundPost;

  function createMarkup() {
    const sanitizedContent = DOMPurify.sanitize(content, { ALLOWED_TAGS: ['em', 'strong'] });
    return { __html: sanitizedContent };
  }

   useTitle(`${category} - ${title}`);
  return (
    <div className="single">
      <h2 className="single-title">{title}</h2>
      <div className="single-category">{category}</div>
      <p className="single-contnent" dangerouslySetInnerHTML={createMarkup()} />
    </div>
  );
}

Single.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Single;
