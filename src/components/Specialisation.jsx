import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DoctorSearch from './DoctorSearch';

function Specialisation() {
  const { name } = useParams();
  const [doctor, setDoctor] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (inputValue) => {
      try {
        const response = await axios.get('http://localhost:3001/api/department', {
          params: { special: inputValue }
        });

        setDoctor(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(name);
  }); 

  if (loading) {
    return <div>Loading...</div>;
  }

  return <DoctorSearch doc={doctor} />;
}

export default Specialisation;
