import { Routes, Route, Link } from "react-router-dom";
import logo from "../images/logo.svg";

export default function Header({ onSignOut, userEmail }) {
  const { email } = userEmail;

  const handleSignOut = () => {
    onSignOut();
  };

  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <Routes>
        <Route
          path="/signup"
          element={
            <Link className="link" to="/signin">
              Войти
            </Link>
          }
        />
        <Route
          path="/signin"
          element={
            <Link className="link" to="/signup">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <div>
              <span className="header__user-info">{email}</span>
              <Link
                onClick={handleSignOut}
                className="link"
                to="/signin"
                replace
              >
                Выйти
              </Link>
            </div>
          }
        />
      </Routes>
    </header>
  );
}
