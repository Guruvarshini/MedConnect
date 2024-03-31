import React, { useState, useEffect } from "react";
import { useParams,Link } from "react-router-dom";
import axios from "axios";
import { useEmail } from "./EmailContext";
const BookAppointment = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const {email}=useEmail();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getdetails', { params: { id: id } });
                setDoctor(response.data[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, [id]);
    console.log(doctor)
    return (
        <div className="container">
            <div className="main-body">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    {doctor && (
                                        <img src={doctor.image_url} alt={doctor.name} className="rounded-circle" width={180} height={180} />
                                    )}
                                    <div className="mt-3">
                                        {doctor && (
                                            <>
                                                <h4>{doctor.name}</h4>
                                                <p className="text-secondary mb-1">{doctor.specialisation}</p>
                                                <p className="text-muted font-size-sm">{doctor.department}</p>
                                                <p className="text-secondary mb-1">{doctor.description}</p>
                                                {email ? (
  <Link to={`/form/${doctor.id}`} className="btn btn-primary">Book Appointment</Link>
) : (
  <Link to="/login" className="btn btn-primary">Book Appointment</Link>
)}

                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        {doctor && (
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Full Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {doctor.name}
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Specialisation</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {doctor.specialisation}
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Experience</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {doctor.experience} years
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Qualification</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {doctor.qualification}
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Fees</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            ${doctor.fees}
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Known Languages</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {doctor.known_languages.join(' ')}
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Available Time Slots</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {doctor.available_time_slots.join(' ')}
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Working Days</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {doctor.working_days.join(' ')}
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Experience</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {doctor.experience} years
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="row gutters-sm">
                    <div className="col-sm-4 mb-3">
                        <div className="card h-100">
                            <div className="card-body">
                                <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">Achievements</i></h6>
                                {doctor && doctor.achievements.map((achievement, index) => (
                                    <div key={index}>
                                        <img src="https://png.pngtree.com/png-vector/20190819/ourlarge/pngtree-gold-trophy-icon-trophy-icon-winner-icon-png-image_1694365.jpg" width={50} height={50} style={{height:"50px",borderRadius:"50%",marginRight:"10px"}} alt="Achievement" className="img-fluid mb-2" />
                                          {achievement}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 mb-3">
                        <div className="card h-100">
                            <div className="card-body">
                                <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">Honors</i></h6>
                                {doctor && doctor.honors.map((honor, index) => (
                                    <div key={index}>
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaLXHyHdn_VpIP4pLZmPRBl5aQ-KsrS5GMcElw48Z1Ac_Fu4oGw9jKBhXypI8TKS970zU&usqp=CAU" alt="Honor" width={50} height={50} style={{height:"50px",borderRadius:"50%",marginRight:"10px"}} className="img-fluid mb-2" />
                                        {honor}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 mb-3">
                        <div className="card h-100">
                            <div className="card-body">
                                <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">Working History</i></h6>
                                {doctor && doctor.working_history.map((history, index) => (
                                    <div key={index}>
                                        <img src="https://cdn-icons-png.flaticon.com/512/1945/1945663.png" alt="Working History" width={50} height={50} style={{height:"50px",borderRadius:"50%",marginRight:"10px"}} className="img-fluid mb-2" />
                                        <small>{history}</small>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookAppointment;
