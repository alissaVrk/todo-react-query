import { getQueryClient } from "src/core/queryClient";
import { getCurrentUser } from "./userAPI";
import { QueryObserverOptions, useQuery } from "react-query";
import { UserDB } from "src/server/someDB";

export const CURRENT_USER = "current_user";

export function init() {
  const queryClient = getQueryClient();
  const options: QueryObserverOptions = {
    queryFn: getCurrentUser
  }
  queryClient.setQueryDefaults(CURRENT_USER, options)
}

export function useCurrentUser(){
  return useQuery({
    queryKey: CURRENT_USER,
    queryFn: getCurrentUser
  });
}

export function getUserId() {
  const client = getQueryClient();
  const user = client.getQueryData<UserDB>(CURRENT_USER);
  console.log("RRRRR", user);
  return user?.id;
}
