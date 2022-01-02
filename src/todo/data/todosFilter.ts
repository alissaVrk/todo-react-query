import { Todo, TodosFilter } from "./todoTypes";


export function filterTodos<T extends Todo>(filter: TodosFilter, todos: T[]) {
  return todos.filter(td => td.isDone === filter.isDone);
}