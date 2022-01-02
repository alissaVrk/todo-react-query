import { getQueryData } from "src/core/queryClient";
import * as usersDB from "src/server/users"

export const CURRENT_USER = "current_user";

const currentUserConfig = {
  queryKey: CURRENT_USER,
  queryFn: () => usersDB.getCurrentUser()
}

export function getCurrentUserConfig() {
  return currentUserConfig;
}

export function getUserId() {
  const user = getQueryData(currentUserConfig);
  return user?.id;
}
