import React from "react";
import { Link } from 'react-router-dom';
function Subfeature({title,img}){
    return(
        <div class="feature">
        <Link to={`/${title}`} className="feature_link" style={{textDecoration:"none"}}>
            <img src={img} alt="icon" class="feature_img"/>
            <h5>{title}</h5>
        </Link>
    </div>
    );
}
export default Subfeature;