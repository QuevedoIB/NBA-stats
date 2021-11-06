import { useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import SearchBar from "components/common/SearchBar";
import PlayersList from "components/lists/PlayersList";
import Button from "components/common/Button";
import Modal from "components/common/Modal";
import Select from "components/common/Select";

import useSearchPlayer from "hooks/useSearchPlayer";
import useTeams from "hooks/useTeams";
import useToggle from "hooks/useToggle";

import styles from "./Players.module.css";

const Players = () => {
  const [t] = useTranslation();
  const { teams } = useTeams();
  const { toggled, handleToggle } = useToggle();
  const {
    isLoading,
    players,
    searchValue,
    suggestions,
    handleSearchChange,
    handleSelectSuggestion,
    searchKey,
  } = useSearchPlayer();

  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

  const filteredPlayers = useMemo(() => {
    return players?.filter(
      (player) =>
        (!selectedPosition || player.pos === selectedPosition) &&
        (!selectedTeam || player.teamId === selectedTeam)
    );
  }, [players, selectedPosition, selectedTeam]);

  const teamOptions = [
    {
      name: t("common.team"),
      value: "",
    },
    ...teams.map((team) => ({
      name: team.fullName,
      value: team.teamId,
    })),
  ];

  const positions = t("basketballPositions", { returnObjects: true });

  const positionOptions = [
    {
      name: t("common.position"),
      value: "",
    },
    ...Object.entries(positions).map(([value, name]) => ({ name, value })),
  ];

  const handlePositionChange = useCallback(({ target: { value } }) => {
    setSelectedPosition(value);
  }, []);

  const handleTeamChange = useCallback(({ target: { value } }) => {
    setSelectedTeam(value);
  }, []);

  const resetFilters = useCallback(() => {
    setSelectedTeam("");
    setSelectedPosition("");
  }, []);

  return (
    <section>
      <div data-testid="player-filters" className={styles.listFilters}>
        <SearchBar
          keyword={searchKey}
          onSearchChange={handleSearchChange}
          onSuggestionClick={handleSelectSuggestion}
          searchValue={searchValue}
          suggestions={suggestions}
        />
        <Button onClick={handleToggle}>{t("filters.title")}</Button>
        <Button onClick={resetFilters}>{t("filters.clear")}</Button>
      </div>
      <PlayersList list={filteredPlayers} isLoading={isLoading} />
      <Modal
        content={{
          title: t("filters.title"),
        }}
        visible={toggled}
        onCancelClick={handleToggle}
        onActionClick={handleToggle}
      >
        <div className={styles.listModalFilters}>
          <Select
            options={teamOptions}
            value={selectedTeam}
            onChange={handleTeamChange}
          />
          <Select
            options={positionOptions}
            value={selectedPosition}
            onChange={handlePositionChange}
          />
        </div>
      </Modal>
    </section>
  );
};

export default Players;
