import {
  Radar,
  RadarChart as RadarChartComponent,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const RadarChart = ({
  data,
  domain,
  dataKey = "subject",
  playerA,
  playerB,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChartComponent cx="50%" cy="50%" outerRadius="80%" data={data}>
        <Tooltip />
        <PolarGrid />
        <PolarAngleAxis
          dataKey={dataKey}
          // tick={{ fill: "red", fontSize: 16 }}
        />
        <PolarRadiusAxis domain={domain} />
        <Radar
          name={playerA.temporaryDisplayName}
          dataKey="playerA"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        {playerB && (
          <Radar
            name={playerB.temporaryDisplayName}
            dataKey="playerB"
            stroke="#663"
            fill="#663"
            fillOpacity={0.6}
          />
        )}
      </RadarChartComponent>
    </ResponsiveContainer>
  );
};

export default RadarChart;
