import axios from "axios";

const url = `http://43.200.109.133:8080`;

/**get 요청
 * @argument path: string ('player/')
 * @argument params: object ({ spid: 2581004010 })
 */
export const getMethod = async (path: string, params?: object) => {
  const data = await axios.get(`${url}/${path}`, {
    params: { ...params },
  });

  return data.data;
};

export const postMethod = async (path: string, body: object): Promise<any> => {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  };
  const data = await axios.post(`${url}/${path}`, body, axiosConfig);
  return data;
};
