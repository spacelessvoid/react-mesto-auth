import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

function Register({ handleRegistration }) {
  const { isLoading } = useContext(AppContext);

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = e => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      handleRegistration(formValue);
    }
  };

  return (
    <section className="welcome-form">
      <h2 className="welcome-form__title">Регистрация</h2>
      <form
        className="welcome-form__form"
        id="register"
        name="register"
        onSubmit={handleSubmit}
      >
        <input
          className="welcome-form__text-input"
          type="email"
          name="email"
          id="email-input"
          placeholder="Email"
          required
          autoComplete="email"
          value={formValue.email || ""}
          onChange={handleInputChange}
        />
        <input
          className="welcome-form__text-input"
          type="password"
          name="password"
          id="password-input"
          placeholder="Пароль"
          minLength="8"
          required
          value={formValue.password || ""}
          onChange={handleInputChange}
        />
        <button className="welcome-form__button button" type="submit">
          {isLoading ? "Обработка запроса..." : "Зарегистрироваться"}
        </button>
      </form>
      <p className="welcome-form__text">
        Уже зарегистрированы?{" "}
        <Link to="/signin" className="link">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
