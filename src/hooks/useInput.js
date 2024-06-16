import { useState } from "react";

export default function useInput(initialState) {
    const [param, setParam] = useState(initialState);
}