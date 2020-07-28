import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import useInterval from "../hooks/use-interval.hook";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";

import { GameContext } from './GameContext';

function App(props) {

  const {numCookies, setNumCookies, purchasedItems, calculateCookiesPerSecond} = React.useContext(GameContext);

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
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Router>
    </>
  );
}

export default App;
