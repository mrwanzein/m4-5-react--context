import React from "react";

export default function usePersistedState(valueToStore, storedKeyName) {
    let storedVal = localStorage.getItem(storedKeyName);
    let valToReturn;

    if(storedVal) {
        if(Number(storedVal)) {
            valToReturn = Number(storedVal);
        } else {
            valToReturn = JSON.parse(storedVal)
        }
    } else {
        valToReturn = valueToStore;
    }

    return React.useState(valToReturn);
}