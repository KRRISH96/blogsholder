import React, { useState, useEffect } from 'react';
import { THEME_PREFERENCE_KEY, THEMES } from '../../constants';
import { isDayTime } from '../../utils';
import './themeStyles.scss';

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

  const ThemeButton = ({ children, themePreference, ...props }: any) => (
    <button
      className={`theme-btn ${theme === themePreference ? 'active' : ''}`}
      onClick={() => setTheme(themePreference)}
      {...props}
      data-cy={themePreference}
    >
      {children}
    </button>
  );

  return (
    <div className="theme-switch-wrapper">
      <ThemeButton themePreference={THEMES.light} title="Light Theme">
        L
      </ThemeButton>
      <ThemeButton themePreference={THEMES.dark} title="Dark Theme">
        D
      </ThemeButton>
      <ThemeButton themePreference={THEMES.system} title="System Default Theme">
        S
      </ThemeButton>
      <ThemeButton
        themePreference={THEMES.auto}
        title="Light during Day(7am-7pm) and Dark during Night"
      >
        A
      </ThemeButton>
    </div>
  );
}

export default Theme;
