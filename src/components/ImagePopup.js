import React from 'react';

function ImagePopup() {
    return (
        <div className="popup popup_type_image">
            <div className="popup__content">
                <button className="popup__close-button button" type="button"></button>
                <img className="popup__photo" />
                <h2 className="popup__title popup__title_type_image"></h2>
            </div>
        </div>
    )
}

export default ImagePopup