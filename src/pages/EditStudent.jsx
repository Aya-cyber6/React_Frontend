import { Card, message, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import StudentForm from "../components/StudentForm";
import api from "../services/api";

function EditStudent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    api
      .get(`/api/Students/${id}`)
      .then((res) => setStudentData(res.data.result))
      .catch((err) =>
        messageApi.error("Error fetching student data: " + err.message)
      )
      .finally(() => setLoading(false));
  }, [id, messageApi]);

  const onSuccess = () => {
    messageApi.success("Student updated successfully.");
    navigate("/students");
  };

  const onCancel = () => navigate("/students");

  return (
    <>
      {contextHolder}
      <Spin spinning={loading} tip="Loading...">
        {!loading && (
          <Card title="Edit Student">
            <StudentForm
              mode="edit"
              initalValuse={studentData}
              onSuccess={onSuccess}
              onCancel={onCancel}
            />
          </Card>
        )}
      </Spin>
    </>
  );
}

export default EditStudent;
