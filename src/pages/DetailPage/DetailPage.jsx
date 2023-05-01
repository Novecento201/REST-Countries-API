import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';
import Loading from '../../components/Loading/Loading';
import { BsArrowLeft } from 'react-icons/bs';

import './DetailPage.css';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState([]);
  const { isLoading, setIsLoading } = useContext(AppContext);

  console.log(country);

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
        if (!res.ok) {
          throw new Error('Something went wrong fetching the data.');
        }
        const data = await res.json();
        setCountry(data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  return (
    <div className="detail__container">
      <button
        onClick={handleGoBack}
        className="detail__btn"
      >
        <BsArrowLeft className="detail__goback__icon" /> Back
      </button>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="detail__results">
          {country.length > 0 ? (
            country.map((c) => (
              <div
                key={c.cca3}
                className="country"
              >
                <img
                  className="country__img"
                  src={c.flags.png}
                  alt={`Flag of ${c.name.common}`}
                />
                <div className="country__info">
                  <h2>{c.name.common}</h2>
                  <div className="country__info__data">
                    <div>
                      <p>
                        <strong>Native Name:</strong>{' '}
                        {Object.keys(c.name.nativeName).map(
                          (key, index, array) => (
                            <span key={key}>
                              {c.name.nativeName[key].common}
                              {index !== array.length - 1 ? ', ' : '.'}
                            </span>
                          )
                        )}
                      </p>
                      <p>
                        <strong>Population:</strong>{' '}
                        {c.population.toLocaleString()}
                      </p>
                      <p>
                        <strong>Region:</strong> {c.region}
                      </p>
                      <p>
                        <strong>Sub Region: </strong>
                        {c.subregion}
                      </p>
                      <p>
                        <strong>Capital:</strong> {c.capital}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Top Level Domain:</strong> {c.tld}
                      </p>
                      <p>
                        <strong>Currencies:</strong>{' '}
                        {Object.keys(c.currencies).map((key, index, array) => (
                          <span key={key}>
                            {c.currencies[key].name}
                            {index !== array.length - 1 ? ', ' : '.'}
                          </span>
                        ))}
                      </p>
                      <p>
                        <strong>Languages:</strong>{' '}
                        {Object.keys(c.languages).map((key, index, array) => (
                          <span key={key}>
                            {c.languages[key]}
                            {index !== array.length - 1 ? ', ' : '.'}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                  {c.borders && (
                    <div className="coutry__borders">
                      <p>
                        <strong>Border Countries :</strong>
                      </p>
                      <div>
                        {c.borders?.length > 0 &&
                          c.borders.map((border) => (
                            <Link
                              to={`/detail/${border}`}
                              className="detail__btn"
                              key={border}
                            >
                              {border}
                            </Link>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div>No results</div>
          )}
        </div>
      )}
    </div>
  );
};
export default DetailPage;
