import axios from "../axios";

export const apiGetAllDictionary = () =>
    axios({
        url: "/dictionaries",
        method: "get",
});

export const apiCreateDictionary = (data) =>
    axios({
        url: "/dictionaries/dictionary",
        method: "post",
        data,
});

export const apiUpdateDictionary = (data) =>
    axios({
        url: "/dictionaries/update",
        method: "put",
        data,
});

export const apiDeleteDictionary = (id) =>
    axios({
        url: `/dictionaries/${id}`,
        method: "delete",
});

export const apiGetTotalDictionary = () =>
    axios({
        url: "/dictionaries/total-counts",
        method: "get",
});

export const apiGetDictionaryByIdCategory = (id) =>
    axios({
        url: `dictionaries/search-by-category/${id}`,
        method: "get",
});

export const apiGetDictionaryById = (id) =>
    axios({
        url: `dictionaries/${id}`,
        method: "get",
});

export const apiSearchListDictionaryVietnamese = (keyword, page, size) =>
    axios({
        url: `dictionaries/search?keyword=${keyword}&page=${page}&size=${size}`,
        method: "get",
});
