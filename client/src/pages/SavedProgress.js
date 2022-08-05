import React from 'react';
import { useState, useEffect } from "react";
import '../index.css'

const string1 = "abcdefg";
const string2 = "adcelig123";
const strar1 = string1.split("");
const strar2 = string2.split("");

export const SavedProgress = () => {
  const [isHighlightActive, setIsHighlightActive] = useState(false);
  const [wrongCharIndexes] = useState(new Set());

  // re-calculate the differences between strings whenever they change
  useEffect(() => {
    findDiff(string1, string2);
  }, [string1, string2]);

  const findDiff = (string1, string2) => {
    // we will use this to keep an eye on the two strings
    let index = 0;

    while (index < string1.length || index < string2.length) {
      const left_char = string1[index];
      const right_char = string2[index];
      if (left_char === right_char) {
        wrongCharIndexes.add(index);
      }
      index++;
    }

    return;
  };

  return (
    <div className="App">
      {isHighlightActive ? (
        // map through the two strings and render the highlighted character or regular character
        <>
          <p className="flex">
            {strar1.map((char, index) => {
              return wrongCharIndexes.has(index) ? (
                <span className="highlighted">{char}</span>
              ) : (
                <>{char}</>
              );
            })}
          </p>
          <p className="flex">
            {strar2.map((char, index) => {
              return wrongCharIndexes.has(index) ? (
                <span className="highlighted">{char}</span>
              ) : (
                <>{char}</>
              );
            })}
          </p>
        </>
      ) : (
        <div>
          <p>{string1}</p>
          <p>{string2}</p>
        </div>
      )}
      <button onClick={() => setIsHighlightActive((prev) => !prev)}>
        Click me
      </button>
    </div>
  );
};


export default SavedProgress;