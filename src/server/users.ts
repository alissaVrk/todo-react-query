import _ from "lodash";
import { defUsers, UserDB } from "./someDB";

let users: Array<UserDB> = defUsers;
let currentUser: string;

export async function login(userId: string) {
  const user = users.find(u => u.id === userId);
  if (!user) {
    throw new Error(`user ${userId} not found`);
  }
  currentUser = userId;
  return Promise.resolve(_.cloneDeep(user));
}

export async function getCurrentUser() {
  if (!currentUser) {
    return null;
  }
  const user = users.find(u => u.id === currentUser);
  return Promise.resolve(_.cloneDeep(user));
}

