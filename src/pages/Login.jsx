import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      console.log(values);
      const response = await axios.post(
        "https://localhost:7157/api/auth/login",
        values
      );
      localStorage.setItem("token", response.data.result);
      navigate("/students");

      console.log("Login successful:", response.data);
    } catch (error) {
      message.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      name="Login"
      onFinish={handleLogin}
      layout="vertical"
      style={{ maxWidth: 400, margin: "auto", marginTop: 100 }}
    >
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input placeholder="Enter your username" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="Enter your password" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          style={{ width: "100%" }}
          block
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Login;
