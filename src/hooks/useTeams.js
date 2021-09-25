import { useMemo } from "react";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";

import { setTeams } from "redux/reducers/teams";
import useErrorHandler from "hooks/useErrorHandler";
import NbaService from "services/NbaService";
import { filterItems } from "helpers/filterItems";

import { HOUR_MILLISECONDS } from "constants.js";

export default function useTeams({ filter = { key: "", value: "" } } = {}) {
  const teams = useSelector((state) => state.teams.teams);
  const dispatch = useDispatch();
  const { isLoading, error } = useQuery(
    "fetch-teams",
    async () => {
      const response = await NbaService.fetchTeams();
      dispatch(setTeams(response || []));
      return response;
    },
    {
      staleTime: HOUR_MILLISECONDS,
    }
  );
  useErrorHandler(error?.message);

  const filteredTeams = useMemo(
    () => filterItems({ filter, values: teams }),
    [filter, teams]
  );

  return { isLoading, error, teams, filteredTeams };
}
