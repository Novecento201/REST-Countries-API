import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context/AppContext';

import Search from '../../components/Search/Search';
import Loading from '../../components/Loading/Loading';

import './Home.css';
import ItemCard from '../../components/ItemCard/ItemCard';

const Home = () => {
  const { isLoading, setIsLoading, inputData, setInputData } =
    useContext(AppContext);
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState(allCountries || []);
  console.log(countries);

  async function fetchSearch() {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${inputData.search}`
      );
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();

      // Filter the search results by region
      let filteredCountries = data.filter((country) => {
        return (
          inputData.region === 'All regions' ||
          country.region === inputData.region
        );
      });

      setCountries(filteredCountries);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setCountries([]);
    } finally {
      setIsLoading(false);
    }
  }

  // fetch countries / filter base on inputData changes
  useEffect(() => {
    // fetch data on input change and region change
    if (inputData.search) {
      fetchSearch();
    } else {
      // change countries value base on region
      let filteredCountries = [...allCountries];
      if (inputData.region !== 'All regions') {
        filteredCountries = allCountries.filter(
          (country) => country.region === inputData.region
        );
      }
      setCountries(filteredCountries);
    }
  }, [inputData.search, inputData.region]);

  // fetch all countries on mount and reset inputData.search
  useEffect(() => {
    (async () => {
      try {
        setInputData((prevInputData) => {
          return {
            ...prevInputData,
            search: '',
          };
        });
        setIsLoading(true);
        const res = await fetch('https://restcountries.com/v3.1/all');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setAllCountries(data);
        setCountries(data);
      } catch (error) {
        console.error('Error fetching all countries:', error);
        setCountries([]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className="home__container">
      <Search />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="home__results">
          {countries.length > 0 ? (
            countries.map((country) => (
              <ItemCard
                country={country}
                key={country.cca3}
              />
            ))
          ) : (
            <div className="home__no-results">
              <p>No results for your search query.</p>
              <p>Please check the region and try again...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Home;
