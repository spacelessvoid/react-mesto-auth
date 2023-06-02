import { useState } from "react";

function Login({ isLoading, handleAuthorization }) {
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
    handleAuthorization(formValue);
  };
  return (
    <section className="welcome-form">
      <h2 className="welcome-form__title">Вход</h2>
      <form
        className="welcome-form__form"
        id="login"
        name="login"
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
          {isLoading ? "Обработка запроса..." : "Войти"}
        </button>
      </form>
    </section>
  );
}

export default Login;
