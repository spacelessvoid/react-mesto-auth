import { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  function handleNameChange(e) {
    setName(e.target.value);
  }

  const [description, setDescription] = useState("");
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"edit-profile"}
      buttonLoading={"Сохранение..."}
      buttonText={"Сохранить"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__text-input popup__text-input_type_name"
        type="text"
        name="name"
        id="name-input"
        placeholder="Введите имя"
        minLength="2"
        maxLength="40"
        required
        value={name || ""}
        onChange={handleNameChange}
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        className="popup__text-input popup__text-input_type_job"
        type="text"
        name="about"
        id="job-input"
        placeholder="Введите краткое описание о себе"
        minLength="2"
        maxLength="200"
        required
        value={description || ""}
        onChange={handleDescriptionChange}
      />
      <span className="popup__input-error job-input-error"></span>
    </PopupWithForm>
  );
}
