import PropTypes from 'prop-types';

import Post from 'src/components/Post';
import useTitle from '../../Hooks/useTitle';

import './styles.scss';

function Posts({ posts, category }) {
  useTitle(`${category}`);
  return (
    <main className="posts">
      <h1 className="posts-title">Dev Of Thrones</h1>
      <h2 className="posts-title-category">{category}</h2>
      <div className="posts-list">
        {
          posts.map(
            (post) => <Post key={post.id} {...post} />,
          )
        }
      </div>
    </main>
  );
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  category: PropTypes.string.isRequired,
};

export default Posts;
