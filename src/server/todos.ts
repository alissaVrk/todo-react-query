//global caching will go here
//we will return data is a stupid way so there will be something to write..

import {cloneDeep, compact, uniqueId} from "lodash";
import { defDescs, defTodos, TodoDB, TodoDescriptionDB } from "./someDB";
import { getCurrentUser } from "./users";


let todos: Array<TodoDB> = defTodos;
let descs: Array<TodoDescriptionDB> = defDescs;

export async function getUserTodos(userId: string): Promise<Array<TodoDB>> {
    return Promise.resolve(cloneDeep(todos.filter(t => t.userId === userId)));    
}

export async function getMyTodos(): Promise<Array<TodoDB>> {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error("no user");
    }
    return getUserTodos(user.id);
}

export async function getTodosDescs(descIds: Array<string>): Promise<Array<TodoDescriptionDB>> {
    const descriptions = compact(descIds.map(i => descs.find(d => d.id === i)));
    return Promise.resolve(cloneDeep(descriptions));
}

export async function addTodo(todo: Omit<TodoDB, "id">) {
    const id = uniqueId("todo_");
    const todoWithId = {...todo, id};
    todos.push(todoWithId);
    return Promise.resolve(todoWithId)
}

export async function updateTodo(todo: Partial<TodoDB> & {id: string}) {
    const toUpdate = todos.find(t => t.id === todo.id)
    Object.assign(toUpdate, cloneDeep(todo));
    return Promise.resolve(toUpdate);
}

export async function deleteTodo(descId: string) {
    todos = todos.filter(t => t.id !== descId);
    return Promise.resolve();
}

export async function addDesc(desc: Omit<TodoDescriptionDB, "id">) {
    const id = uniqueId("desc_");
    const descWithId = {...desc, id};
    descs.push(descWithId);
    return Promise.resolve(descWithId);
}

export async function updateDesc(desc: Partial<TodoDescriptionDB> & {id: string}) {
    const toUpdate = descs.find(t => t.id === desc.id)
    Object.assign(toUpdate, cloneDeep(desc));
    return Promise.resolve(toUpdate);
}

export async function deleteDesc(descId: string) {
    descs = descs.filter(t => t.id !== descId);
    return Promise.resolve();
}

