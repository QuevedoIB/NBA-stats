import { Link } from "react-router-dom";

import { teamProptypes } from "components/types";

import styles from "./TeamCard.module.css";

const TeamCard = ({ team: { fullName, teamId } }) => {
  return (
    <div className={styles.container}>
      <Link to={`/team-detail/${teamId}`}>
        <img
          className={styles.logo}
          loading="lazy"
          src={`https://cdn.nba.com/logos/nba/${teamId}/global/L/logo.svg`}
          alt={`${fullName} logo`}
        />
        <div>
          <p>{fullName}</p>
        </div>
      </Link>
    </div>
  );
};

TeamCard.propTypes = {
  team: teamProptypes.isRequired,
};

export default TeamCard;
