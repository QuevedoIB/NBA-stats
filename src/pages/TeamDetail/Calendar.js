import React from "react";

import CollapseView from "components/common/CollapseView";

import styles from "./TeamDetail.module.css";
import GameCard from "components/cards/GameCard";

const Calendar = ({ calendar }) => {
  console.log(calendar);
  return (
    <section>
      <CollapseView summary={<h3 className="title">Calendar</h3>}>
        <ul>
          {calendar?.map((game) => {
            return (
              <li key={game.gameId}>
                <GameCard game={game} />
              </li>
            );
          })}
        </ul>
      </CollapseView>
    </section>
  );
};

export default Calendar;

/*
"startTimeUTC": "2021-10-04T23:00:00.000Z",
  "vTeam": {
        "teamId": "1610612755",
        "score": ""
    },
    "hTeam": {
        "teamId": "1610612761",
        "score": ""
    }
*/

/*
{
    "seasonStageId": 1,
    "seasonId": "12021",
    "gameUrlCode": "20211004/PHITOR",
    "gameId": "0012100002",
    "statusNum": 1,
    "extendedStatusNum": 0,
    "startTimeEastern": "7:00 PM ET",
    "startTimeUTC": "2021-10-04T23:00:00.000Z",
    "startDateEastern": "20211004",
    "homeStartDate": "20211004",
    "homeStartTime": "1900",
    "visitorStartDate": "20211004",
    "visitorStartTime": "1900",
    "isHomeTeam": false,
    "isStartTimeTBD": false,
    "watch": {
        "broadcast": {
            "broadcasters": {
                "national": [],
                "canadian": [
                    {
                        "shortName": "SN1",
                        "longName": "SN1"
                    }
                ],
                "spanish_national": [],
                "vTeam": [],
                "hTeam": [
                    {
                        "shortName": "SN1",
                        "longName": "SN1"
                    }
                ]
            },
            "video": {
                "regionalBlackoutCodes": "torr",
                "canPurchase": false,
                "isLeaguePass": true,
                "isNationalBlackout": false,
                "isTNTOT": false,
                "isVR": false,
                "tntotIsOnAir": false,
                "isNextVR": false,
                "isNBAOnTNTVR": false,
                "isMagicLeap": false,
                "isOculusVenues": false,
                "streams": [
                    {
                        "streamType": "vTeam",
                        "isOnAir": false,
                        "doesArchiveExist": false,
                        "isArchiveAvailToWatch": false,
                        "streamId": "",
                        "duration": 0
                    },
                    {
                        "streamType": "hTeam",
                        "isOnAir": false,
                        "doesArchiveExist": false,
                        "isArchiveAvailToWatch": false,
                        "streamId": "",
                        "duration": 0
                    },
                    {
                        "streamType": "espanol_vTeam",
                        "isOnAir": false,
                        "doesArchiveExist": false,
                        "isArchiveAvailToWatch": false,
                        "streamId": "",
                        "duration": 0
                    },
                    {
                        "streamType": "espanol_hTeam",
                        "isOnAir": false,
                        "doesArchiveExist": false,
                        "isArchiveAvailToWatch": false,
                        "streamId": "",
                        "duration": 0
                    },
                    {
                        "streamType": "espanol_natl",
                        "isOnAir": false,
                        "doesArchiveExist": false,
                        "isArchiveAvailToWatch": false,
                        "streamId": "",
                        "duration": 0
                    },
                    {
                        "streamType": "mobile",
                        "isOnAir": false,
                        "doesArchiveExist": false,
                        "isArchiveAvailToWatch": false,
                        "streamId": "",
                        "duration": 0
                    },
                    {
                        "streamType": "condensed",
                        "isOnAir": false,
                        "doesArchiveExist": false,
                        "isArchiveAvailToWatch": false,
                        "streamId": "",
                        "duration": 0
                    },
                    {
                        "streamType": "alt",
                        "isOnAir": false,
                        "doesArchiveExist": false,
                        "isArchiveAvailToWatch": false,
                        "streamId": "",
                        "duration": 0
                    }
                ],
                "deepLink": []
            },
            "audio": {
                "national": {
                    "streams": [
                        {
                            "language": "English",
                            "isOnAir": false,
                            "streamId": ""
                        },
                        {
                            "language": "Spanish",
                            "isOnAir": false,
                            "streamId": ""
                        }
                    ],
                    "broadcasters": []
                },
                "vTeam": {
                    "streams": [
                        {
                            "language": "English",
                            "isOnAir": false,
                            "streamId": ""
                        },
                        {
                            "language": "Spanish",
                            "isOnAir": false,
                            "streamId": ""
                        }
                    ],
                    "broadcasters": [
                        {
                            "shortName": "97.5 The Fanatic",
                            "longName": "97.5 The Fanatic"
                        }
                    ]
                },
                "hTeam": {
                    "streams": [
                        {
                            "language": "English",
                            "isOnAir": false,
                            "streamId": ""
                        },
                        {
                            "language": "Spanish",
                            "isOnAir": false,
                            "streamId": ""
                        }
                    ],
                    "broadcasters": [
                        {
                            "shortName": "",
                            "longName": ""
                        }
                    ]
                }
            }
        }
    },
    "nugget": {
        "text": ""
    },
    "vTeam": {
        "teamId": "1610612755",
        "score": ""
    },
    "hTeam": {
        "teamId": "1610612761",
        "score": ""
    }
}
*/
