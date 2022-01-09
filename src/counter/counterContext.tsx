import React, { useContext, useState } from "react";

export type CounterContextType = {
    count: number
    increment: () => void
}

export const CounterContext = React.createContext<CounterContextType>({
    count: 1,
    increment: () => {}
});

export function CounterProvider({children}: React.PropsWithChildren<{}>) {
    const [count, setCount] = useState(1);

    const increment = () => setCount(count + 1);

    const value = {
        count,
        increment
    }

    return (
        <CounterContext.Provider value={value}>
            {children}
        </CounterContext.Provider>
    )
}

export const useCounterContext = () => {
    return useContext(CounterContext);
}