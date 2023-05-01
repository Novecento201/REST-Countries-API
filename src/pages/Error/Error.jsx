import { Link } from 'react-router-dom';

import './Error.css';
const Error = () => {
  return (
    <div className="error__container">
      <h2>The link you entered is invalid or expired</h2>
      <Link
        to="/"
        className="error__link"
      >
        Go to the homepage
      </Link>
    </div>
  );
};
export default Error;
