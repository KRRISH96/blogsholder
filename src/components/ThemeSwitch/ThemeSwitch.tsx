import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaCog, FaRegClock } from 'react-icons/fa';
import { THEME_PREFERENCE_KEY, THEMES } from '../../constants';
import { isDayTime } from '../../utils';
import './themeStyles.scss';

interface ThemeButtonProps {
  children: React.ReactNode;
  themePreference: string;
  title: string;
}

function Theme() {
  const defaultTheme = localStorage.getItem(THEME_PREFERENCE_KEY)
    ? localStorage.getItem(THEME_PREFERENCE_KEY)
    : THEMES.dark;
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    switchTheme(theme);
  }, [theme]);

  const switchTheme = (themePreference: string | null) => {
    let themeToApply = themePreference ?? THEMES.dark;

    if (themePreference === THEMES.auto) {
      themeToApply = isDayTime() ? THEMES.light : THEMES.dark;
    }
    if (!!themePreference) {
      document.body.setAttribute('data-theme', themePreference);
      document.body.setAttribute('id', `theme-${themeToApply}`);
      localStorage.setItem(THEME_PREFERENCE_KEY, themePreference);
    }
  };

  const ThemeButton = ({
    children,
    themePreference,
    title,
  }: ThemeButtonProps) => (
    <button
      className={`theme-btn ${theme === themePreference ? 'active' : ''}`}
      onClick={() => setTheme(themePreference)}
      title={title}
    >
      {children}
    </button>
  );

  return (
    <div className="theme-switch-wrapper">
      <ThemeButton themePreference={THEMES.light} title="Light Theme">
        <FaSun />
      </ThemeButton>
      <ThemeButton themePreference={THEMES.dark} title="Dark Theme">
        <FaMoon />
      </ThemeButton>
      <ThemeButton themePreference={THEMES.system} title="System Default Theme">
        <FaCog />
      </ThemeButton>
      <ThemeButton
        themePreference={THEMES.auto}
        title="Light during Day(7am-7pm) and Dark during Night"
      >
        <FaRegClock />
      </ThemeButton>
    </div>
  );
}

export default Theme;
