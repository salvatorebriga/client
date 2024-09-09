import axios from "axios";

// Crea una nuova istanza di Axios
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // URL base per le API
  headers: {
    "Content-Type": "application/json",
  },
});

// Aggiungi un interceptor per includere il token di accesso
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
