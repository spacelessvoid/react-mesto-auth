import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  isLoading,
}) {
  const cardTitleRef = useRef();
  const cardLinkRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: cardTitleRef.current.value,
      link: cardLinkRef.current.value,
    });
  }

  useEffect(() => {
    cardTitleRef.current.value = "";
    cardLinkRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      title={"Новое место"}
      name={"add-image"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__text-input popup__text-input_type_title"
        type="text"
        name="name"
        id="title-input"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        ref={cardTitleRef}
      />
      <span className="popup__input-error title-input-error"></span>
      <input
        className="popup__text-input popup__text-input_type_link"
        type="url"
        name="link"
        id="link-input"
        placeholder="Ссылка на картинку"
        required
        ref={cardLinkRef}
      />
      <span className="popup__input-error link-input-error"></span>
      <button className="popup__button button" type="submit">
        {isLoading ? "Сохранение..." : "Создать"}
      </button>
    </PopupWithForm>
  );
}
