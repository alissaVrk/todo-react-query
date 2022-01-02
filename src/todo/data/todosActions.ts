import { config } from "process";
import { UseMutationOptions, UseQueryOptions } from "react-query";
import { Retryer } from "react-query/types/core/retryer";
import { getQueryClient, getQueryData } from "src/core/queryClient";
import { TodoDB } from "src/server/someDB";
import * as server from "src/server/todos";
import { getMyTodosConfig, getTodo } from "./todosFetch";
import { MyTodo } from "./todoTypes";

async function addTodo(todoItem: Omit<MyTodo, "id">) {
    const desc = await server.addDesc({description: todoItem.description});
    const todo = await server.addTodo({...todoItem, descId: desc.id});
    return getTodo(todo, desc);
}

export const addTodoMutationConfig = {
    mutationFn: addTodo, 
    onSuccess: () => {
        //we could add to array, but then we need to duplicate the order logic
        getQueryClient().invalidateQueries(getMyTodosConfig().queryKey);
    }
}

async function markAsDone({id, isDone}: {id: string, isDone: boolean}) {
    const updatedTodo = await server.updateTodo({id, isDone});
    return updatedTodo;
}

function updateTodo(updatedTodo: Partial<MyTodo>) {
    const myTodosConfig = getMyTodosConfig()
    const todos = getQueryData(myTodosConfig);
    if (!todos) {
        return;
    }
    const updated = todos.map(todo => todo.id === updatedTodo.id 
        ? {...todo, ...updatedTodo} 
        : todo);
    
    getQueryClient().setQueryData(myTodosConfig.queryKey, updated);
}

export const markAsDoneMutationconfig = {
    mutationFn: markAsDone,
    onMutate: (vars: {id: string, isDone: boolean}) => {
        const client = getQueryClient();
        const myTodosConfig = getMyTodosConfig()

        client.cancelQueries(myTodosConfig.queryKey);
        const prevTodos = getQueryData(myTodosConfig);

        updateTodo(vars);

        return {prevTodos};
    },
    onError: (err: unknown, newTodo: unknown, context: unknown) => {
        //@ts-ignore
        getQueryClient().setQueryData(getMyTodosConfig().queryKey, context.prevTodos);
    },
    onSuccess: (updatedTodo: unknown) => updateTodo(updatedTodo as TodoDB)
}


