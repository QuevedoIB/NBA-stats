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

const RadarChart = ({ data, domain, labelKey, players, palette }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChartComponent cx="50%" cy="50%" outerRadius="80%" data={data}>
        <Tooltip />
        <Legend />
        <PolarGrid />
        <PolarAngleAxis
          dataKey={labelKey}
          // tick={{ fill: "red", fontSize: 16 }}
        />
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

export default RadarChart;
