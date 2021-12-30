import * as usersDB from "src/server/users"

export async function getCurrentUser() {
  return usersDB.getCurrentUser();
}