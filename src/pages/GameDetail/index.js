import { useParams } from "react-router";

const GameDetail = () => {
  const { gameId, date } = useParams();
  console.log(gameId, date);

  ///v1/${date}/${gameId}_boxscore.json

  return <div>GAME DETAIL VIEW</div>;
};

export default GameDetail;
