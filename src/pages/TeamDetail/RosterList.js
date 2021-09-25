import React, { useMemo } from "react";

import { getAge } from "helpers/getAge";
import useCountryCodes from "hooks/useCountryCodes";

const RosterList = ({ roster }) => {
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

  return (
    <table>
      <thead></thead>
      <tbody>
        {sortedRoster.map((player) => {
          return (
            <tr key={player.personId}>
              <th>
                {player?.jersey !== "" && `${player.jersey} - `}
                {player.temporaryDisplayName}
              </th>
              <td>
                <div style={{ display: "flex" }}>
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
                <div>{getAge(player.dateOfBirthUTC)}</div>
              </td>
              <td>
                <div>{player.pos}</div>
              </td>
              <td>
                <div>{player.heightMeters}</div>
              </td>
              <td>
                <div>{player.weightKilograms}</div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default RosterList;

/*

country
pos ///////// teamSitesOnly.posFull
jersey
heightMeters
weightKilograms
dateOfBirthUTC


{
    "firstName": "Juhann",
    "lastName": "Begarin",
    "temporaryDisplayName": "Juhann Begarin",
    "personId": "1630584",
    "teamId": "1610612738",
    "jersey": "",
    "isActive": true,
    "pos": "G",
    "heightFeet": "6",
    "heightInches": "5",
    "heightMeters": "1.96",
    "weightPounds": "185",
    "weightKilograms": "83.9",
    "dateOfBirthUTC": "2002-08-07",
    "teamSitesOnly": {
        "playerCode": "juhann_begarin",
        "posFull": "Guard",
        "displayAffiliation": "Guadeloupe",
        "freeAgentCode": ""
    },
    "teams": [
        {
            "teamId": "1610612738",
            "seasonStart": "2021",
            "seasonEnd": "2021"
        }
    ],
    "draft": {
        "teamId": "1610612738",
        "pickNum": "45",
        "roundNum": "2",
        "seasonYear": "2021"
    },
    "nbaDebutYear": "",
    "yearsPro": "0",
    "collegeName": "Paris Basketball",
    "lastAffiliation": "Paris Basketball/France",
    "country": "France"
}
*/