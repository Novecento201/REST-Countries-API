import { Link } from 'react-router-dom';

import './ItemCard.css';

const ItemCard = ({
  country: { cca3, capital, region, name, population, flags },
}) => {
  return (
    <Link
      to={`/detail/${cca3}`}
      className="country__card"
    >
      <img
        className="flag__country__card"
        src={flags.png}
        alt={`Flag of ${name.official}`}
      />
      <div className="details__country__card">
        <h3>{name.common}</h3>
        <p>Population: {population.toLocaleString()}</p>
        <p>Region: {region}</p>
        <p>Capital: {capital}</p>
      </div>
    </Link>
  );
};
export default ItemCard;
