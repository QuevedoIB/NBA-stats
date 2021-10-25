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
    const quarter = val + 1;
    return quarter <= 4 ? quarter : "";
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

    // <BarChart
    //   //   width={window.innerWidth * 0.8}
    //   //   height={window.innerHeight * 0.8}
    //   data={players}
    // >
    //   <CartesianGrid strokeDasharray="3 3" />
    //   <XAxis
    //     domain={[1, 4]}
    //     interval={0}
    //     type="number"
    //     tickFormatter={formatQuarters}
    //   />
    //   <YAxis dataKey="temporaryDisplayName" type="category" width={180} />
    //   <Legend verticalAlign="top" align="center" content={renderLegend} />
    // </BarChart>
  );
};

export default EmptyChart;
