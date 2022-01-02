import { getQueryClient, getQueryData } from "src/core/queryClient";
import { TodoDB } from "src/server/someDB";
import * as server from "src/server/todos";
import { getMyTodosConfig } from "./todosFetch";
import { MyTodo } from "./todoTypes";

export async function addTodo(todoItem: Omit<MyTodo, "id">) {
    const desc = await server.addDesc({description: todoItem.description});
    await server.addTodo({...todoItem, descId: desc.id});

    getQueryClient().invalidateQueries(getMyTodosConfig().queryKey);
}

export async function markAsDone({id, isDone}: {id: string, isDone: boolean}) {
    const {prevTodos} = updateTodo({id, isDone});
    try {
        const updatedTodo = await server.updateTodo({id, isDone});
        updateTodo(updatedTodo);
    } catch (err) {
        getQueryClient().setQueryData(getMyTodosConfig().queryKey, prevTodos);
    }
}

function updateTodo(updatedTodo: Partial<TodoDB>) {
    const myTodosConfig = getMyTodosConfig()
    const prevTodos = getQueryData(myTodosConfig);
    if (!prevTodos) {
        return {prevTodos: undefined};
    }
    const updated = prevTodos.map(todo => todo.id === updatedTodo.id 
        ? {...todo, ...updatedTodo} 
        : todo);
    
    getQueryClient().setQueryData(myTodosConfig.queryKey, updated);
    return {prevTodos};
}

