import { Routes, Route, Link } from "react-router-dom";
import logo from "../images/logo.svg";

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <Routes>
        <Route
          path="/sign-up"
          element={
            <Link className="link" to="/sign-in">
              Войти
            </Link>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link className="link" to="/sign-up">
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
