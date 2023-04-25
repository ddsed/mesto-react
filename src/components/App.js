import React, {useState, useEffect} from 'react';
import api from '../utils/Api';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState({});
	const [currentUser, setCurrentUser] = useState({ name: '', about: '', avatar: '' });
	const [cards, setCards] = useState([]);

	// API изначальных данных юзера и карточек
	useEffect(() => {
        api.getUserInfoApi()
        .then((user) => {
			setCurrentUser(user)
        })
        .catch((err) => {
            console.log(err);
        });

		api.getInitialCards()
        .then((res) => {
            setCards(res);
        })
        .catch((err) => {
            console.log(err);
        });
	}, []);

	//Лайк карточек
	function handleCardLike(card) {
		const isLiked = card.likes.some(i => i._id === currentUser._id);
		
		api.changeLikeCardStatus(card._id, isLiked)
		.then((newCard) => {
			setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
		})
		.catch((err) => {
            console.log(err);
        });
	} 

	//Удаление карточки
	function handleCardDelete(card) {
		api.deleteCardApi(card._id)
        .then(() => {
			setCards((state) => state.filter((el) => el._id !== card._id));
			closeAllPopups();
		  })
		  .catch((err) => {
			console.error(err);
		  });
	}

	//Обновление данных юзера
	function handleUpdateUser(data) {
		api
		  .editUserInfo(data)
		  .then((newData) => {
			setCurrentUser(newData);
			closeAllPopups();
		  })
		  .catch((err) => {
			console.error(err);
		  });
	}

	//Обновление данных аватара
	function handleUpdateAvatar(data) {
		api
		  .changeAvatar(data)
		  .then((newData) => {
			setCurrentUser(newData);
			closeAllPopups();
		  })
		  .catch((err) => {
			console.error(err);
		  });
	}

	//Добавление новой карточки
	function handleAddPlaceSubmit(name, link) {
		api
		.createNewCard(name, link)
		.then((newCard) => {
		  setCards([newCard, ...cards]);
		  closeAllPopups();
		})
		.catch((err) => {
		  console.error(err);
		});
	}

	//Попапы открытие и закрытие
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleCardClick(card) {
        setIsImagePopupOpen(true)
        setSelectedCard(card)
    }

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false)
		setIsAddPlacePopupOpen(false)
		setIsEditAvatarPopupOpen(false)
		setIsImagePopupOpen(false)
	}

	return (
		<div className="page">
			<CurrentUserContext.Provider value={currentUser}>
				<Header />
				<Main
					cards={cards}
					onEditProfile={handleEditProfileClick}
					onAddPlace={handleAddPlaceClick}
					onEditAvatar={handleEditAvatarClick}
					onCardClick={handleCardClick}
					onCardLike={handleCardLike}
					onCardDelete={handleCardDelete}
				/>

				<Footer />

				{/* Попап редактирования профиля */}
				<EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

				{/* Попап добавления карточки */}
				<AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddPlaceSubmit}/>

				{/* Попап обновления аватара */}
				<EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

				{/*Попап большой картинки*/}
				<ImagePopup
				card={selectedCard}
				isOpen={isImagePopupOpen}
				onClose={closeAllPopups}
				/>

				{/*<div className="popup popup_type_delete">
					<div className="popup__container">
						<button className="popup__close-button button" type="button"></button>
						<h2 className="popup__title popup__title_type_delete">Вы уверены?</h2>
						<button className="popup__submit-button popup__submit-button_type_confirm-delete" type="submit">Да</button>
					</div>
				</div>*/}
			</CurrentUserContext.Provider>
		</div>
  );
}

export default App;
