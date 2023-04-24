import React, {useState, useEffect} from 'react';
import api from '../utils/Api';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState({});
	const [currentUser, setCurrentUser] = useState({ name: '', about: '', avatar: '' });
	const [cards, setCards] = useState([]);

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
				/>

				<Footer />

				{/* Попап редактирования профиля */}
				<PopupWithForm
					name='edit-profile'
					title='Редактировать профиль'
					buttonText='Сохранить'
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
				>
					<input type="text" id="name-input" className="popup__item popup__item_el_name" name="form-name" placeholder="Имя" required minLength="2" maxLength="40" />
					<span className="name-input-error popup__item-error popup__item-error_first"></span>

					<input type="text" id="description-input" className="popup__item popup__item_el_description" name="form-description" placeholder="О себе" required minLength="2" maxLength="200" />
					<span className="description-input-error popup__item-error popup__item-error_second"></span>
				</PopupWithForm>

				{/* Попап добавления карточки */}
				<PopupWithForm
					name='add-card'
					title='Новое место'
					buttonText='Создать'
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
				>
					<input type="text" id="place-input" className="popup__item popup__item_el_name" name="form-name" placeholder="Название" required minLength="2" maxLength="30" />
					<span className="place-input-error popup__item-error popup__item-error_first"></span>

					<input type="url" id="place-url-input" className="popup__item popup__item_el_description" name="form-description" placeholder="Ссылка на картинку" required />
					<span className="place-url-input-error popup__item-error popup__item-error_second"></span>
				</PopupWithForm>

				{/* Попап обновления аватара */}
				<PopupWithForm
					name='avatar'
					title='Обновить аватар'
					buttonText='Сохранить'
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
				>
					<input type="url" id="avatar-input" className="popup__item popup__item_el_description popup__item_type_avatar" name="form-description" placeholder="Ссылка на аватар" required />
					<span className="avatar-input-error popup__item-error"></span>
				</PopupWithForm>


				<div className="popup popup_type_image">
					<div className="popup__content">
						<button className="popup__close-button button" type="button"></button>
						<img className="popup__photo" />
						<h2 className="popup__title popup__title_type_image"></h2>
					</div>
				</div>

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
