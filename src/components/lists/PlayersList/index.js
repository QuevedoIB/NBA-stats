import React, { useRef, useState, useEffect, useCallback } from 'react';

import PlayerCard from 'components/cards/PlayerCard';

import { useObserver } from 'hooks/useObserver';

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

export default PlayersList;
