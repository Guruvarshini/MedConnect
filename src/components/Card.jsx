import React from "react";
function Card(props){
    return (
        <div class="card">
            <h3>{props.head}</h3>
            <img src={props.image} alt="transplant"/>
            <p>{props.content}</p>
            <a href={props.link}>Read More</a>
        </div>
    );
}
export default Card;