import axios from "axios";

export default axios.create({
  // baseURL: "https://napa.pythonanywhere.com/",
  baseURL: "http://localhost:8000/",
});
