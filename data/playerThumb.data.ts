import json from "@data/playerThumb.json";
import { PositionPart } from "@type/playerThumb.type";

const selectPostionColor = (part?: string) => {
  const { positionColor: color } = json;

  switch (part) {
    case PositionPart.GK:
      return color[0];
    case PositionPart.MF:
      return color[1];
    case PositionPart.DF:
      return color[2];
    case PositionPart.FW:
      return color[3];
    case PositionPart.SUB:
      return color[4];
    default:
      return "gray";
  }
};

export const postionColor = (part?: string) => ({
  color: selectPostionColor(part),
  fontWeight: "bold",
});
