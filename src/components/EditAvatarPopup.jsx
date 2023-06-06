import { useContext, useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { AppContext } from "../contexts/AppContext";

export default function EditAvatarPopup({ isOpen, onUpdateAvatar }) {
  const { isLoading, closeAllPopups } = useContext(AppContext);
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      title={"Обновить аватар"}
      name={"change-avatar"}
      isOpen={isOpen}
      onClose={closeAllPopups}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__text-input popup__text-input_type_avatar"
        type="url"
        name="avatar"
        id="avatar-input"
        placeholder="Ссылка на новый аватар"
        required
        ref={avatarRef}
      />
      <span className="popup__input-error avatar-input-error"></span>
      <button className="popup__button button" type="submit">
        {isLoading ? "Сохранение..." : "Сохранить"}
      </button>
    </PopupWithForm>
  );
}
