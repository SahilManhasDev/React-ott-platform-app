import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODM0OTY0NGQzNDlmODA4MmUyYzdhZDhjZmJlNWVhOCIsInN1YiI6IjY0Y2M4YzUzZTFmYWVkMDBlNDExNGEyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.looJdxvBzmZGUWKbpuRyICV_c7eLU1vqia4ALPdYQHc";
const headers = {
    Authorization: "bearer " + API_TOKEN,
}

export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(
            BASE_URL + url, {
            headers,
            params
        })
        return data;
    } catch (error) {
        //throw new Error(error);
        return error
    }
}