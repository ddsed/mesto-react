import React from 'react';

function Main({ onEditProfile, onAddPlace, onEditAvatar }) {

    return (
        <main className="content">
            <section className="profile">
                
                <img className="profile__avatar" src="<%=require('./images/profile-photo.jpg')%>" alt="Фото" />
                <div className="profile__avatar-container">	
                    <button className="profile__avatar-button button" type="button" onClick={onEditAvatar}></button>
                </div>

                <div className="profile__info">
                    <h1 className="profile__name">Даша Седова</h1>
                    <button className="profile__edit-button button" type="button" onClick={onEditProfile}></button>
                    <p className="profile__description">Фотограф дикой природы</p>
                </div>

                <button className="profile__add-button button" type="button" onClick={onAddPlace}></button>
            </section>

            <section className="elements">
                <ul className="elements__grid-container">
                </ul> 
            </section>
        </main>
    )
}

export default Main