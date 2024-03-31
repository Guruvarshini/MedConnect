import React, { useState} from 'react';
import axios from 'axios';
import Search from './Search';
import DoctorSearch from './DoctorSearch';
function FindDoctors(){
  const [doctors, setDoctors] = useState([]);
  const fetchData = async (inputValue) => {
    if (inputValue !== '') {
      try {
        const response = await axios.get('http://localhost:3001/api/doctors', {
          params: { prompt: inputValue }
        });

        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };
  return(
    <div style={{padding:"20px"}}>
    <Search trigger={fetchData} />
    <DoctorSearch doc={doctors}/>
    </div>
  );
}
export default FindDoctors;