import { Layout, Menu } from "antd";
import {
  Link,
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { logout } from "./auth/auth";
import Login from "./pages/Login";
import Students from "./pages/Students";
import Grades from "./pages/Grades";
import PrivateRoute from "./components/PrivateRoute";
import RoleRoute from "./components/RoleRoute";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import ViewStudentDetails from "./pages/ViewStudentDetails";
import { useMemo } from "react";

const { Header, Content, Footer } = Layout;

function App() {
  const location = useLocation();

  const selectedKey = useMemo(() => {
    if (location.pathname.startsWith("/students")) return "students";
    if (location.pathname.startsWith("/grades")) return "grades";
    if (location.pathname.startsWith("/login")) return "login";
    return "";
  }, [location.pathname]);

  const menuItems = [
    {
      key: "login",
      label: <Link to="/login">Login</Link>,
    },
    {
      key: "students",
      label: <Link to="/students">Students</Link>,
    },
    {
      key: "grades",
      label: <Link to="/grades">Grades</Link>,
    },

    {
      key: "logout",
      label: "Logout",
      onClick: logout,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#001529" }}>
        <Menu
          mode="horizontal"
          selectedKeys={[selectedKey]}
          theme="dark"
          items={menuItems}
        />
      </Header>
      <Content style={{ padding: "24px 48px", background: "#f0f2f5" }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/students"
            element={
              <PrivateRoute>
                <Students />
              </PrivateRoute>
            }
          />
          <Route
            path="/AddStudent"
            element={
              <RoleRoute allowedRoles={["Teacher"]}>
                <AddStudent />
              </RoleRoute>
            }
          />
          <Route
            path="/students/:id/edit"
            element={
              <RoleRoute allowedRoles={["Teacher"]}>
                <EditStudent />
              </RoleRoute>
            }
          />
          <Route
            path="/students/:id"
            element={
              <PrivateRoute>
                <ViewStudentDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/grades"
            element={
              <RoleRoute allowedRoles={["Teacher"]}>
                <Grades />
              </RoleRoute>
            }
          />
          <Route
            path="/unauthorized"
            element={
              <div style={{ textAlign: "center", marginTop: 50 }}>
                <h1> Unauthorized</h1>
                <p>You don't have permission to access this page.</p>
              </div>
            }
          />
        </Routes>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        University Management ©2025
      </Footer>
    </Layout>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
