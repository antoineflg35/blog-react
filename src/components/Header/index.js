import { NavLink } from 'react-router-dom';

import PropTypes from 'prop-types';

import './styles.scss';

function Header({ categories, zenMode, toggleZenMode }) {
  function handleClick() {
    console.log('ça clique !');
    toggleZenMode();
  }

  const buttonText = zenMode ? 'Désactiver le mode zen' : 'Activer le mode zen';

  return (
    <header className="menu">
      <nav>
        {
          categories.map(
            (category) => (
              <NavLink
                to={category.route}
                key={category.label}
                className={
                  ({ isActive }) => {
                    if (isActive) {
                      return 'menu-link menu-link--selected';
                    }

                    return 'menu-link';
                  }
                }
              >
                {category.label}
              </NavLink>
            ),
          )
        }
        <button
          className="menu-btn"
          type="button"
          onClick={handleClick}
        >
          {buttonText}
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
