import { values } from "lodash";
import { hashQueryKey, QueryClient, QueryKey, QueryObserver, QueryOptions } from "react-query";

let queryClient: QueryClient;

const queryObservers: {[key: string]: {[key: string]: {observer: QueryObserver, unsubscribe: () => void}}} = {};

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
    if (event.type !== "observerRemoved" || event.query.isActive() || !observers) {
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

export function registerQueryDependency(from: QueryOptions, to: QueryKey) {
  if (!from.queryKey) {
    throw new Error();
  }
  queryObservers[hashQueryKey(to)] = queryObservers[hashQueryKey(to)] || {};
  const toEntry = queryObservers[hashQueryKey(to)];

  const observer = toEntry[hashQueryKey(from.queryKey)];
  if (!observer) {
    const newObserver = new QueryObserver(queryClient, from);
    const unsubscribe = newObserver.subscribe(() => {
      queryClient.invalidateQueries(to);
    });
    toEntry[hashQueryKey(from.queryKey)] = {
      observer: newObserver,
      unsubscribe
    };
  }
}