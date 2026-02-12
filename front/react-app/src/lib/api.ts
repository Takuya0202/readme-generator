import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

export const loginRequest = (email: string, password: string) => {
    return api.post("/auth/login", {email, password});
}

export const signupRequest = (email: string, password: string) => {
    return api.post("/auth/register", {email, password})
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;