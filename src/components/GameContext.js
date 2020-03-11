import React from 'react';
import usePersistedState from '../hooks/use-persisted-state.hook'
export const GameContext = React.createContext(null);

const items = [
    { id: 'cursor', name: 'Cursor', cost: 10, value: 1 },
    { id: 'grandma', name: 'Grandma', cost: 100, value: 10 },
    { id: 'farm', name: 'Farm', cost: 1000, value: 80 }
];

export const GameProvider = ({ children }) => {
    const [numCookies, setNumCookies] = usePersistedState('num-Cookies', 1000 );
    const [purchasedItems, setPurchasedItems] = usePersistedState('purchased-items',{
        cursor: 0,
        grandma: 0,
        farm: 0
    });
    const calculateCookiesPerSecond = purchasedItems => {
        return Object.keys(purchasedItems).reduce((acc, itemId) => {
            const numOwned = purchasedItems[itemId];
            console.log(purchasedItems, 'purItem')
            console.log(numOwned, 'numOwned')
            console.log(items)
            const item = items.find(item => item.id === itemId);
            const value = item.value;
    
          return acc + value * numOwned;
        }, 0);
    };

    return <GameContext.Provider 
    value={{
        numCookies,
        setNumCookies,
        purchasedItems,
        setPurchasedItems,
        cookiesPerSecond: calculateCookiesPerSecond(purchasedItems)
    }}>
        {children}
    </GameContext.Provider>
}