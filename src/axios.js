import axios from "axios";

// Crea una nuova istanza di Axios
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // URL base per le API
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
