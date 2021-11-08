import axios from "axios";

export default class JobAdvertisementService {
  getJobs() {
    return axios.get(
      "http://localhost:8081/api/jobAdvertisements/getAllActive"
    );
  }

  getEmployersActiveJobAdv(id) {
    return axios.get(
      "http://localhost:8081/api/jobAdvertisements/getById?id=" + id
    );
  }

  getAllActiveSorted() {
    return axios.get(
      "http://localhost:8081/api/jobAdvertisements/getAllActiveSorted"
    );
  }

  filterJobs(cityId, workTimeId, workTypeId) {
    return axios.get(
      `http://localhost:8081/api/jobAdvertisements/filterJobs?cityId=${cityId}&workTimeId=${workTimeId}&workTypeId=${workTypeId}`
    );
  }
}
