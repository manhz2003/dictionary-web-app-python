import axios from "../axios";

export const apiGetAllCategory= () =>
    axios({
        url: "/categories",
        method: "get",
});

export const apiCreateCategory = (data) =>
    axios({
        url: "/categories",
        method: "post",
        data,
});

export const apiUpdateCategory = (data) =>
    axios({
        url: "/categories",
        method: "put",
        data,
});

export const apiDeleteCategory = (id) =>
    axios({
        url: `/categories/${id}`,
        method: "delete",
});

export const apiGetTotalCategory = () =>
    axios({
        url: `/categories/count`,
        method: "get",
});