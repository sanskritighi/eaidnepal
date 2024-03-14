import axios from "axios";


const DEPLOY_URL=process.env.DEPLOY_URL || "http://napa.pythonanywhere.com/"

export default axios.create({
  // baseURL: "https://napa.pythonanywhere.com/",
  baseURL: process.env.IS_PRODUCTION==="true"?DEPLOY_URL:"http://localhost:8000/",
});
