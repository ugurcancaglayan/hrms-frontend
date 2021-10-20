import axios from "axios";

export default class JobAdvertisementService{
    getJobs(){
        return axios.get("http://localhost:8081/api/jobAdvertisements/getAllActive")
    }
}