import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { createQueryClient } from "src/core/queryClient";
import { ChildCounterProvider, ContextListener } from "src/counter/contextListener";
import { CounterProvider } from "src/counter/counterContext";

let queryClient: QueryClient;

type CompType = (...args: any) => JSX.Element | null;

export function wrapComponentWithProviders<T extends CompType>(Comp: T) {
    return (props: React.ComponentProps<T>) => (
        <QueryClientProvider client={queryClient}>
            <ChildCounterProvider>
                <Comp {...props} />
            </ChildCounterProvider>
        </QueryClientProvider>
    )
}

export function initProviders(parentNode: HTMLElement | null) {
    if (!parentNode) {
        throw new Error("there is no root for us..");
    }
    queryClient = createQueryClient();

    const App = () => {
        return (
            <QueryClientProvider client={queryClient}>
                <CounterProvider>
                    <ContextListener />
                </CounterProvider>
            </QueryClientProvider>
        )
    }

    ReactDOM.render(<App />, parentNode);
}