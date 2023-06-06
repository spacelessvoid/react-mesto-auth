import { useContext, useEffect } from "react";
import success from "../images/register-success.svg";
import fail from "../images/register-fail.svg";
import { AppContext } from "../contexts/AppContext";

function InfoTooltip({ isOpen, isSuccess }) {
  const { closeAllPopups } = useContext(AppContext);

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
      id={`popup-info`}
      onClick={handleClick}
    >
      <div className="popup__container">
        <button
          className="popup__close button"
          type="button"
          aria-label="Закрыть всплывающее окно"
        ></button>
        <img
          className="popup__tooltip-image"
          src={isSuccess ? success : fail}
          alt=""
        />
        <h2 className="popup__title popup__title_centered">
          {isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
