function Login({ isLoading }) {
  return (
    <div className="welcome-form">
      <h2 className="welcome-form__title">Вход</h2>
      <form
        className="welcome-form__form"
        id="login"
        name="login"
        // onSubmit={onSubmit}
      >
        <input
          className="welcome-form__text-input"
          type="email"
          name="username"
          id="username-input"
          placeholder="Email"
          required
          // value={name || ""}
          // onChange={handleNameChange}
        />
        <input
          className="welcome-form__text-input"
          type="password"
          name="password"
          id="password-input"
          placeholder="Пароль"
          minLength="8"
          required
          // value={description || ""}
          // onChange={handleDescriptionChange}
        />
        <button className="welcome-form__button button" type="submit">
          {isLoading ? "Обработка запроса..." : "Войти"}
        </button>
      </form>
    </div>
  );
}

export default Login;
