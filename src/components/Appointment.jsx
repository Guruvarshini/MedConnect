import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Alert, Button } from 'antd';
import { useEmail } from './EmailContext';

const { Meta } = Card;

const Appointment = () => {
  const [doctorId, setDoctorId] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [doctorNotFound, setDoctorNotFound] = useState(false);
  const { email } = useEmail();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/getdoctorid?email=${email}`);
      if (data.length === 0) {
        setDoctorNotFound(true);
      } else {
        setDoctorId(data[0].id);
        fetchAppointments(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchAppointments = async (doctorId) => {
    try {
      const response = await axios.get(`http://localhost:3001/getappointments?doctorId=${doctorId}`);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:3001/cancelappointment?id=${appointmentId}&email=${email}`);
      fetchAppointments(doctorId);
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  const confirmAppointment = async (appointmentId) => {
    try {
      await axios.put(`http://localhost:3001/confirmappointment?id=${appointmentId}&email=${email}`);
      fetchAppointments(doctorId);
    } catch (error) {
      console.error('Error confirming appointment:', error);
    }
  };

  return (
    <div>
      {doctorNotFound ? (
        <div style={{ width: "100%", height: "80vh" }}>
          <Alert message="Doctor not registered by the admin" type="warning" showIcon />
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
          {appointments.map(appointment => (
            <Card
              key={appointment.id}
              style={{ width: 300 }}
            >
              <Meta title={`Appointment ID: ${appointment.id}`} />
              <hr />
              <p>Time: {appointment.appointment_time}</p>
              <p>Patient Name: {appointment.patient_name}</p>
              <p>Condition: {appointment.patient_condition}</p>
              <p>Condition Description: {appointment.condition_description}</p>
              <p>Appointment Date: {appointment.appointment_date}</p>
              <p>Procedure: {appointment.procedure}</p>
              <p>Date of Birth: {appointment.date_of_birth}</p>
              <p>Gender: {appointment.gender}</p>
              <p>Phone Number: {appointment.phone_number}</p>
              {appointment.status!=="confirmed" && (
                <Button onClick={() => cancelAppointment(appointment.id)}>Cancel Appointment</Button>
              )}
              {appointment.status!=="confirmed" && (
                <Button onClick={() => confirmAppointment(appointment.id)}>Confirm Appointment</Button>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointment;
