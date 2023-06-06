import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onAddPlace }) {
  const [cardTitle, setCardTitle] = useState("");

  const handleChangeCardTitle = e => {
    setCardTitle(e.target.value);
  };

  const [cardLink, setCardLink] = useState("");

  const handleChangeCardLink = e => {
    setCardLink(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: cardTitle,
      link: cardLink,
    });
  }

  useEffect(() => {
    setCardTitle("");
    setCardLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      title={"Новое место"}
      name={"add-image"}
      buttonLoading={"Сохранение..."}
      buttonText={"Создать"}
      isOpen={isOpen}
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
        value={cardTitle || ""}
        onChange={handleChangeCardTitle}
      />
      <span className="popup__input-error title-input-error"></span>
      <input
        className="popup__text-input popup__text-input_type_link"
        type="url"
        name="link"
        id="link-input"
        placeholder="Ссылка на картинку"
        required
        value={cardLink || ""}
        onChange={handleChangeCardLink}
      />
      <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
  );
}
