import { getQueryClient } from "src/core/queryClient";
import { login } from "src/server/users";
import { CURRENT_USER } from "./userQueries";

export async function loginUser(userId: string) {
  const user = await login(userId);
  const client = getQueryClient();
  client.setQueryData(CURRENT_USER, user);
  client.refetchQueries(["my"]);
}