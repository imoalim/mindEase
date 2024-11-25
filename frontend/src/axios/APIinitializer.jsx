import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
        "Authentication": `Bearer ${localStorage.getItem("token")}`,
    }
});

export default client;