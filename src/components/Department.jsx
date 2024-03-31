import React from "react";
import Button from './Button';
import Flex from "./Flex";
function Department(){
    return (
    <div class="dep">
         <h2 class="dep_head">Explore our Centres of Clinical Excellence</h2>
         <p class="dep_sub_head">Learn about the world class health care we provide</p>
         <br/>
         <Flex img="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/speciality_ah.webp"/>
         <div class="widget-container">
         <Button image="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/cardiology_icon.svg" name="Cardiology"/>
         <Button image="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/neurology.svg" name="Neurology"/>
         <Button image="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/gastroenterology.svg" name="Gasentrology"/>
         <Button  image="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/orthopaedic.svg" name="Orthopedic"/>
         <Button  image="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/oncology_icon.svg" name="Oncology"/>
         <Button  image="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/gynecology.svg" name="Gynaceology"/>
         <Button  image="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/dermatology.svg" name="Dermatology"/>
         <Button  image="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/ophthalmology.svg" name="Opthalmology"/>
         <Button  image="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/paediatricurology.svg" name="Paediatrics"/>
         <Button  image="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/endocrinology.svg" name="Enocrinology"/>
         <Button  image="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/urology.svg" name="Urology"/>
         <Button  image="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/nephrology.svg" name="Nephrology"/>
         <Button  image="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/pulmonology.svg" name="Pulmology"/>
         <Button  image="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/rheumatology.svg" name="Rheumatology"/>
         <Button  image="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/neurology.svg" name="Neurology"/>
         <Button  image="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/radiology.svg" name="Radiology"/>
         <Button  image="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/plasticsurgery.svg" name="Plastic Surgery"/>
         <Button  image="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/neonatology.svg" name="Neonatology"/>
         <Button  image="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/vascularsurgery.svg" name="Vascular Surgery"/>
         <Button  image="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/psychiatry.svg" name="Psychiatry"/>
         <Button  image="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/dentistry.svg" name="Dentistry"/>
         <Button  image="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/ent.svg" name="ENT"/>
         </div>
    </div>
    );
}
export default Department;