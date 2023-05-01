import { Link } from 'react-router-dom';
import Theme from '../Theme/Theme';

import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link
          to="/"
          className="header__link"
        >
          <h1>Where in the world?</h1>
        </Link>
        <Theme />
      </div>
    </header>
  );
};
export default Header;
