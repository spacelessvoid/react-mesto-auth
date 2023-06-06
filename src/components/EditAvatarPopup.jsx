import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onUpdateAvatar }) {
  const [avatarLink, setAvatarLink] = useState("");

  const handleChangeCardTitle = e => {
    setAvatarLink(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarLink,
    });
  }

  useEffect(() => {
    setAvatarLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      title={"Обновить аватар"}
      name={"change-avatar"}
      buttonLoading={"Сохранение..."}
      buttonText={"Сохранить"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__text-input popup__text-input_type_avatar"
        type="url"
        name="avatar"
        id="avatar-input"
        placeholder="Ссылка на новый аватар"
        required
        value={avatarLink || ""}
        onChange={handleChangeCardTitle}
      />
      <span className="popup__input-error avatar-input-error"></span>
    </PopupWithForm>
  );
}
