import React from "react";
import { Link } from "react-router-dom"; 

function DoctorCard(props) {
  return (
    <div className="search">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">{props.name}</h3>
          <div className="card-info">
            <p className="info">{props.specialisation}</p>
            <p className="info">{props.experience} years of experience</p>
            <p className="info">{props.qualification}</p>
            <p className="info">Fees: ${props.fees}</p>
            <p className="info">Available Time Slots: {props.available_time_slots.join('  ')}</p>
            <p className="info">Known Languages: {props.known_languages.join(' ')}</p>
            <p className="info">Working Days: {props.working_days.join('  ')}</p>
          </div>
          <Link to={`/BookAppointment/${props.id}`} className="btn btn-primary">See Profile</Link>
        </div>
      </div>
    </div>
  );
}

export default DoctorCard;
