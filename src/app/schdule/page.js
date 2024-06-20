"use client";

import QueryClientProviderhook from "../../hooks/useReactQuery";
import FareList from "../../components/FareList";

export default function Schdule() {
    return (<QueryClientProviderhook>
        <FareList />
    </QueryClientProviderhook>)
} 