import { useTranslation } from "react-i18next";
import Proptypes from "prop-types";

import TeamCard from "components/cards/TeamCard";

import { teamProptypes } from "components/types";

const TeamList = ({ list, division }) => {
  const [t] = useTranslation();
  return (
    <article>
      <h3>{t(`divisions.${division.toLowerCase()}`)}</h3>
      <ul>
        {list.map((team) => (
          <TeamCard key={team.teamId} team={team} />
        ))}
      </ul>
    </article>
  );
};

TeamList.propTypes = {
  division: Proptypes.string.isRequired,
  list: Proptypes.arrayOf(teamProptypes).isRequired,
};

export default TeamList;
