import { useMemo } from "react";

import CollapseView from "components/common/CollapseView";
import Shimmer from "components/common/Shimmer";

import { getAge } from "helpers/getAge";
import useCountryCodes from "hooks/useCountryCodes";

import styles from "./RosterList.module.css";

const RosterList = ({ roster, isLoading }) => {
  const { countries } = useCountryCodes();

  const rosterCountries = useMemo(() => {
    return roster.reduce((acc, player) => {
      if (!acc[player.country]) {
        acc[player.country] = countries?.find(
          (country) => country.Name === player.country
        ).Code;
      }
      return acc;
    }, {});
  }, [countries, roster]);

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
                      {player?.jersey !== "" && `${player.jersey} - `}
                      {player.temporaryDisplayName}
                    </th>
                    <td>
                      <div>
                        <img
                          src={`https://www.countryflags.io/${
                            rosterCountries[player.country]
                          }/flat/24.png`}
                          alt="country"
                          loading="lazy"
                          title={player.country}
                        />
                      </div>
                    </td>
                    <td>
                      <div>{getAge(player.dateOfBirthUTC)} años</div>
                    </td>
                    <td>
                      <div>{player.pos}</div>
                    </td>
                    <td>
                      <div>{player.heightMeters}m</div>
                    </td>
                    <td>
                      <div>{player.weightKilograms}kg</div>
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
