"use client";

import QueryClientProviderhook from "../hooks/useReactQuery";
import FareList from "../components/FareList";

export default function Home() {
  return (
    <>
      <div className="grid grid-flow-row auto-rows-max">
        <div className="text-xl">useMemo</div>
        <div>02</div>
        <div>03</div>
      </div>
    </>
  );
}
