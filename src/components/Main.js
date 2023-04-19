import React, {useState, useEffect} from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

    const [userName, setUserName] = useState("");
    const [userDescription, setUserDescription] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getUserInfoApi()
        .then(({name, about, avatar}) => {
            setUserName(name);
            setUserDescription(about);
            setUserAvatar(avatar);
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
    }, [])

    return (
        <main className="content">
            <section className="profile">
                
                <img className="profile__avatar" src={userAvatar} alt="Фото" />
                <div className="profile__avatar-container">	
                    <button className="profile__avatar-button button" type="button" onClick={onEditAvatar}></button>
                </div>

                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button className="profile__edit-button button" type="button" onClick={onEditProfile}></button>
                    <p className="profile__description">{userDescription}</p>
                </div>

                <button className="profile__add-button button" type="button" onClick={onAddPlace}></button>
            </section>

            <section className="elements">
                <ul className="elements__grid-container">
                    {cards.map((card) => (
                        <Card
                        card={card}
                        key={card._id}
                        likes={card.likes}
                        name={card.name}
                        link={card.link}
                        onCardClick={onCardClick}
                        />)
                    )}
                </ul> 
            </section>
        </main>
    )
}

export default Main