import axios from "axios";


export default (baseUrl: string) => {
    return axios.create({
        baseURL: baseUrl,
    })
}
