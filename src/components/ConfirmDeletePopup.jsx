import { useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { AppContext } from "../contexts/AppContext";

export default function ConfirmDeletePopup({
  isOpen,
  onConfirmDelete,
  card,
}) {
  const { isLoading, closeAllPopups } = useContext(AppContext);

  function handleSubmit(e) {
    e.preventDefault();

    onConfirmDelete(card);
  }

  return (
    <PopupWithForm
      title={"Вы уверены?"}
      name={"confirm-delete"}
      isOpen={isOpen}
      onClose={closeAllPopups}
      onSubmit={handleSubmit}
    >
      <button className="popup__button button" type="submit">
        {isLoading ? "Удаление..." : "Да, удалить карточку"}
      </button>
    </PopupWithForm>
  );
}
