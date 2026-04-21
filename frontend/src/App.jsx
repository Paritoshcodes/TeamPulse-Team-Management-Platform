import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AddMemberPage from './pages/AddMemberPage';
import ViewMembersPage from './pages/ViewMembersPage';
import MemberDetailsPage from './pages/MemberDetailsPage';

const THEME_STORAGE_KEY = 'teampulse-theme-mode';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_STORAGE_KEY) || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const appThemeLabel = useMemo(
    () => (theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'),
    [theme]
  );

  function handleToggleTheme() {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }

  return (
    <div className="app-root">
      <Navbar
        currentTheme={theme}
        onToggleTheme={handleToggleTheme}
        themeActionLabel={appThemeLabel}
      />

      <main className="page-shell page-fade-in">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-member" element={<AddMemberPage />} />
          <Route path="/members" element={<ViewMembersPage />} />
          <Route path="/members/:id" element={<MemberDetailsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
