import React from 'react';

function Card({card, onCardClick}) {

    function handleClick() {
        onCardClick(card);
    }

    return(
            <li className="element">
                <img className="element__photo" src={card.link} alt={card.name} onClick={handleClick}/>

                <button className="element__delete" type="button"></button>
                <div className="element__wrapper">
                    <h2 className="element__title">{card.name}</h2>
                    <div className="element__like-wrapper">
                        <button className="element__like" type="button"></button>
                        <span className="element__like-count">{card.likes.length}</span>
                    </div>
                </div>
            </li>
    )
}

export default Card