import './styles.scss';
import PropTypes from 'prop-types';

function Header({ categories, zenMode, toggleZenMode }) {
  return (
    <header className="menu">
      <nav>
        {
          categories.map(
            (category) => <a className="menu-link" key={category.label} href={category.route}>{category.label}</a>,
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
