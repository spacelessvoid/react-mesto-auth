import { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";

export default function ImagePopup({ card }) {
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
    if (!card) return;

    function handleUserEscKeyPress(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    document.addEventListener("keydown", handleUserEscKeyPress);
    return () => document.removeEventListener("keydown", handleUserEscKeyPress);
  }, [card, closeAllPopups]);

  return (
    <div
      className={`popup popup_bg-opacity_darker ${card && "popup_opened"}`}
      id="popup-zoom-image"
      onClick={handleClick}
    >
      <div className="popup__zoom-container">
        <button
          className="popup__close button"
          type="button"
          aria-label="Закрыть всплывающее окно"
        ></button>
        <figure className="popup__figure">
          <img
            src={card?.link}
            alt={card?.name}
            className="popup__image-zoomed"
          />
          <figcaption className="popup__caption">{card?.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}
