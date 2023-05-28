import { useEffect } from "react";

export default function PopupWithForm({
  title,
  name,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  function handleClick(evt) {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close")
    ) {
      onClose();
    }
  }

  useEffect(() => {
    if (!isOpen) return;

    function handleUserEscKeyPress(evt) {
      if (evt.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleUserEscKeyPress);
    return () => document.removeEventListener("keydown", handleUserEscKeyPress);
  }, [isOpen, onClose]);

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
        </form>
      </div>
    </div>
  );
}
