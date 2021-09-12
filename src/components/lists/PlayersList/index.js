import React, { useRef, useState, useEffect, useCallback } from 'react';
import Proptypes from 'prop-types';

import PlayerCard from 'components/cards/PlayerCard';

import { useObserver } from 'hooks/useObserver';

import { playerProptypes } from 'components/types';

const PlayersList = ({ list, amountRendered = 6 }) => {
    const [itemsDisplayed, setItemsDisplayed] = useState(amountRendered);
    const observerItem = useRef();

    const updateItemsDisplayed = useCallback(() => {
        if (list.length > itemsDisplayed) {
            const increasedAmount =
                itemsDisplayed + amountRendered > list.length
                    ? list.length - itemsDisplayed
                    : amountRendered;
            setItemsDisplayed(currentCount => currentCount + increasedAmount);
        }
    }, [amountRendered, itemsDisplayed, list.length]);

    useObserver({
        ref: observerItem,
        keepObserving: true,
        intersectingCallback: updateItemsDisplayed,
        options: { rootMargin: '20px' },
    });

    useEffect(() => {
        setItemsDisplayed(amountRendered);
    }, [amountRendered, list]);

    return (
        <ul className="players-list-container">
            {list.slice(0, itemsDisplayed).map(player => (
                <PlayerCard key={player.personId} player={player} />
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
