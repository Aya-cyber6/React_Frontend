import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message, Card } from "antd";
import axios from "axios";

// Constants
const API_URL = "https://localhost:7157/api/auth/login";
const HOME_ROUTE = "/students";
const TOKEN_KEY = "token";

const Login = () => {
  // State management
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Effects
  useEffect(() => {
    checkExistingSession();
  }, []);

  // Helper functions
  const checkExistingSession = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      navigate(HOME_ROUTE);
    }
  };

  const handleLoginSuccess = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
    navigate(HOME_ROUTE);
  };

  const handleLoginError = (error) => {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Login failed. Please try again.";
    message.error(errorMessage);
  };

  // Event handlers
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(API_URL, values);
      handleLoginSuccess(response.data.result);
    } catch (error) {
      handleLoginError(error);
    } finally {
      setLoading(false);
    }
  };

  // Form layout
  return (
    <Card
      title="Login"
      style={{
        maxWidth: 450,
        margin: "auto",
        marginTop: 100,
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Form
        name="loginForm"
        onFinish={handleSubmit}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "Please enter a valid email address!",
            },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              min: 6,
              message: "Password must be at least 6 characters!",
            },
          ]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
