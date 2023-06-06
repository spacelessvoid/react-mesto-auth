import { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";

export default function PopupWithForm({
  title,
  name,
  buttonText,
  buttonLoading,
  children,
  isOpen,
  onSubmit,
}) {
  const { isLoading, closeAllPopups } = useContext(AppContext);

  function handleClick(evt) {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close")
    ) {
      closeAllPopups();
    }
  }

  useEffect(() => {
    if (!isOpen) return;

    function handleUserEscKeyPress(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    document.addEventListener("keydown", handleUserEscKeyPress);
    return () => document.removeEventListener("keydown", handleUserEscKeyPress);
  }, [isOpen, closeAllPopups]);

  return (
    <div
      className={"popup" + (isOpen ? " popup_opened" : "")}
      id={`popup-${name}`}
      onClick={handleClick}
    >
      <div className="popup__container">
        <button
          className="popup__close button"
          type="button"
          aria-label="Закрыть всплывающее окно"
        ></button>

        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          id={`${name}`}
          name={`${name}`}
          onSubmit={onSubmit}
        >
          {children}
          <button className="popup__button button" type="submit">
            {isLoading ? buttonLoading : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
