import { partial } from "lodash";
import { QueryOptions } from "react-query";
import { getQueryClient, registerQueryDependency } from "src/core/queryClient";
import { getMyTodosConfig, getUserTodosConfig } from "./todosFetch";
import { Todo, TodosFilter } from "./todoTypes";

export function getFilteredMyTodoConfig(filter: TodosFilter) {
  const myTodosConfig = getMyTodosConfig();
  return getFilteredConfig(myTodosConfig, filter);
}

export function getFilteredUserTodosConfig(userId: string, filter: TodosFilter) {
  const userTodosConfig = getUserTodosConfig(userId);
  return getFilteredConfig(userTodosConfig, filter);
}

function getFilteredConfig<T extends Todo>(todosConfig: QueryOptions<T[]>, filter: TodosFilter) {
  if (!todosConfig.queryKey) {
    throw Error("config has to have a query key");
  }
  const key = (todosConfig.queryKey as unknown[]).concat([filter])
  registerQueryDependency(todosConfig as QueryOptions<unknown>, key);

  return {
    queryFn: partial(getFilteredTodos, todosConfig, filter),
    queryKey: key
  }
}

async function getFilteredTodos<T extends Todo>(todosQueryConfig: QueryOptions<T[]>, filter: TodosFilter) {
  console.log("GET FILTERED");
  const todos = await getQueryClient().fetchQuery(todosQueryConfig);
  console.log("TTTT", todos.length);
  return todos.filter(td => td.isDone === filter.isDone);
}