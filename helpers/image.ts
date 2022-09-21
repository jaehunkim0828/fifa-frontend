/** 이미지 url
 * @argument value - 사진 이름 ex) mf.png value = mf
 */
export const publicImage = (value: string) =>
  `${process.env.NEXT_PUBLIC_FRONT_URL}/images/${value.toLowerCase()}.png`;
