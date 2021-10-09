import React, { Fragment } from "react";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// import Spinner from "components/common/Spinner";
import Shimmer from "components/common/Shimmer";

import NbaService from "services/NbaService";

import { HOUR_MILLISECONDS } from "constants.js";

import useErrorHandler from "hooks/useErrorHandler";

import styles from "./StandingsTable.module.css";
import CollapseView from "components/common/CollapseView";

const standingHeaders = [
  "win",
  "loss",
  "winPctV2",
  "homeWin",
  "homeLoss",
  "awayWin",
  "awayLoss",
];

const StandingsTable = () => {
  const [t] = useTranslation();
  const { isLoading, error, data } = useQuery(
    "fetch-standings",
    async () => {
      const response = await NbaService.fetchStandings();
      return response;
    },
    {
      staleTime: HOUR_MILLISECONDS,
    }
  );
  useErrorHandler(error?.message);

  if (isLoading)
    return (
      <Shimmer>
        <section className={styles.container}></section>
      </Shimmer>
    );

  return (
    <section className={styles.container}>
      <CollapseView
        summary={
          <h3 className="title">{`${t("standings.title")} ${
            data?.seasonYear
          }`}</h3>
        }
      >
        <div className={styles.contentContainer}>
          <table>
            <thead>
              <tr>
                <th colSpan={2} />
                {standingHeaders.map((key) => (
                  <th key={key}>{t(`standings.${key}`)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(data?.conference || {}).map(
                ([conference, teams]) => {
                  return (
                    <Fragment key={conference}>
                      <tr>
                        <th
                          className={`${styles.conference} ${
                            styles[`conference-${conference}`]
                          }`}
                          rowSpan={teams.length + 1}
                        >
                          <p>{t(`conferences.${conference}`)}</p>
                        </th>
                      </tr>
                      {teams.map((team) => (
                        <tr key={team.teamId}>
                          <th>
                            <Link
                              to={`/team-detail/${team.teamId}`}
                            >{`${team.teamSitesOnly.teamName} ${team.teamSitesOnly.teamNickname}`}</Link>
                          </th>
                          {standingHeaders.map((key) => (
                            <td key={key}>
                              <div className="centered-container">
                                {team[key]?.replace(".", ",")}
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </Fragment>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </CollapseView>
    </section>
  );
};

export default StandingsTable;
