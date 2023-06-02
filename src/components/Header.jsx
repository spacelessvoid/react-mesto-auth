import { Routes, Route, Link } from "react-router-dom";
import logo from "../images/logo.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Header() {
  const currentUser = useContext(CurrentUserContext);

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
              <span className="header__user-info">{currentUser.email}</span>
              <Link className="link" to="/signin">
                Выйти
              </Link>
            </div>
          }
        />
      </Routes>
    </header>
  );
}
