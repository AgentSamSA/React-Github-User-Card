import axios from "axios";
import { API_LINK } from "./constants";

const fetchUserData = (user) => {
    return axios.get(API_LINK + user)
    .then((res) => {
        console.log(res.data);
        return (res);
    })
    .catch(err => console.log(err));
}

export default fetchUserData;