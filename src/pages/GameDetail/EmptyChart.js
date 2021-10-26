import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const EmptyChart = ({ palette, teams, players }) => {
  if (!players.length) return null;

  const renderLegend = () => {
    return (
      <ul
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        {teams.map((team, i) => (
          <li
            key={team.teamId}
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            <div
              style={{
                display: "inline-block",
                backgroundColor: palette[i],
                height: "20px",
                width: "20px",
                margin: "0 1rem",
              }}
            />
            {team.fullName}
          </li>
        ))}
      </ul>
    );
  };

  const formatQuarters = (val) => {
    if (!val) return "";
    return val <= 4 ? `Q${val}` : "";
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      <ResponsiveContainer>
        <BarChart data={players}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            domain={[1, 4]}
            interval={0}
            type="number"
            tickFormatter={formatQuarters}
            padding={{ right: 20 }}
          />
          <YAxis
            dataKey="temporaryDisplayName"
            type="category"
            width={180}
            interval={0}
          />
          <Legend verticalAlign="top" align="center" content={renderLegend} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmptyChart;
