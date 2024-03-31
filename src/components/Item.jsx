import React from "react";

function Item(props) {
    const { src, isActive } = props;

    return (
        <div className={`carousel-item${isActive ? " active" : ""}`}>
            <img className="d-block w-100" src={src} alt="Slide"/>
        </div>
    );
}

export default Item;
