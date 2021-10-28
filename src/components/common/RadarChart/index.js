import {
  Radar,
  RadarChart as RadarChartComponent,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import PropTypes from "prop-types";

import { playerProptypes } from "components/types";

const RadarChart = ({ data, domain, labelKey, players, palette }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChartComponent cx="50%" cy="50%" outerRadius="80%" data={data}>
        <Tooltip />
        <Legend />
        <PolarGrid />
        <PolarAngleAxis dataKey={labelKey} />
        <PolarRadiusAxis domain={domain} />
        {players.map((player, i) => (
          <Radar
            key={player.personId}
            name={player.temporaryDisplayName}
            dataKey={player.personId}
            stroke={palette[i]}
            fill={palette[i]}
            fillOpacity={0.6}
          />
        ))}
      </RadarChartComponent>
    </ResponsiveContainer>
  );
};

RadarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  domain: PropTypes.arrayOf(PropTypes.number).isRequired,
  labelKey: PropTypes.string.isRequired,
  players: PropTypes.arrayOf(playerProptypes),
  palette: PropTypes.arrayOf(PropTypes.string),
};

export default RadarChart;
