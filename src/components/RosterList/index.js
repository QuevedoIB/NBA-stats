import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import CollapseView from "components/common/CollapseView";
import Shimmer from "components/common/Shimmer";

import { getAge } from "helpers/getAge";

import styles from "./RosterList.module.css";
import CountryFlag from "components/common/images/CountryFlag";

const RosterList = ({ roster, isLoading }) => {
  const { t } = useTranslation();
  const sortedRoster = useMemo(
    () =>
      roster.sort((a, b) =>
        a.jersey === "" ? 1 : b.jersey === "" ? -1 : a.jersey - b.jersey
      ),
    [roster]
  );

  if (isLoading)
    return (
      <Shimmer>
        <div className={styles.loadingContainer} />
      </Shimmer>
    );

  return (
    <section className={styles.container}>
      <CollapseView summary={<h3 className="title">Roster</h3>}>
        <div className={styles.scrollContainer}>
          <table className={styles.rosterTable}>
            <tbody>
              {sortedRoster.map((player) => {
                return (
                  <tr key={player.personId}>
                    <th>
                      <Link to={`/player-detail/${player.personId}`}>
                        {player?.jersey !== "" && `${player.jersey} - `}
                        {player.temporaryDisplayName}
                      </Link>
                    </th>
                    <td>
                      <div>
                        <CountryFlag player={player} />
                      </div>
                    </td>
                    <td>
                      <div>
                        {player.dateOfBirthUTC &&
                          `${getAge(player.dateOfBirthUTC)} años`}
                      </div>
                    </td>
                    <td>
                      <div>{t(`basketballPositions.${player.pos}`)}</div>
                    </td>
                    <td>
                      <div>
                        {player.heightMeters && `${player.heightMeters}m`}
                      </div>
                    </td>
                    <td>
                      <div>
                        {player.weightKilograms &&
                          `${player.weightKilograms}kg`}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CollapseView>
    </section>
  );
};

export default RosterList;
