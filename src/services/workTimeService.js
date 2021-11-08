import axios from "axios";

export default class WorkTimeService {
    getAll() {
        return axios.get("http://localhost:8081/api/worktimes/getAll")
    }
}