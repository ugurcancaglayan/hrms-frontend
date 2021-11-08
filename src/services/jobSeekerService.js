import axios from "axios";

export default class JobAdvertisementService {
  findByEmailAndPassword(email, password) {
    return axios.get(
      `http://localhost:8081/api/jobseekers/findByEmailAndPassword?email=${email}&password=${password}`
    );
  }
}
