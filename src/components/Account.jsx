import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'antd';
import { useEmail } from './EmailContext';
const { Meta } = Card;

const Account = () => {
  const [appointmentSlots, setAppointmentSlots] = useState([]);
  const { email } = useEmail();

  useEffect(() => {
    console.log('Email:', email); 
    fetchData(email);
  }, [email]); 

  const fetchData = async (email) => {
    try {
      const response = await axios.get('http://localhost:3001/getappointment', {
        params: { email: email }
      });
      console.log('Response:', response.data); 
      setAppointmentSlots(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const cancelAppointment = async (id) => {
    try {
      await axios.post('http://localhost:3001/cancelappointment', { id });
      fetchData(); 
    } catch (error) {
      console.error('Error canceling appointment:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
      {appointmentSlots.length > 0 ? (
        appointmentSlots.map(appointment => (
          <Card
            key={appointment.id}
            style={{ width: 300 }}
            cover={<img alt="hospital-card" src="https://www.nicepng.com/png/detail/87-874647_red-cross-hospital-logo-hospital-logo-red-cross.png" />}
          >
            <Meta title={`Appointment ID: ${appointment.id}`} />
            <hr />
            <p>Doctor ID: {appointment.doctor_id}</p>
            <p>Time: {appointment.appointment_time}</p>
            <p>Patient Name: {appointment.patient_name}</p>
            <p>Condition: {appointment.patient_condition}</p>
            <p>Condition Description: {appointment.condition_description}</p>
            <p>Appointment Date: {appointment.appointment_date}</p>
            <p>Procedure: {appointment.procedure}</p>
            <p>Date of Birth: {appointment.date_of_birth}</p>
            <p>Gender: {appointment.gender}</p>
            <p>Phone Number: {appointment.phone_number}</p>
            {appointment.status !== "confirmed" && (
              <Button onClick={() => cancelAppointment(appointment.id)}>Cancel Appointment</Button>
            )}
          </Card>
        ))
      ) : (
        <p>No Appointments booked</p>
      )}
    </div>
  );
};

export default Account;
