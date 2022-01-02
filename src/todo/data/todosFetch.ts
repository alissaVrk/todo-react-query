import { QueryFunctionContext, QueryKey } from "react-query";
import { getQueryClient, registerQueryDependency } from "src/core/queryClient";
import { TodoDB, TodoDescriptionDB } from "src/server/someDB";
import * as serverTodos from "src/server/todos";
import { getCurrentUserConfig, getUserId } from "src/user/logic/userQueries";
import { Todo, MyTodo } from "./todoTypes";

const MY_TODOS = ["my", "todos"];
const USER_TODOS = ["todos"];

const queriesToRefresh: {[key: string]: QueryKey} = {};
const myTodosOptions = {
  queryFn: fetchMyTodos,
  queryKey: MY_TODOS as unknown[]
}

export function getMyTodosConfig() {
  return myTodosOptions;
}

export function registerQueryToRefreshOnMyTodos(key: string, queryKey: QueryKey) {
  queriesToRefresh[key] = queryKey
}

export function getUserTodosConfig(userId: string) {
  return {
    queryFn: fetchUserTodos.bind(undefined, userId),
    queryKey: USER_TODOS.concat([userId]) as unknown[]
  }
}

type InPromise<T> = T extends Promise<infer K> ? K : never;
type ReturnInPromise<T extends (...args: any) => any> = InPromise<ReturnType<T>> 

export function getMyTodosSync() {
  const client = getQueryClient();
  return client.getQueryData<ReturnInPromise<typeof myTodosOptions.queryFn>>(myTodosOptions.queryKey);
}

async function fetchMyTodos({queryKey}: QueryFunctionContext) {
  const userId = getUserId();
  //@ts-ignore
  registerQueryDependency({...getCurrentUserConfig(), select: user => user?.id}, queryKey)

  if (!userId) {
    return Promise.resolve([]);
  }
  console.log("Get TODOS")
  const todosDB = await serverTodos.getMyTodos()
  const descIds = todosDB.map(t => t.descId);
  const descs = await serverTodos.getTodosDescs(descIds);
  const myTodos = todosDB.map((t, index) => getTodo(t, descs[index]))
  return myTodos;
}

async function fetchUserTodos(userId: string) {
  return serverTodos.getUserTodos(userId) as Promise<Todo[]>;
}

export function getTodo(todo: TodoDB, desc: TodoDescriptionDB): MyTodo {
  return {...todo, description: desc.description}
}