import React, { useState, useEffect } from 'react';
import { useEmail } from './EmailContext';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import { Input, DatePicker, Select, Button, Form } from 'antd';
const { Option } = Select;
const { TextArea } = Input;
function Formi() {
    const { id } = useParams();
    const {email}=useEmail();
    const [firstName, setFirstName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [condition, setCondition] = useState('');
    const [procedure, setProcedure] = useState('');
    const [conditionDescription, setConditionDescription] = useState('');
    const [doctor, setDoctor] = useState(null);
    const [workingDays, setWorkingDays] = useState([]);
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const nav=useNavigate();
    useEffect(() => {
        fetchDoctors();
    }, []);

    useEffect(() => {
        if (doctor) {
            setAppointmentTime('');
            setWorkingDays(doctor.working_days);
            setAvailableTimeSlots(doctor.available_time_slots);
            console.log(workingDays);
        }
    }, [doctor]);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get("http://localhost:3001/getavailable", { params: { id: id } });
            setDoctor(response.data[0]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const onFinish = async (values) => {
        console.log('Success:', values);
        try {
            const response = await axios.post('http://localhost:3001/bookapp', { values, id, email });
    
            if (response.status === 201) {
                alert('Appointment Confirmed');
                nav('/account');
            } else if (response.status === 200) {
                alert('Slot Full');
            } else {
                alert("Appointment failure");
            }
        } catch (error) {
            console.error('Error appointing user:', error);
        }
    };
    
    
      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };

    const validateDate = (current) => {
        const today = new Date();
        const selectedDayIndex = current.day(); 
        const todayDayIndex = today.getDay(); 
        const todayDate = today.getDate(); 
        const selectedDate = current.date(); 
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        const workingDaysIndices = workingDays.map(day => daysOfWeek.indexOf(day));
        return !current.isAfter(today)||(current.isAfter(today) && !workingDaysIndices.includes(selectedDayIndex));
    };
    
    const getMinDate = () => {
        const today = new Date();
        let minDate = new Date();

        while (!workingDays.includes(minDate.getDay())) {
            minDate.setDate(minDate.getDate() + 1);
        }

        return minDate;
    };

    return (
        <div className="form-container" style={{marginTop:"20px",marginBottom:"20px"}}>
            <div className="banner">
                <img src="https://cdn.dribbble.com/users/35617/screenshots/2166639/media/1f4e4beda0040da44d7d86684358d017.gif" alt="Hospital Banner" />
            </div>
            <Form layout="horizontal" onFinish={onFinish} onFinishFailed={onFinishFailed}>
    <h1>Doctor Appointment Request Form</h1>
    <Form.Item label="Name" name="firstName">
        <Input name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
    </Form.Item>
    <Form.Item label="Date of Birth" name="dateOfBirth">
        <DatePicker name="dateOfBirth" value={dateOfBirth} onChange={(date) => setDateOfBirth(date)} />
    </Form.Item>
    <Form.Item label="Gender" name="gender">
        <Select name="gender" value={gender} onChange={(value) => setGender(value)}>
            <Option value="">Please Select</Option>
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
            <Option value="Not willing to Disclose">Not willing to Disclose</Option>
        </Select>
    </Form.Item>
    <Form.Item label="Phone Number" name="phoneNumber">
        <Input type="tel" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
    </Form.Item>
    <Form.Item label="Appointment Date" name="appointmentDate">
        <DatePicker name="appointmentDate" value={appointmentDate} onChange={(date) => setAppointmentDate(date)} disabledDate={(s) => validateDate(s)} />
    </Form.Item>
    <Form.Item label="Appointment Time" name="appointmentTime">
        <Select name="appointmentTime" value={appointmentTime} onChange={(value) => setAppointmentTime(value)}>
            <Option value="">Please Select</Option>
            {availableTimeSlots.map((timeSlot, index) => (
                <Option key={index} value={timeSlot}>{timeSlot}</Option>
            ))}
        </Select>
    </Form.Item>
    <Form.Item label="Condition" name="condition">
        <Input name="condition" value={condition} onChange={(e) => setCondition(e.target.value)} />
    </Form.Item>
    <Form.Item label="Procedure" name="procedure">
        <Select name="procedure" value={procedure} onChange={(value) => setProcedure(value)}>
            <Option value="">Please Select</Option>
            <Option value="Medical Examination">Medical Examination</Option>
            <Option value="Doctor Check">Doctor Check</Option>
            <Option value="Result Analysis">Result Analysis</Option>
            <Option value="Check-up">Check-up</Option>
        </Select>
    </Form.Item>
    <Form.Item label="Condition Description" name="conditionDescription">
        <TextArea name="conditionDescription" value={conditionDescription} onChange={(e) => setConditionDescription(e.target.value)} />
    </Form.Item>
    <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
    </Form.Item>
</Form>

        </div>
    );
}

export default Formi;
