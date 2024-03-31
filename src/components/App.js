import React from 'react';
import { EmailProvider } from './EmailContext.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home.jsx';
import Specialisation from './Specialisation.jsx';
import FindDoctors from './FindDoctors.jsx';
import Doctor from './Doctor.jsx';
import ChatBot from './ChatBot.jsx';
import BookAppointment from './BookAppointment.jsx';
import Header from './Header.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Footer from './Footer.jsx';
import Formi from './Formi.jsx';
import Account from './Account.jsx';
import Appointments from './Appointment.jsx';
import DoctorForm from './DoctorForm.jsx';
function App() {
  return (
    <EmailProvider>
<Router>
   <Header/>
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/specialisation/:name" element={<Specialisation />} />
        <Route path="/Find Doctors" element={<FindDoctors />}/>
        <Route path='/Book Appointment' element={<Doctor/>}/>
        <Route path='/Online ChatBot' element={<ChatBot/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/BookAppointment/:id' element={<BookAppointment/>}/>
        <Route path='/form/:id' element={<Formi/>}/>
        <Route path='/account' element={<Account/>}/>
        <Route path='/appointments' element={<Appointments/>}/>
        <Route path='/addDoc' element={<DoctorForm/>}/>
    </Routes>
    <Footer/>
</Router>
</EmailProvider>
  );
}

export default App;
