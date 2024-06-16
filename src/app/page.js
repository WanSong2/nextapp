"use client";

import QueryClientProviderhook from "../hooks/useReactQuery";
import FareList from "../components/FareList";

export default function Home() {
  return (
    <QueryClientProviderhook>
      <FareList />
    </QueryClientProviderhook>
  );
}
