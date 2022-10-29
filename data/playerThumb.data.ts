import json from "@data/playerThumb.json";
import { PositionMainPart } from "@type/position.type";

export const selectPostionColor = (part?: string) => {
  const { positionColor: color } = json;

  switch (part) {
    case PositionMainPart.GK:
      return color[0];
    case PositionMainPart.MF:
      return color[1];
    case PositionMainPart.DF:
      return color[2];
    case PositionMainPart.FW:
      return color[3];
    default:
      return "gray";
  }
};

export const postionColor = (part?: string) => ({
  color: selectPostionColor(part),
  fontWeight: "bold",
});
