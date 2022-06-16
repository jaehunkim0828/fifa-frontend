import axios from "axios";

const url = 'http://localhost:8080';

export const getMethod = async (path: string, params?: object) => {
    const data = await axios.get(`${url}/${path}`, {
        params: {...params},
    });

    return data.data;
}

export const postMethod = async(path: string, body: object): Promise<any> => {
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
      };
    const data = await axios.post(`${url}/${path}`, body, axiosConfig);
    return data;
}