import './styles.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Header({ categories, zenMode, toggleZenMode }) {
  return (
    <header className="menu">
      <nav>
        {
          categories.map(
            (category) => <Link to={category.route} className="menu-link" key={category.label}>{category.label}</Link>,
          )
        }
        <button className="menu-btn" type="button" onClick={toggleZenMode}>
          {zenMode ? 'Désactiver le zen mode' : 'Activer le zen mode' }
        </button>
      </nav>
    </header>
  );
}

Header.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  zenMode: PropTypes.bool.isRequired,
  toggleZenMode: PropTypes.func.isRequired,
};

export default Header;
