import { partial } from "lodash";
import { QueryFunctionContext, QueryKey, QueryOptions } from "react-query";
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
  const key: QueryKey = ["client", "todos", filter];

  return {
    queryFn: partial(getFilteredTodos, todosConfig, filter),
    queryKey: key
  }
}

async function getFilteredTodos<T extends Todo>(todosQueryConfig: QueryOptions<T[]>, filter: TodosFilter, {queryKey}: QueryFunctionContext) {
  console.log("GET FILTERED");

  registerQueryDependency({...todosQueryConfig, notifyOnChangeProps: ["data"]}, queryKey);

  const todos = await getQueryClient().fetchQuery(todosQueryConfig);
  return todos.filter(td => td.isDone === filter.isDone);
}