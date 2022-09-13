/** 이미지 url
 * @argument value - 사진 이름 ex) mf.png value = mf
 */
export const publicImage = (value: string) =>
  `https://${process.env.NEXT_PUBLIC_PUBLIC_IP}/images/${value}.png`;
