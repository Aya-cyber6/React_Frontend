import { Form, Input, Button } from "antd";
import api from "../services/api";

function StudentForm({ mode, onSuccess, onCancel, initialValues }) {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      if (mode === "create") {
        await api.post("/Students", values); // POST to api/Students
      } else if (mode === "edit" && initialValues?.id) {
        await api.put(`/Students/${initialValues.id}`, values); // PUT to api/Students/:id
      }
      onSuccess();
    } catch (error) {
      console.error("Failed to save student:", error);
      // You can add a message here for user feedback
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please enter the student's name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ type: "email", message: "Please enter a valid email" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {mode === "create" ? "Add Student" : "Update Student"}
        </Button>
        <Button style={{ marginLeft: 8 }} onClick={onCancel}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
}

export default StudentForm;
