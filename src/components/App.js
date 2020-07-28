import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import useInterval from "../hooks/use-interval.hook";
import usePersistedState from "../hooks/usePersistedState.hook";
import items from "../data";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";

export const CookieCountContext = React.createContext(null);

const calculateCookiesPerSecond = (purchasedItems) => {
  return Object.keys(purchasedItems).reduce((acc, itemId) => {
    const numOwned = purchasedItems[itemId];
    const item = items.find((item) => item.id === itemId);
    const value = item.value;

    return acc + value * numOwned;
  }, 0);
};

function App(props) {
  const [numCookies, setNumCookies] = usePersistedState(1000, 'numCookies');
  const [purchasedItems, setPurchasedItems] = usePersistedState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  }, 'purchasedItems');

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerSecond(purchasedItems);

    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  React.useEffect(() => {
      localStorage.setItem('numCookies', numCookies);
  }, [numCookies]);
  
  React.useEffect(() => {
      localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems));
  }, [purchasedItems]);
  
  return (
    <CookieCountContext.Provider value={{numCookies, setNumCookies, purchasedItems, setPurchasedItems, calculateCookiesPerSecond}}>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Router>
    </CookieCountContext.Provider>
  );
}

export default App;
