import axios from "axios";

export default class WorkTypeService {
    getAll() {
        return axios.get("http://localhost:8081/api/worktypes/getAll")
    }
}