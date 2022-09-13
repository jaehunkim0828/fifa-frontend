/** 이미지 url
 * @argument value - 사진 이름 ex) mf.png value = mf
 */
export const publicImage = (value: string) =>
  `http://${
    process.env.NEXT_PUBLIC_FRONT_DOMAIN
  }/images/${value.toLowerCase()}.png`;
