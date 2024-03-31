import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function DoctorForm() {
  const [name, setName] = useState('');
  const [specialisation, setSpecialisation] = useState('');
  const [experience, setExperience] = useState('');
  const [qualification, setQualification] = useState('');
  const [fees, setFees] = useState('');
  const [knownLanguages, setKnownLanguages] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState('');
  const [workingDays, setWorkingDays] = useState('');
  const [department, setDepartment] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [achievements, setAchievements] = useState('');
  const [honors, setHonors] = useState('');
  const [awards, setAwards] = useState('');
  const [workingHistory, setWorkingHistory] = useState('');
  const [email_id, setlEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Split comma-separated strings into arrays
    const languagesArray = knownLanguages.split(',');
    const timeSlotsArray = availableTimeSlots.split(',');
    const workingDaysArray = workingDays.split(',');
    const awardsArray = awards.split(',');
    const achievementsArray = achievements.split(',');
    const honorsArray = honors.split(',');
    const workingHistoryArray = workingHistory.split(',');
  
    const doctorData = {
      name,
      specialisation,
      experience: parseInt(experience),
      qualification,
      fees: parseFloat(fees),
      known_languages: languagesArray,
      available_time_slots: timeSlotsArray,
      working_days: workingDaysArray,
      department,
      description,
      image_url: imageUrl,
      achievements: JSON.stringify(achievementsArray), 
      honors: JSON.stringify(honorsArray), 
      awards: JSON.stringify(awardsArray), 
      working_history: JSON.stringify(workingHistoryArray), 
      email_id
    };
  
    try {
      const response = await fetch('http://localhost:3001/api/adddoctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(doctorData)
      });
      
      if (response.status === 201) {
        alert('Doctor data inserted successfully.');
      } else {
        alert('Error:', response.statusText);
      }
    } catch (error) {
      alert('Error inserting doctor data:', error.message);
    }
  };
  

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px', maxWidth: '500px', margin: 'auto' }}>
      <img src='https://i.pinimg.com/originals/1e/0a/8c/1e0a8c05fa4735cbfc94c8fa337b305c.gif' alt="Doctor Banner" style={{ width: '100%', marginBottom: '20px' }} />

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="specialisation">
          <Form.Label>Specialisation</Form.Label>
          <Form.Control type="text" value={specialisation} onChange={(e) => setSpecialisation(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="experience">
          <Form.Label>Experience (in years)</Form.Label>
          <Form.Control type="number" value={experience} onChange={(e) => setExperience(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="qualification">
          <Form.Label>Qualification</Form.Label>
          <Form.Control type="text" value={qualification} onChange={(e) => setQualification(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="fees">
          <Form.Label>Fees</Form.Label>
          <Form.Control type="number" value={fees} onChange={(e) => setFees(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="knownLanguages">
          <Form.Label>Known Languages (comma-separated)</Form.Label>
          <Form.Control type="text" value={knownLanguages} onChange={(e) => setKnownLanguages(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="availableTimeSlots">
          <Form.Label>Available Time Slots (comma-separated)</Form.Label>
          <Form.Control type="text" value={availableTimeSlots} onChange={(e) => setAvailableTimeSlots(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="workingDays">
          <Form.Label>Working Days (comma-separated)</Form.Label>
          <Form.Control type="text" value={workingDays} onChange={(e) => setWorkingDays(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="department">
          <Form.Label>Department</Form.Label>
          <Form.Control type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="imageUrl">
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="achievements">
          <Form.Label>Achievements (comma-separated)</Form.Label>
          <Form.Control type="text" value={achievements} onChange={(e) => setAchievements(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="honors">
          <Form.Label>Honors (comma-separated)</Form.Label>
          <Form.Control type="text" value={honors} onChange={(e) => setHonors(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="awards">
          <Form.Label>Awards (comma-separated)</Form.Label>
          <Form.Control type="text" value={awards} onChange={(e) => setAwards(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" value={email_id} onChange={(e) => setlEmail(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="workingHistory">
          <Form.Label>Working History (comma-separated)</Form.Label>
          <Form.Control as="textarea" rows={3} value={workingHistory} onChange={(e) => setWorkingHistory(e.target.value)} />
        </Form.Group>

        <br/>
        <center>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </center>
      </Form>
    </div>
  );
}

export default DoctorForm;
