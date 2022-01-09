import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { createQueryClient } from "src/core/queryClient";

let queryClient: QueryClient;

type CompType = (...args: any) => JSX.Element | null;

export function wrapComponentWithProviders<T extends CompType>(Comp: T) {
    return (props: React.ComponentProps<T>) => (
        <QueryClientProvider client={queryClient}>
            <Comp {...props} />
        </QueryClientProvider>
    )
}

export function initProviders() {
    queryClient = createQueryClient();
}