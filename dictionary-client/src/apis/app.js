import axios from "../axios";

export const apiGetAllRole = () =>
    axios({
        url: "/roles/all",
        method: "get",
});

