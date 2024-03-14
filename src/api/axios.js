import axios from "axios";


const DEPLOY_URL="http://napa.pythonanywhere.com/"

export default axios.create({
  // baseURL: "https://napa.pythonanywhere.com/",
  baseURL: DEPLOY_URL
});
