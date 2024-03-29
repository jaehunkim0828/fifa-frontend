import axios from "axios";

export const backUrl = process.env.NEXT_PUBLIC_BACK_URL;
export const frontUrl = process.env.NEXT_PUBLIC_FRONT_URL;

/**get 요청
 * @argument path: string ('player/')
 * @argument params: object ({ spid: 2581004010 })
 */
export const getMethod = async (path: string, params?: object) => {
  const data = await axios.get(`${backUrl}/${path}`, {
    params: { ...params },
  });

  return data.data;
};

/** post 메소드
 * @argument path: '/'
 * @argument body: { spid: '00000000' }
 */
export const postMethod = async (path: string, body: object): Promise<any> => {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  };
  const data = await axios.post(`${backUrl}/${path}`, body, axiosConfig);
  return data;
};
