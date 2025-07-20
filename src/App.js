import Login from "./pages/Login";
import Grades from "./pages/Grades";
import Students from "./pages/Students";
import PrivateRoute from "./components/PrivateRoute";
import RoleRoute from "./components/RoleRoute";
import { logout } from "./auth/auth";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Layout, Menu } from "antd";
const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Header style={{ color: "#fff", backgroundColor: "#001529" }}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["login"]}>
            <Menu.Item key="login">
              <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="students">
              <Link to="/students">Students</Link>
            </Menu.Item>
            <Menu.Item key="logout" onClick={logout}>
              Logout
            </Menu.Item>
          </Menu>
        </Header>

        <Content style={{ padding: "20px", minHeight: "80vh" }}>
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
              path="/grades"
              element={
                <RoleRoute allowedRoles={["Teacher"]}>
                  <Grades />
                </RoleRoute>
              }
            />

            <Route
              path="/unauthorized"
              element={<div>Unauthorized Access</div>}
            />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}
export default App;

//            <Route path="/students" element={<isLoggedIn() ? <Students /> : <Navigater to="/login" />} />
