import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";

import PlayerCard from "components/cards/PlayerCard";
import Shimmer from "components/common/Shimmer";

import useObserver from "hooks/useObserver";

import { playerProptypes } from "components/types";

import styles from "./PlayersList.module.css";

const PlayersList = ({ list, amountRendered = 12, isLoading }) => {
  const [itemsDisplayed, setItemsDisplayed] = useState(amountRendered);
  const observerItem = useRef();

  const updateItemsDisplayed = useCallback(() => {
    if (list.length > itemsDisplayed) {
      const increasedAmount =
        itemsDisplayed + amountRendered > list.length
          ? list.length - itemsDisplayed
          : amountRendered;
      setItemsDisplayed((currentCount) => currentCount + increasedAmount);
    }
  }, [amountRendered, itemsDisplayed, list.length]);

  useObserver({
    ref: observerItem,
    keepObserving: true,
    intersectingCallback: updateItemsDisplayed,
    options: { rootMargin: "20px" },
  });

  useEffect(() => {
    setItemsDisplayed(amountRendered);
  }, [amountRendered, list]);

  return (
    <ul className={styles.container}>
      {isLoading
        ? new Array(amountRendered).fill().map((_, i) => (
            <li key={i} className={styles.playerShimmer}>
              <Shimmer />
            </li>
          ))
        : list.slice(0, itemsDisplayed).map((player) => (
            <Link
              key={player.personId}
              to={`/player-detail/${player.personId}`}
            >
              <PlayerCard player={player} />
            </Link>
          ))}
      <li ref={observerItem} id="list-observer" />
    </ul>
  );
};

PlayersList.propTypes = {
  list: Proptypes.arrayOf(playerProptypes).isRequired,
  amountRendered: Proptypes.number,
};

export default PlayersList;
