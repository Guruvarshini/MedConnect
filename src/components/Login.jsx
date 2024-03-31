import React from 'react';
import { Form, Input, Button } from 'antd';
import Logo from './docl.gif';
import { useEmail } from './EmailContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
    const {setEmail,setUserType}=useEmail();
    const nav=useNavigate();
  const onFinish = async(values) => {
    try {
        const response = await axios.post('http://localhost:3001/login', values);
  
        if (response.status === 201) {
          setEmail(values.username);
          setUserType(response.data.userType);
          if(values.username==="2112059@nec.edu.in"){
            nav('/adddoc');
          }
          else if(response.data.userType==='patient'){
            nav('/account');
          }
          else{
            nav('/appointments');
          }
        } else {
          alert("Login failure");
        }
      } catch (error) {
        console.error('Error registering user:', error);
        alert("Login failure");
      }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img src={Logo} width={450} height={450} alt="Login"/>
        </div>
        <Form
          name="login-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p className="form-title">Welcome back</p>
          <p>Login to the Dashboard</p>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              placeholder="Username"
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

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
