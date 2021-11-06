import { Cell } from "recharts";

import { COLORS } from "constants.js";

const SCATTER_STROKE = 8;

//Recharts validates against components types to render, can't create custom components only render recharts components directly from functions
const renderDot = ({ entry, index, tooltip, ...rest }) => {
  const hoveredStatus = index === tooltip?.index;
  const dotColor = entry.positive ? COLORS.POSITIVE : COLORS.NEGATIVE;
  return (
    <Cell
      {...rest}
      key={`dot-${index}`}
      fill={dotColor}
      stroke={hoveredStatus ? dotColor : ""}
      strokeWidth={SCATTER_STROKE}
    />
  );
};

export default renderDot;
