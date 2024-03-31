import React from 'react';
import { Link } from 'react-router-dom';

function Button({ name, image }) {
  return (
    <Link to={`/specialisation/${name}`} className="widget" style={{textDecoration:"none"}}>
      <div className="widget_link">
        <img src={image} alt="icon" className="widget_img" />
        <h5>{name}</h5>
      </div>
    </Link>
  );
}

export default Button;
