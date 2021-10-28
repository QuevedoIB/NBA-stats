import {
  BarChart as ChartComponent,
  Bar,
  Brush,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import PropTypes from "prop-types";

import { playerProptypes } from "components/types";

const BarChart = ({ data, domain, labelKey, players, palette }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ChartComponent
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={labelKey}
          tick={{
            angle: -45,
            textAnchor: "end",
            dominantBaseline: "ideographic",
          }}
          interval={0}
          height={150}
        />
        <YAxis domain={domain} />
        <Tooltip />
        <Legend />
        <Brush dataKey={labelKey} height={30} stroke={palette[0]} />
        {players.map((player, i) => (
          <Bar
            key={player.personId}
            dataKey={player.personId}
            name={player.temporaryDisplayName}
            fill={palette[i]}
          />
        ))}
      </ChartComponent>
    </ResponsiveContainer>
  );
};

BarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  domain: PropTypes.arrayOf(PropTypes.number).isRequired,
  labelKey: PropTypes.string.isRequired,
  players: PropTypes.arrayOf(playerProptypes),
  palette: PropTypes.arrayOf(PropTypes.string),
};

export default BarChart;
