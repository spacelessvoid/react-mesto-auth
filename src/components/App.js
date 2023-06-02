import { useState, useEffect } from "react";
import { api } from "../utils/Api";
import { authorize, register } from "../utils/Auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import InfoTooltip from "./InfoTooltip";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import PageNotFound from "./PageNotFound";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] =
    useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [deletedCard, setDeletedCard] = useState(null);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      // Fetching user profile data
      api.getUserInfo(),
      // Fetching initial cards
      api.getInitialCards(),
    ])
      .then(([userData, cards]) => {
        setCurrentUser(userData);

        setCards(cards);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // TODO: fix image popup closing glitch
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
      })
      .catch(err => console.log(err));
  }

  function handleConfirmDelete(card) {
    setIsConfirmDeletePopupOpen(true);
    setDeletedCard(card);
  }

  function handleCardDelete(card) {
    setIsLoading(true);

    api
      .deleteCard(card._id)
      .then(() => {
        setCards(state => state.filter(c => c._id !== card._id));
      })
      .catch(err => console.log(err))
      .finally(() => {
        closeAllPopups();
        setIsLoading(false);
      });
  }

  function handleUpdateUser(info) {
    setIsLoading(true);

    api
      .updateUserInfo(info)
      .then(newInfo => setCurrentUser(newInfo))
      .catch(err => console.log(err))
      .finally(() => {
        closeAllPopups();
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);

    api
      .updateUserAvatar(avatar)
      .then(newAvatar => setCurrentUser(newAvatar))
      .catch(err => console.log(err))
      .finally(() => {
        closeAllPopups();
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);

    api
      .addNewCard(card)
      .then(newCard => setCards([newCard, ...cards]))
      .catch(err => console.log(err))
      .finally(() => {
        closeAllPopups();
        setIsLoading(false);
      });
  }

  function handleLogin(email) {
    setLoggedIn(true);
    setCurrentUser({ ...currentUser, email: email });
  }

  function handleRegistration({ email, password }) {
    setIsLoading(true);

    register(email, password)
      .then(() => setIsRegistrationSuccessful(true))
      .then(() => {
        setIsInfoTooltipPopupOpen(true);
        navigate("/signin");
      })
      .catch(err => {
        console.log(err);
        setIsRegistrationSuccessful(false);
        setIsInfoTooltipPopupOpen(true);
      })
      .finally(setIsLoading(false));
  }

  function handleAuthorization({ email, password }) {
    setIsLoading(true);

    authorize(email, password)
      .then(data => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          handleLogin(email);
          navigate("/");
        }
      })
      .catch(console.log)
      .finally(setIsLoading(false));
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Routes>
          <Route
            path="/signup"
            element={
              <Register
                handleRegistration={handleRegistration}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                handleAuthorization={handleAuthorization}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleConfirmDelete}
                onUpdateUser={handleUpdateUser}
                cards={cards}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onConfirmDelete={handleCardDelete}
          isLoading={isLoading}
          card={deletedCard}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isRegistrationSuccessful}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
