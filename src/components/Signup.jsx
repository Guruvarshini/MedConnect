import React from 'react';
import { Form, Input, Radio, Button } from 'antd';
import { useEmail } from './EmailContext';
import Logo from './docs.gif';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const { setEmail, setUserType } = useEmail(); 
  const nav=useNavigate();
  const onFinish = async (values) => {
    console.log('Success:', values);
    try {
      const response = await axios.post('http://localhost:3001/signin', values);

      if (response.status === 201) {
        setEmail(values.email);
        setUserType(values.userType); 
        if (values.userType==='patient') {
          nav('/account');
        }else{
          nav('appointments');
        }
      } else {
        alert("Signin failure");
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert("Mail already signed up");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <div className="illustration-wrapper">
          <img width={450} height={450} src={Logo} alt="Login" />
        </div>
        <Form
          name="signup-form"
          initialValues={{ userType: 'patient' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p className="form-title">Sign Up</p>
          <Form.Item
            name="email"
            rules={[{ required: true, type: 'email', message: 'Please input a valid email address!' }]}
          >
            <Input
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input
              placeholder="Name"
            />
          </Form.Item>

          <Form.Item
            name="userType"
            label="Are you a Doctor or a Patient?"
            rules={[{ required: true, message: 'Please select your role!' }]}
          >
            <Radio.Group>
              <Radio value="doctor">Doctor</Radio>
              <Radio value="patient">Patient</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="signup-form-button">
              SIGN UP
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
