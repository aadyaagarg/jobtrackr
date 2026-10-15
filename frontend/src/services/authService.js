import conf from "../conf/conf";
const API_URL = `${conf.apiBaseUrl}/auth`;
const login = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  localStorage.setItem("token", data.token);
  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }
  return data;
};
const register = async (fullName, email, password) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: fullName, email, password }),
  });
  const data = await response.text();
  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }
  return data;
};
const getToken = () => {
  return localStorage.getItem("token");
};
const logout = () => {
  localStorage.removeItem("token");
};
const authService = {
  login,
  logout,
  register,
  getToken,
};
export default authService;
