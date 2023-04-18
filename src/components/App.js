import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

	const[isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
	const[isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
	const[isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false)
		setIsAddPlacePopupOpen(false)
		setIsEditAvatarPopupOpen(false)
	  }

	return (
		<div className="page">

			<Header />
			<Main
				onEditProfile={handleEditProfileClick}
				onAddPlace={handleAddPlaceClick}
				onEditAvatar={handleEditAvatarClick}
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
				<input type="text" id="name-input" className="popup__item popup__item_el_name" name="form-name" placeholder="Имя" required minlength="2" maxlength="40" />
				<span className="name-input-error popup__item-error popup__item-error_first"></span>

				<input type="text" id="description-input" className="popup__item popup__item_el_description" name="form-description" placeholder="О себе" required minlength="2" maxlength="200" />
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
				<input type="text" id="place-input" className="popup__item popup__item_el_name" name="form-name" placeholder="Название" required minlength="2" maxlength="30" />
				<span className="place-input-error popup__item-error popup__item-error_first"></span>

				<input type="url" id="place-url-input" className="popup__item popup__item_el_description" name="form-description" placeholder="Ссылка на картинку" required />
				<span className="place-url-input-error popup__item-error popup__item-error_second"></span>
			</PopupWithForm>

			{/* Попап удаления карточки
			<PopupWithForm
				name='delete'
				title='Вы уверены?'
				buttonText='Да'
			>
			</PopupWithForm> */}

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


			{/*<div className="popup popup_type_delete">
				<div className="popup__container">
					<button className="popup__close-button button" type="button"></button>
					<h2 className="popup__title popup__title_type_delete">Вы уверены?</h2>
					<button className="popup__submit-button popup__submit-button_type_confirm-delete" type="submit">Да</button>
				</div>
			</div>*/}

			<template className="cards-template">
				<li className="element">
					<img className="element__photo" />

					<button className="element__delete" type="button"></button>
					<div className="element__wrapper">
						<h2 className="element__title"></h2>
						<div className="element__like-wrapper">
							<button className="element__like" type="button"></button>
							<span className="element__like-count">0</span>
						</div>
					</div>
				</li>
			</template>
		</div>
  );
}

export default App;
