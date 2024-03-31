import React from "react";
import DoctorCard from "./DoctorCard";
function DoctorSearch(props){
    return(
        <div class="search">
      {(props.doc && props.doc.length>0) && props.doc.map((doctor, index) => (
        <DoctorCard
          key={index}
          id={doctor.id}
          name={doctor.name}
          specialisation={doctor.specialisation}
          experience={doctor.experience}
          qualification={doctor.qualification}
          fees={doctor.fees}
          known_languages={doctor.known_languages}
          available_time_slots={doctor.available_time_slots}
          working_days={doctor.working_days}
        />
      ))}
      </div>
    );
}
export default DoctorSearch;