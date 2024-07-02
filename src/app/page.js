"use client";

import QueryClientProviderhook from "../hooks/useReactQuery";
import FareList from "../components/FareList";
import {
  useCallback,
  useMemo,
  useState,
  useDeferredValue,
  Suspense,
  useId,
} from "react";
import { createContext, useContext } from "react";

const hardCalculate = (number) => {
  console.log("어려운 계산!");
  for (let i = 0; i < 99999; i++) {} // 생각하는 시간
  return number + 10000;
};

const easyCalculate = (number) => {
  console.log("쉬운 계산!");
  return number + 1;
};

const ThemeContext = createContext(null);

export default function Home() {
  const [hardNumber, setHardNumber] = useState(1);
  const [easyNumber, setEasyNumber] = useState(1);

  /*
    const hardSum = useMemo(() => {
      return hardCalculate(hardNumber);
    }, [hardNumber]);
  */
  const hardSum = hardCalculate(hardNumber);
  const easySum = easyCalculate(easyNumber);

  const handleChangeText = useCallback(
    (e) => {
      setHardNumber(parseInt(e.target.value));
    },
    [hardNumber]
  );

  const [theme, setTheme] = useState("white");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  const passwordHintId = useId();

  return (
    <ThemeContext.Provider value={theme}>
      <div className={`grid grid-flow-row auto-rows-max bg-${theme}`}>
        <div className="text-2xl mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2>[useMemo]</h2>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            어려운 계산기
          </label>

          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={hardNumber}
            onChange={handleChangeText}
          />
          <span> + 10000 = {hardSum}</span>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            쉬운 계산기
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={easyNumber}
            onChange={(e) => setEasyNumber(parseInt(e.target.value))}
          />

          <span> + 1 = {easySum}</span>
        </div>
        <div className="text-2xl mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2>[useCallback]</h2>
          <h2></h2>
        </div>
        <div className="text-2xl mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2>[useContext]</h2>
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-6"
            onClick={(e) => setTheme(theme === "black" ? "white" : "black")}
          >
            {ThemeContext}
          </button>
        </div>

        <div
          className="text-2xl mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          style={{
            opacity: isStale ? 0.5 : 1,
            transition: isStale
              ? "opacity 0.2s 0.2s linear"
              : "opacity 0s 0s linear",
          }}
        >
          <h2>[useDeferredValue]</h2>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Search albums:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <Suspense fallback={<div>Loading...</div>}>
              <SearchResults query={deferredQuery} />
            </Suspense>
          </div>
        </div>

        <div className="text-2xl mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2>[useId]{passwordHintId}</h2>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            aria-describedby={passwordHintId}
          />
          <p id={passwordHintId}></p>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

function SearchResults({ query }) {
  for (let i = 0; i < 2500; i++) {
    console.log(i);
  }
  return query;
}
