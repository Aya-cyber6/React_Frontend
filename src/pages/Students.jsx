import { useEffect, useState } from "react";
import { Table, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/Students") // <-- Matches your API controller route
      .then((res) => {
        setStudents(res.data.result); // or res.data depending on your backend response structure
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => navigate(`/students/${record.id}`)}>
            View
          </Button>
          <Button
            onClick={() => navigate(`/students/${record.id}/edit`)}
            type="primary"
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>ALL STUDENTS</h2>
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => navigate("/AddStudent")}
      >
        Add Student
      </Button>
      <Table
        loading={loading}
        columns={columns}
        dataSource={students}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default Students;
