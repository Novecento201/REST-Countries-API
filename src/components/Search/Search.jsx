import { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
import { BsSearch } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';

const regions = [
  'All regions',
  'Americas',
  'Asia',
  'Europe',
  'Oceania',
  'Africa',
];

import './Search.css';

const Search = () => {
  const { setIsLoading, inputData, setInputData } = useContext(AppContext);

  function handleInputDataSearch(e) {
    setInputData((prevInputData) => {
      return {
        ...prevInputData,
        search: e.target.value,
      };
    });
  }

  function handleInputDataRadio(e) {
    setInputData((prevInputData) => {
      return {
        ...prevInputData,
        region: e.target.value,
      };
    });
  }

  return (
    <div className="container__search">
      {/* Input text */}
      <div className="container__search__input">
        <BsSearch className="icon__search" />
        <input
          className="input__search"
          type="text"
          placeholder="Search for a country..."
          value={inputData.search}
          onChange={(e) => handleInputDataSearch(e)}
        />
      </div>

      {/* Filter Radio*/}
      <div className="dropdown">
        <div className="dropdown__selected__container">
          <p className="selected__region">{inputData.region}</p>
          <IoIosArrowDown className="dropdown__icon" />
        </div>

        <ul className="dropdown__list">
          {regions.map((region, i) => (
            <label
              key={i}
              htmlFor={region}
              className="radio__region"
            >
              <input
                type="radio"
                id={region}
                name="region"
                value={region}
                checked={region === inputData.region}
                onChange={(e) => handleInputDataRadio(e)}
              />
              {region}
            </label>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Search;
