export const publicImage = (value: string) =>
  `http://${process.env.NEXT_PUBLIC_PUBLIC_IP}:3000/images/${value}.png`;
