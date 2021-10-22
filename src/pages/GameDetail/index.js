import { useParams } from "react-router";

const GameDetail = () => {
  const { gameId } = useParams();
  console.log(gameId);

  return <div>GAME DETAIL VIEW</div>;
};

export default GameDetail;
