import { useEffect } from "react";

export default function ImagePopup({ card, onClose }) {
  function handleClick(evt) {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close")
    ) {
      onClose();
    }
  }

  useEffect(() => {
    if (!card) return;

    function handleUserEscKeyPress(evt) {
      if (evt.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleUserEscKeyPress);
    return () => document.removeEventListener("keydown", handleUserEscKeyPress);
  }, [card, onClose]);

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
