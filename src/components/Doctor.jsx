import React, { useEffect, useState } from "react";
import axios from "axios";
import DoctorCard from "./DoctorCard"; 

function Doctor() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:3001/getdoctors");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div class="search">
      {doctors.map((doctor, index) => (
        <DoctorCard
          key={index}
          id={doctor.id}
          name={doctor.name}
          specialisation={doctor.specialisation}
          experience={doctor.experience}
          qualification={doctor.qualification}
          fees={doctor.fees}
          image_url={doctor.image_url}
          known_languages={doctor.known_languages}
          available_time_slots={doctor.available_time_slots}
          working_days={doctor.working_days}
        />
      ))}
    </div>
  );
}

export default Doctor;
