import React, { useState, useCallback, useEffect } from "react";
import SearchBar from "components/common/SearchBar";
import PlayersList from "components/lists/PlayersList";
import Button from "components/common/Button";
import Modal from "components/common/Modal";
import Select from "components/common/Select";

import useSearchPlayer from "hooks/useSearchPlayer";
import useTeams from "hooks/useTeams";

import styles from "./Players.module.css";

const Players = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [currentPlayers, setCurrentPlayers] = useState([]);

  const {
    isLoading,
    players,
    searchValue,
    suggestions,
    handleSearchChange,
    handleSelectSuggestion,
    searchKey,
  } = useSearchPlayer();

  const { teams } = useTeams();

  useEffect(() => {
    if (!isLoading && players) {
      setCurrentPlayers(players);
    }
  }, [players, isLoading]);

  const teamOptions = [
    {
      name: "Filter by teams",
      value: "",
    },
    ...teams.map((team) => ({
      name: team.fullName,
      value: team.teamId,
    })),
  ];

  const positionOptions = [
    {
      name: "Filter by positions",
      value: "",
    },
    {
      name: "Point guard / Shooting guard",
      value: "G",
    },
    {
      name: "Forward",
      value: "F",
    },
    { name: "Power forward", value: "F-C" },
    {
      name: "Shooting guard / Forward",
      value: "G-F",
    },
    {
      name: "Forward / shooting guard",
      value: "F-G",
    },
    {
      name: "Power forward",
      value: "C-F",
    },
    {
      name: "Center",
      value: "C",
    },
  ];

  const handlePositionChange = useCallback(({ target: { value } }) => {
    setSelectedPosition(value);
  }, []);

  const handleTeamChange = useCallback(({ target: { value } }) => {
    setSelectedTeam(value);
  }, []);

  const resetFilter = () => {
    setSelectedTeam("");
    setSelectedPosition("");
  };

  const handleFilters = () => {
    if (!selectedPosition && !selectedTeam) {
      setCurrentPlayers(players);
      resetFilter();
      setShowModal(false);
      return;
    }

    let tempPlayers = [...players];

    if (selectedPosition) {
      tempPlayers = tempPlayers.filter(
        (player) => player.pos === selectedPosition
      );
    }

    if (selectedTeam) {
      tempPlayers = tempPlayers.filter(
        (player) => player.teamId === selectedTeam
      );
    }

    if (selectedPosition && selectedTeam) {
      tempPlayers = tempPlayers.filter(
        (player) =>
          player.teamId === selectedTeam && player.pos === selectedPosition
      );
    }

    setCurrentPlayers(tempPlayers);
    resetFilter();
    setShowModal(false);
  };

  const closeModal = () => {
    resetFilter();
    setShowModal(false);
  };

  return (
    <section>
      <div className={styles.listFilters}>
        <SearchBar
          keyword={searchKey}
          onSearchChange={handleSearchChange}
          onSuggestionClick={handleSelectSuggestion}
          searchValue={searchValue}
          suggestions={suggestions}
        />
        <Button onClick={() => setShowModal(true)}>Show Filter</Button>
        <Button onClick={() => setCurrentPlayers(players)}>Clear Filter</Button>
      </div>
      <PlayersList list={currentPlayers} isLoading={isLoading} />
      <Modal
        content={{
          title: "Filter",
          message: "Select filters you want to use",
        }}
        visible={showModal}
        onCancelClick={closeModal}
        onActionClick={handleFilters}
      >
        <div className={styles.listModalFilters}>
          <Select
            id="teams"
            options={teamOptions}
            value={selectedTeam}
            onChange={handleTeamChange}
          />
          <Select
            id="positions"
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

// IMAGES https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/{PLAYERID}.png
