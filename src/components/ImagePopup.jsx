import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";

export default function ImagePopup({ card }) {
  const [image, setImage] = useState({ link: "", name: "" });

  const { closeAllPopups } = useContext(AppContext);

  function handleClick(evt) {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close")
    ) {
      closeAllPopups();
    }
  }

  function onImageLoad({ target: img }) {
    setImage({ link: img.src, name: img.alt });
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
          {card ? (
            <Image link={card?.link} name={card?.name} onLoad={onImageLoad} />
          ) : (
            <Image link={image.link} name={image.name} />
          )}
        </figure>
      </div>
    </div>
  );
}

const Image = ({ link, name, onLoad }) => (
  <>
    <img
      src={link}
      alt={name}
      className="popup__image-zoomed"
      onLoad={onLoad}
    />
    <figcaption className="popup__caption">{name}</figcaption>
  </>
);
