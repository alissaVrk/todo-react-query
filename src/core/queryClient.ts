import { values } from "lodash";
import { hashQueryKey, QueryClient, QueryKey, QueryObserver, UseQueryOptions, QueryOptions } from "react-query";

let queryClient: QueryClient;

const queryObservers: {[key: string]: {[key: string]: {observer: QueryObserver<any>, unsubscribe: () => void}}} = {};

export function createQueryClient() {
  queryClient = new QueryClient({
    defaultOptions: {queries: {staleTime: Infinity}},
  });

  queryClient.getQueryCache().subscribe((event) => {
    if (!event) {
      console.log("WTF..?");
      return;
    }
    const observers = queryObservers[event.query.queryHash];
    if (event.type !== "queryRemoved" || event.query.isActive() || !observers) {
      return;
    }
    values(observers).forEach(observerInfo => {
      observerInfo.unsubscribe();
      observerInfo.observer.destroy();
    });
    delete queryObservers[event.query.queryHash];
  })

  return queryClient
}

export function getQueryClient() {
  return queryClient;
}

type InPromise<T> = T extends Promise<infer K> ? K : never;
type ReturnInPromise<T extends (...args: any) => any> = InPromise<ReturnType<T>> 

export function getQueryData<T>(queryOptions: QueryOptions<T>) {
  if (!queryOptions.queryFn || !queryOptions.queryKey) {
    throw new Error("you need query stuff");
  }
  const client = getQueryClient();
  return client.getQueryData<ReturnInPromise<typeof queryOptions.queryFn>>(queryOptions.queryKey);
}

export function registerQueryDependency<T>(from: UseQueryOptions<T>, to: QueryKey) {
  if (!from.queryKey) {
    throw new Error();
  }
  queryObservers[hashQueryKey(to)] = queryObservers[hashQueryKey(to)] || {};
  const toEntry = queryObservers[hashQueryKey(to)];

  const observer = toEntry[hashQueryKey(from.queryKey)];
  if (!observer) {
    const newObserver = new QueryObserver<T>(queryClient, from);
    const unsubscribe = newObserver.subscribe(() => {
      console.log("INVALIDATE");
      queryClient.invalidateQueries(to);
    });
    toEntry[hashQueryKey(from.queryKey)] = {
      observer: newObserver,
      unsubscribe
    };
  }
}

//some shit asdsd  asdf
