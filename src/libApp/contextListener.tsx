import React, { useMemo, useContext, Context } from "react";
import { useQuery, useQueryClient } from "react-query";

const PATH_PREFIX = ["__ng_contexts"];
type ContextProps<T> = {context: Context<T>, path: string[]};

export function ContextListener<T>({context, path}: ContextProps<T> ) {
    const value = useContext(context);
    const client = useQueryClient();

    const fullPath = PATH_PREFIX.concat(path);
    useMemo(() => {
        client.setQueryData(fullPath, value);
    }, [value]);

    return null
}

export function ChildCounterProvider<T>({children, path, context}: React.PropsWithChildren<ContextProps<T>>) {
    const fullPath = PATH_PREFIX.concat(path);
    const { data } = useQuery(fullPath, () => {}, {notifyOnChangeProps: ["data"]});

    return (
        //@ts-ignore
        <context.Provider value={data}>
            {children}
        </context.Provider>
    )
}