import { useEffect, useState } from 'react';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';

import './Theme.css';
const Theme = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  function onChangeTheme() {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  }

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  return (
    <button
      className="theme__btn"
      onClick={onChangeTheme}
    >
      {theme === 'dark' ? (
        <>
          <BsFillMoonFill /> <p>Dark Mode</p>
        </>
      ) : (
        <>
          <BsFillSunFill /> <p>Light Mode</p>
        </>
      )}
    </button>
  );
};
export default Theme;
