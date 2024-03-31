import React from "react";
import Item from "./Item";
function Carousel(){
    return(
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
     <div class="carousel-inner">
    <Item src="https://cdn.apollohospitals.com/dev-apollohospitals/2023/07/pcr_newah.jpg" isActive="true"/>
    <Item src="https://cdn.apollohospitals.com/dev-apollohospitals/2023/11/ACC-web-Banner-Desktop-option2-03-03-2.jpg"/>
    <Item src="https://cdn.apollohospitals.com/dev-apollohospitals/2023/11/childrens_banner_web.jpg"/>
    </div>
     <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
    </a>
     <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
    </a>
</div>
    );
}
export default Carousel;