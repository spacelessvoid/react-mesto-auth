import { Routes, Route, Link } from "react-router-dom";
import logo from "../images/logo.svg";

export default function Header() {
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
              <span className="header__user-info">test@test.test</span>
              <a className="link" href="/">
                Выйти
              </a>
            </div>
          }
        />
      </Routes>
    </header>
  );
}
