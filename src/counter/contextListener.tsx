import { useMemo, useContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import { CounterContext } from "./counterContext";

export function ContextListener() {
    const value = useContext(CounterContext);
    const client = useQueryClient();

    useMemo(() => {
        client.setQueryData(["__ng_contexts", "counter"], value);
    }, [value]);

    return null
}

export function ChildCounterProvider({children}: React.PropsWithChildren<{}>) {
    const { data } = useQuery(["__ng_contexts", "counter"], () => {}, {notifyOnChangeProps: ["data"]});

    return (
        //@ts-ignore
        <CounterContext.Provider value={data}>
            {children}
        </CounterContext.Provider>
    )
}