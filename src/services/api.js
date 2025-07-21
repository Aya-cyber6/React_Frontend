import axios from "axios";

// get the base URL from environment variables or use a default
const api = axios.create({
  //baseURL: process.env.REACT_APP_API_BASE_URL, // THIS LINE DID NOT WORK
  baseURL: "https://localhost:7157/api", // backend API base URL
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// // Add a response interceptor to handle errors globally
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized access, e.g., redirect to login
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
